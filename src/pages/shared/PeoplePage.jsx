// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api, uid } from '../../api/client';
// import { useAuth } from '../../auth/AuthContext';
// import { Button, Badge, Modal, LoadingPage, Empty, Spinner, initials } from '../../components/ui';
// import { useToast } from '../../components/Toast';

// export default function PeoplePage() {
//   const { user } = useAuth();
//   const isAdmin = user.role === 'admin';
//   const [tab, setTab] = useState(isAdmin ? 'managers' : 'employees');
//   const [managers, setManagers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modal, setModal] = useState(null); // 'manager' | 'employee'
//   const { toastError } = useToast();
//   const nav = useNavigate();

//   const load = async () => {
//     setLoading(true);
//     try {
//       if (isAdmin) {
//         const [m, e] = await Promise.all([api.listUsers('manager'), api.listUsers('employee')]);
//         setManagers(m.users);
//         setEmployees(e.users);
//       } else {
//         const e = await api.listUsers();
//         setEmployees(e.users);
//       }
//     } catch (e) {
//       toastError(e);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     load(); // eslint-disable-next-line
//   }, []);

//   const list = tab === 'managers' ? managers : employees;

//   return (
//     <>
//       <div className="page-head" style={{ display: 'flex', alignItems: 'flex-end' }}>
//         <div style={{ flex: 1 }}>
//           <h1>{isAdmin ? 'People' : 'My team'}</h1>
//           <p>{isAdmin ? 'Register managers and engineers, and review engineer performance.' : 'Register and track your engineers.'}</p>
//         </div>
//         <Button
//           variant="cyan"
//           onClick={() => setModal(tab === 'managers' ? 'manager' : 'employee')}
//         >
//           + Add {tab === 'managers' ? 'manager' : 'employee'}
//         </Button>
//       </div>

//       {isAdmin && (
//         <div className="tabs">
//           <button className={`tab ${tab === 'managers' ? 'active' : ''}`} onClick={() => setTab('managers')}>
//             Managers ({managers.length})
//           </button>
//           <button className={`tab ${tab === 'employees' ? 'active' : ''}`} onClick={() => setTab('employees')}>
//             Engineers ({employees.length})
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <LoadingPage />
//       ) : list.length === 0 ? (
//         <Empty>No {tab} yet. Use the button above to add one.</Empty>
//       ) : (
//         <div className="grid grid-auto">
//           {list.map((u) => {
//             const clickable = u.role === 'employee';
//             return (
//               <div
//                 key={uid(u)}
//                 className={`card card-hover ${clickable ? '' : ''}`}
//                 style={{ cursor: clickable ? 'pointer' : 'default' }}
//                 onClick={() => clickable && nav(`/employee/${uid(u)}`)}
//               >
//                 <div className="row gap-12">
//                   <div className="avatar" style={{ width: 42, height: 42, fontSize: 15 }}>
//                     {initials(u.name)}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{u.name}</div>
//                     <div className="muted" style={{ fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                       {u.email}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row gap-8" style={{ marginTop: 12, justifyContent: 'space-between' }}>
//                   <Badge kind="neutral">{u.employeeCode || u.role}</Badge>
//                   <Badge kind={u.active ? 'success' : 'neutral'}>{u.active ? 'Active' : 'Inactive'}</Badge>
//                 </div>
//                 {clickable && (
//                   <div className="muted" style={{ fontSize: 12, marginTop: 10 }}>
//                     View performance →
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {modal && (
//         <RegisterModal
//           role={modal}
//           isAdmin={isAdmin}
//           onClose={() => setModal(null)}
//           onDone={() => {
//             setModal(null);
//             load();
//           }}
//         />
//       )}
//     </>
//   );
// }

// function RegisterModal({ role, isAdmin, onClose, onDone }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [managerId, setManagerId] = useState('');
//   const [managers, setManagers] = useState([]);
//   const [busy, setBusy] = useState(false);
//   const { toast, toastError } = useToast();

//   useEffect(() => {
//     if (role === 'employee' && isAdmin) {
//       api.listManagers().then((r) => setManagers(r.managers)).catch(() => {});
//     }
//   }, [role, isAdmin]);

//   const submit = async () => {
//     if (!name.trim() || !email.trim() || password.length < 6) {
//       toastError('Name, email and a 6+ character password are required');
//       return;
//     }
//     setBusy(true);
//     try {
//       if (role === 'manager') await api.createManager(name.trim(), email.trim(), password);
//       else await api.createEmployee(name.trim(), email.trim(), password, managerId || undefined);
//       toast(`${role === 'manager' ? 'Manager' : 'Engineer'} registered`);
//       onDone();
//     } catch (e) {
//       toastError(e);
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <Modal
//       title={`Register ${role === 'manager' ? 'manager' : 'engineer'}`}
//       onClose={onClose}
//       footer={
//         <>
//           <Button variant="ghost" onClick={onClose}>Cancel</Button>
//           <Button variant="cyan" onClick={submit} disabled={busy}>
//             {busy ? <Spinner sm /> : 'Register'}
//           </Button>
//         </>
//       }
//     >
//       <div className="field">
//         <label>Full name</label>
//         <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Arjun Nair" />
//       </div>
//       <div className="field">
//         <label>Email</label>
//         <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
//       </div>
//       <div className="field">
//         <label>Temporary password</label>
//         <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
//       </div>
//       {role === 'employee' && isAdmin && managers.length > 0 && (
//         <div className="field">
//           <label>Assign to manager (optional)</label>
//           <select className="select" value={managerId} onChange={(e) => setManagerId(e.target.value)}>
//             <option value="">— None —</option>
//             {managers.map((m) => (
//               <option key={uid(m)} value={uid(m)}>
//                 {m.name} ({m.employeeCode})
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//       <div style={{ background: 'var(--neutral-bg)', borderRadius: 10, padding: 12, fontSize: 12.5, color: 'var(--muted)' }}>
//         {role === 'manager'
//           ? 'Managers can register engineers, upload materials, and build checklists & write-ups.'
//           : 'Engineers review materials, complete checklists and answer write-ups. Their progress is tracked automatically.'}
//       </div>
//     </Modal>
//   );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, uid } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { Button, Badge, Modal, LoadingPage, Empty, Spinner, initials } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function PeoplePage() {
  const { user } = useAuth();
  const isAdmin = user.role === 'admin';
  const [tab, setTab] = useState(isAdmin ? 'managers' : 'employees');
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // 'manager' | 'employee'
  const { toastError } = useToast();
  const nav = useNavigate();
const thStyle = { padding: '12px 14px', fontSize: 12, fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' };
const tdStyle = { padding: '12px 14px', fontSize: 13, verticalAlign: 'middle' };
  const load = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        const [m, e] = await Promise.all([api.listUsers('manager'), api.listUsers('employee')]);
        setManagers(m.users);
        setEmployees(e.users);
      } else {
        const e = await api.listUsers();
        setEmployees(e.users);
      }
    } catch (e) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load(); // eslint-disable-next-line
  }, []);

  const list = tab === 'managers' ? managers : employees;

  return (
    <>
      <div className="page-head" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <h1>{isAdmin ? 'People' : 'My team'}</h1>
          <p>{isAdmin ? 'Register managers and engineers, and review engineer performance.' : 'Register and track your engineers.'}</p>
        </div>
        <Button
          variant="cyan"
          onClick={() => setModal(tab === 'managers' ? 'manager' : 'employee')}
        >
          + Add {tab === 'managers' ? 'manager' : 'employee'}
        </Button>
      </div>

      {isAdmin && (
        <div className="tabs">
          <button className={`tab ${tab === 'managers' ? 'active' : ''}`} onClick={() => setTab('managers')}>
            Managers ({managers.length})
          </button>
          <button className={`tab ${tab === 'employees' ? 'active' : ''}`} onClick={() => setTab('employees')}>
            Engineers ({employees.length})
          </button>
        </div>
      )}

      {loading ? (
        <LoadingPage />
      ) : list.length === 0 ? (
        <Empty>No {tab} yet. Use the button above to add one.</Empty>
            ) : tab === 'employees' ? (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Employee ID</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr
                  key={uid(u)}
                  style={{ borderTop: '1px solid #eef2f7', cursor: 'pointer' }}
                  onClick={() => nav(`/employee/${uid(u)}`)}
                >
                  <td style={tdStyle}>
                    <div className="row gap-8" style={{ alignItems: 'center' }}>
                      <div className="avatar" style={{ width: 30, height: 30, fontSize: 12 }}>
                        {initials(u.name)}
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--muted)' }}>{u.email}</td>
                  <td style={tdStyle}><Badge kind="neutral">{u.employeeCode || '—'}</Badge></td>
                  <td style={tdStyle}>
                    <Badge kind={u.active ? 'success' : 'neutral'}>{u.active ? 'Active' : 'Inactive'}</Badge>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right', color: '#0284a8', fontWeight: 700 }}>
                    View →
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-auto">
          {list.map((u) => {
            const clickable = u.role === 'employee';
            return (
              <div
                key={uid(u)}
                className="card card-hover"
                style={{ cursor: clickable ? 'pointer' : 'default' }}
                onClick={() => clickable && nav(`/employee/${uid(u)}`)}
              >
                <div className="row gap-12">
                  <div className="avatar" style={{ width: 42, height: 42, fontSize: 15 }}>
                    {initials(u.name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{u.name}</div>
                    <div className="muted" style={{ fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {u.email}
                    </div>
                  </div>
                </div>
                <div className="row gap-8" style={{ marginTop: 12, justifyContent: 'space-between' }}>
                  <Badge kind="neutral">{u.employeeCode || u.role}</Badge>
                  <Badge kind={u.active ? 'success' : 'neutral'}>{u.active ? 'Active' : 'Inactive'}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && (
        <RegisterModal
          role={modal}
          isAdmin={isAdmin}
          onClose={() => setModal(null)}
          onDone={() => {
            setModal(null);
            load();
          }}
        />
      )}
    </>
  );
}

function RegisterModal({ role, isAdmin, onClose, onDone }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [managerId, setManagerId] = useState('');
  const [managers, setManagers] = useState([]);
  const [busy, setBusy] = useState(false);
  const { toast, toastError } = useToast();

  useEffect(() => {
    if (role === 'employee' && isAdmin) {
      api.listManagers().then((r) => setManagers(r.managers)).catch(() => {});
    }
  }, [role, isAdmin]);

  const submit = async () => {
    if (!name.trim() || !email.trim() || password.length < 6) {
      toastError('Name, email and a 6+ character password are required');
      return;
    }
    if (!employeeCode.trim()) {
      toastError('Employee ID is required');
      return;
    }
    setBusy(true);
    try {
      if (role === 'manager')
        await api.createManager(name.trim(), email.trim(), password, employeeCode.trim());
      else
        await api.createEmployee(
          name.trim(),
          email.trim(),
          password,
          managerId || undefined,
          employeeCode.trim()
        );
      toast(`${role === 'manager' ? 'Manager' : 'Engineer'} registered`);
      onDone();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title={`Register ${role === 'manager' ? 'manager' : 'engineer'}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="cyan" onClick={submit} disabled={busy}>
            {busy ? <Spinner sm /> : 'Register'}
          </Button>
        </>
      }
    >
      <div className="field">
        <label>Full name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Arjun Nair" />
      </div>
      <div className="field">
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
      </div>
      <div className="field">
        <label>Employee ID</label>
        <input
          className="input"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
          placeholder={role === 'manager' ? 'e.g. LS-MGR-04' : 'e.g. LS-2291'}
        />
      </div>
      <div className="field">
        <label>Temporary password</label>
        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
      </div>
      {role === 'employee' && isAdmin && managers.length > 0 && (
        <div className="field">
          <label>Assign to manager (optional)</label>
          <select className="select" value={managerId} onChange={(e) => setManagerId(e.target.value)}>
            <option value="">— None —</option>
            {managers.map((m) => (
              <option key={uid(m)} value={uid(m)}>
                {m.name} ({m.employeeCode})
              </option>
            ))}
          </select>
        </div>
      )}
      <div style={{ background: 'var(--neutral-bg)', borderRadius: 10, padding: 12, fontSize: 12.5, color: 'var(--muted)' }}>
        {role === 'manager'
          ? 'Managers can register engineers, upload materials, and build checklists & write-ups.'
          : 'Engineers review materials, complete checklists and answer write-ups. Their progress is tracked automatically.'}
      </div>
    </Modal>
  );
}