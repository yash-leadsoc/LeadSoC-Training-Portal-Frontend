import { useState } from 'react';
import { api } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { Button, Badge, Modal, Spinner, initials } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="page-head">
        <h1>Account</h1>
        <p>Manage your profile and security.</p>
      </div>

      <div className="card pad-lg" style={{ maxWidth: 640 }}>
        <div className="row gap-16">
          <div className="avatar" style={{ width: 58, height: 58, fontSize: 20 }}>{initials(user.name)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{user.name}</div>
            <div className="muted" style={{ fontSize: 13 }}>{user.email}</div>
            <div style={{ marginTop: 8 }}>
              <Badge kind="info">{user.role.toUpperCase()}</Badge>{' '}
              <Badge kind="neutral">{user.employeeCode || '—'}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 640, marginTop: 16, padding: '6px 20px' }}>
        <div className="list-row">
          <div style={{ flex: 1 }}>
            <div className="li-title">🔒 Password</div>
            <div className="li-sub">Change your account password</div>
          </div>
          <Button variant="ghost" onClick={() => setShow(true)}>Change</Button>
        </div>
        <div className="list-row">
          <div style={{ flex: 1 }}>
            <div className="li-title" style={{ color: 'var(--danger)' }}>Log out</div>
            <div className="li-sub">End your session on this device</div>
          </div>
          <Button variant="danger" onClick={logout}>Log out</Button>
        </div>
      </div>

      {show && <PasswordModal onClose={() => setShow(false)} />}
    </>
  );
}

function PasswordModal({ onClose }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [busy, setBusy] = useState(false);
  const { toast, toastError } = useToast();

  const submit = async () => {
    if (next.length < 6) {
      toastError('New password must be at least 6 characters');
      return;
    }
    setBusy(true);
    try {
      await api.changePassword(current, next);
      toast('Password updated');
      onClose();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title="Change password"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="cyan" onClick={submit} disabled={busy}>{busy ? <Spinner sm /> : 'Update'}</Button>
        </>
      }
    >
      <div className="field"><label>Current password</label><input className="input" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} /></div>
      <div className="field"><label>New password (6+)</label><input className="input" type="password" value={next} onChange={(e) => setNext(e.target.value)} /></div>
    </Modal>
  );
}
