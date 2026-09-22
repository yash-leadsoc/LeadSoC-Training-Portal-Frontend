// // import { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { api } from '../../api/client';
// // import { Kpi, Badge, ProgressRow, LoadingPage, Empty, pctColors } from '../../components/ui';
// // import { useToast } from '../../components/Toast';
// // // import { useAuth } from '../../auth/AuthContext';


// // export default function EmployeeDetail() {
// //   const { id } = useParams();
// //   const nav = useNavigate();
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const { toastError } = useToast();
// //   const [allDomains, setAllDomains] = useState([]);
// //   const [selectedDomains, setSelectedDomains] = useState([]);
// //   const [showDomainModal, setShowDomainModal] = useState(false);
// //   const [savingDomains, setSavingDomains] = useState(false);




// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         setData(await api.employeeProgress(id));
// //       } catch (e) {
// //         toastError(e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     })(); // eslint-disable-next-line
// //   }, [id]);

// //   useEffect(() => {
// //     const loadDomains = async () => {
// //       try {
// //         const result = await api.listDomains();

// //         setAllDomains(
// //           result.domains || result
// //         );
// //       } catch (e) {
// //         toastError(e);
// //       }
// //     };

// //     loadDomains();
// //   }, []);

// //   // useEffect(() => {
// //   //   (async () => {
// //   //     try {
// //   //       const result = await api.listDomains();
// //   //       setAllDomains(result);
// //   //     } catch (e) {
// //   //       toastError(e);
// //   //     }
// //   //   })();
// //   // }, []);

// //   if (loading) return <LoadingPage />;
// //   if (!data) return <Empty>Engineer not found.</Empty>;

// //   const { user, progress, summary } = data;

// //   const domains = Object.values(progress || {});

// //   // const assignedDomainIds = (
// //   //   user.assignedDomains || []
// //   // ).map((domain) =>
// //   //   String(
// //   //     typeof domain === 'string'
// //   //       ? domain
// //   //       : domain._id || domain.id
// //   //   )
// //   // );

// //   const assignedDomainIds = (user.assignedDomains || [])
// //   .map((domain) => {
// //     if (typeof domain === 'string') {
// //       return domain;
// //     }

// //     return domain?._id || domain?.id;
// //   })
// //   .filter(Boolean)
// //   .map(String);

// //   // const openDomainModal = () => {
// //   //   setSelectedDomains(assignedDomainIds);
// //   //   setShowDomainModal(true);
// //   // };

// //   const openDomainModal = () => {
// //   const assignedIds = (user.assignedDomains || [])
// //     .map((domain) => {
// //       if (typeof domain === 'string') {
// //         return domain;
// //       }

// //       return domain?._id || domain?.id;
// //     })
// //     .filter(Boolean)
// //     .map(String);

// //   setSelectedDomains(assignedIds);
// //   setShowDomainModal(true);
// // };

// //   const toggleDomain = (domainId) => {
// //   const id = String(domainId);

// //   setSelectedDomains((current) => {
// //     const normalized = current.map(String);

// //     if (normalized.includes(id)) {
// //       return normalized.filter(
// //         (existingId) => existingId !== id
// //       );
// //     }

// //     return [...normalized, id];
// //   });
// // };

// //   const saveDomains = async () => {
// //     try {
// //       setSavingDomains(true);

// //       const result =
// //         await api.assignUserDomains(
// //           id,
// //           selectedDomains
// //         );

// //       setData((current) => ({
// //         ...current,
// //         user: {
// //           ...current.user,
// //           assignedDomains:
// //             result.assignedDomains ||
// //             selectedDomains,
// //         },
// //       }));

// //       setShowDomainModal(false);

// //     } catch (e) {
// //       toastError(e);
// //     } finally {
// //       setSavingDomains(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>← Back</button>
// //       <div
// //         className="page-head"
// //         style={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           gap: 20,
// //         }}
// //       >
// //         <div>
// //           <h1>{user.name}</h1>
// //           <p>
// //             {user.email} · {user.employeeCode}
// //           </p>
// //         </div>

// //         <button
// //           className="btn"
// //           onClick={openDomainModal}
// //         >
// //           Assign Domains
// //         </button>
// //       </div>

// //       <div className="grid grid-4">
// //         <Kpi icon="📅" value={summary.daysEnrolled} label={`Days enrolled · ${summary.pace}`} />
// //         <Kpi icon="✅" value={`${summary.avgCompletion}%`} label="Avg completion (active)" />
// //         <Kpi icon="🗂️" value={`${summary.domainsStarted} / ${summary.totalDomains}`} label="Domains started" />
// //         <Kpi icon="⭐" value={summary.strongestDomain} label="Strongest domain" />
// //       </div>

// //       <div className="section-title">Per-domain breakdown</div>
// //       <div className="grid grid-2">
// //        {domains.map((domain) => {
// //   const locked = !domain.assigned;

// //   // Find progress for this domain
// //   const domainProgress =
// //     progress?.[domain._id] ||
// //     progress?.[String(domain._id)] ||
// //     progress?.[domain.name];

// //   const percentage = Math.max(
// //     0,
// //     Math.min(
// //       100,
// //       Number(domainProgress?.overall || 0)
// //     )
// //   );

// //   return (
// //     <div
// //       key={domain._id}
// //       className="card card-hover"
// //       onClick={() => {
// //         if (locked) return;

// //         nav(`/domains/${domain._id}`);
// //       }}
// //       style={{
// //         background: '#fff',
// //         border: '1px solid #e2e8f0',
// //         borderRadius: '18px',
// //         padding: '28px',
// //         minHeight: '205px',
// //         boxSizing: 'border-box',
// //         boxShadow:
// //           '0 2px 8px rgba(15, 23, 42, 0.04)',
// //         cursor: locked
// //           ? 'not-allowed'
// //           : 'pointer',
// //         opacity: locked ? 0.55 : 1,
// //         position: 'relative',
// //         transition: 'all 0.2s ease',
// //       }}
// //     >
// //       {/* ICON */}
// //       <div
// //         style={{
// //           fontSize: '32px',
// //           lineHeight: 1,
// //           marginBottom: '22px',
// //         }}
// //       >
// //         {domain.icon || '📚'}
// //       </div>

// //       {/* DOMAIN NAME */}
// //       <h3
// //         style={{
// //           margin: 0,
// //           fontSize: '21px',
// //           fontWeight: 700,
// //           color: '#102a56',
// //           lineHeight: 1.2,
// //         }}
// //       >
// //         {domain.name}
// //       </h3>

// //       {/* DESCRIPTION */}
// //       <p
// //         style={{
// //           margin: '5px 0 0',
// //           fontSize: '16px',
// //           color: '#52658a',
// //           lineHeight: 1.4,
// //         }}
// //       >
// //         {domain.description || ''}
// //       </p>

// //       {/* PROGRESS BAR */}
// //       <div
// //         style={{
// //           marginTop: '30px',
// //           width: '100%',
// //           height: '10px',
// //           background: '#e8edf5',
// //           borderRadius: '999px',
// //           overflow: 'hidden',
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: `${percentage}%`,
// //             height: '100%',
// //             background: '#102a56',
// //             borderRadius: '999px',
// //             transition: 'width 0.4s ease',
// //           }}
// //         />
// //       </div>

// //       {/* PROGRESS TEXT */}
// //       <div
// //         style={{
// //           marginTop: '8px',
// //           fontSize: '14px',
// //           color: '#52658a',
// //         }}
// //       >
// //         {percentage}% complete
// //       </div>

// //       {/* LOCKED STATUS */}
// //       {locked && (
// //         <div
// //           style={{
// //             marginTop: '8px',
// //             fontSize: '13px',
// //             color: '#7b879c',
// //           }}
// //         >
// //           🔒 Not assigned
// //         </div>
// //       )}

// //       {/* ASSIGNED STATUS */}
// //       {!locked && (
// //         <div
// //           style={{
// //             marginTop: '8px',
// //             fontSize: '13px',
// //             color: '#52658a',
// //           }}
// //         >
// //           ✓ Assigned
// //         </div>
// //       )}
// //     </div>
// //   );
// // })}
// //       </div>



// //       {showDomainModal && (
// //         <div
// //           style={{
// //             position: 'fixed',
// //             inset: 0,
// //             background: 'rgba(0,0,0,0.6)',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             zIndex: 9999,
// //             padding: 20,
// //           }}
// //         >
// //           <div
// //             className="card"
// //             style={{
// //               width: '100%',
// //               maxWidth: 500,
// //               maxHeight: '80vh',
// //               overflowY: 'auto',
// //               padding: 24,
// //             }}
// //           >
// //             <div
// //               className="row"
// //               style={{
// //                 justifyContent: 'space-between',
// //                 marginBottom: 20,
// //               }}
// //             >
// //               <div>
// //                 <h2 style={{ margin: 0 }}>
// //                   Assign Domains
// //                 </h2>

// //                 <p className="muted">
// //                   Select domains for {user.name}
// //                 </p>
// //               </div>

// //               <button
// //                 className="btn link"
// //                 onClick={() => setShowDomainModal(false)}
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             <div
// //               style={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 gap: 10,
// //               }}
// //             >
// //               {allDomains.length === 0 ? (
// //                 <p className="muted">
// //                   No domains available.
// //                 </p>
// //               ) : (
// //                 allDomains.map((domain) => {
// //                   const domainId = String(domain._id || domain.id);

// //                   const isSelected =
// //                     selectedDomains.includes(domainId);

// //                   return (
// //                     <label
// //                       key={domainId}
// //                       style={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         gap: 12,
// //                         padding: 14,
// //                         border: '1px solid var(--border)',
// //                         borderRadius: 8,
// //                         cursor: 'pointer',
// //                       }}
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={isSelected}
// //                         onChange={() =>
// //                           toggleDomain(domainId)
// //                         }
// //                       />

// //                       <div>
// //                         <div
// //                           style={{
// //                             fontWeight: 700,
// //                           }}
// //                         >
// //                           {domain.name}
// //                         </div>

// //                         {domain.description && (
// //                           <div
// //                             className="muted"
// //                             style={{
// //                               fontSize: 12,
// //                               marginTop: 3,
// //                             }}
// //                           >
// //                             {domain.description}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </label>
// //                   );
// //                 })
// //               )}
// //             </div>

// //             <div
// //               className="row"
// //               style={{
// //                 justifyContent: 'flex-end',
// //                 gap: 10,
// //                 marginTop: 20,
// //               }}
// //             >
// //               <button
// //                 className="btn"
// //                 onClick={() =>
// //                   setShowDomainModal(false)
// //                 }
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 className="btn primary"
// //                 onClick={saveDomains}
// //                 disabled={savingDomains}
// //               >
// //                 {savingDomains
// //                   ? 'Saving...'
// //                   : 'Save Domains'}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}



// //     </>
// //   );
// // }


// //-------------------------------------------------------//

// // import { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { api } from '../../api/client';
// // import { Kpi, LoadingPage, Empty } from '../../components/ui';
// // import { useToast } from '../../components/Toast';

// // export default function EmployeeDetail() {
// //   const { id } = useParams();
// //   const nav = useNavigate();
// //   const { toastError } = useToast();

// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [allDomains, setAllDomains] = useState([]);
// //   const [selectedDomainId, setSelectedDomainId] = useState(null);

// //   const [selectedDomains, setSelectedDomains] = useState([]);
// //   const [showDomainModal, setShowDomainModal] = useState(false);
// //   const [savingDomains, setSavingDomains] = useState(false);

// //   const [pptSubmissions, setPptSubmissions] = useState([]);
// //   const [pptLoading, setPptLoading] = useState(true);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         setData(await api.employeeProgress(id));
// //       } catch (e) {
// //         toastError(e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, [id]);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const result = await api.listDomains();
// //         setAllDomains(result?.domains || result || []);
// //       } catch (e) {
// //         toastError(e);
// //       }
// //     })();
// //   }, []);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         setPptLoading(true);
// //         const result = await api.getEmployeePptSubmissions(id);
// //         setPptSubmissions(result?.submissions || []);

// //         const domainPpts = pptSubmissions.filter(s => {
// //   const sid = s?.domain?._id || s?.domain?.id || s?.domain;
// //   return String(sid) === String(selectedDomainId);
// // });

// // console.log('ALL PPT SUBMISSIONS:', pptSubmissions);
// // console.log('SELECTED DOMAIN:', selectedDomainId);
// // console.log('DOMAIN PPTs:', domainPpts);
// //       } catch (e) {
// //         console.error('[PPT submissions]', e);
// //         setPptSubmissions([]);
// //       } finally {
// //         setPptLoading(false);
// //       }
// //     })();
// //   }, [id]);

// //   // Select the first assigned domain after domain/user data is available.
// //   // This hook MUST stay above the conditional loading/data returns.
// //   useEffect(() => {
// //     if (selectedDomainId) return;

// //     const assignedIds = (data?.user?.assignedDomains || [])
// //       .map((d) =>
// //         typeof d === 'string'
// //           ? d
// //           : d?._id || d?.id
// //       )
// //       .filter(Boolean)
// //       .map(String);

// //     const availableDomains = allDomains || [];

// //     const firstAssigned =
// //       availableDomains.find((d) => {
// //         const domainId = String(d._id || d.id);

// //         return (
// //           d.assigned === true ||
// //           assignedIds.includes(domainId)
// //         );
// //       }) || availableDomains[0];

// //     if (firstAssigned) {
// //       setSelectedDomainId(
// //         String(firstAssigned._id || firstAssigned.id)
// //       );
// //     }
// //   }, [data, allDomains, selectedDomainId]);

// //   if (loading) return <LoadingPage />;
// //   if (!data) return <Empty>Engineer not found.</Empty>;

// //   const { user, progress = {}, summary = {} } = data;

// //   const assignedIds = (user.assignedDomains || [])
// //     .map((d) =>
// //       typeof d === 'string'
// //         ? d
// //         : d?._id || d?.id
// //     )
// //     .filter(Boolean)
// //     .map(String);

// //   const progressDomains = Object.values(progress || {});

// //   const domainMap = new Map();

// //   allDomains.forEach((d) => {
// //     const domainId = String(d._id || d.id);

// //     if (!domainId) return;

// //     domainMap.set(domainId, {
// //       ...d,
// //       _id: domainId,
// //     });
// //   });

// //   progressDomains.forEach((d) => {
// //     const domainId = String(d._id || d.id);

// //     if (!domainId) return;

// //     domainMap.set(domainId, {
// //       ...(domainMap.get(domainId) || {}),
// //       ...d,
// //       _id: domainId,
// //     });
// //   });

// //   const domains = Array.from(domainMap.values())
// //     .map((d) => ({
// //       ...d,
// //       assigned:
// //         d.assigned ??
// //         assignedIds.includes(String(d._id)),
// //     }))
// //     .sort((a, b) => {
// //       if (a.assigned && !b.assigned) return -1;
// //       if (!a.assigned && b.assigned) return 1;

// //       return String(a.name || '').localeCompare(
// //         String(b.name || '')
// //       );
// //     });

// //   const selectedDomain = domains.find(
// //     d => String(d._id) === String(selectedDomainId)
// //   );

// //   const getDomainProgress = d =>
// //     d ? (
// //       progress?.[d._id] ||
// //       progress?.[String(d._id)] ||
// //       progress?.[d.name] ||
// //       d
// //     ) : {};

// //   const dp = getDomainProgress(selectedDomain);



// //   const overall = Math.max(
// //     0,
// //     Math.min(100, Number(dp?.overall || 0))
// //   );

// //   const toolDone = Number(
// //     dp?.toolUnderstandingCompleted ??
// //     dp?.toolsCompleted ??
// //     dp?.toolDone ??
// //     dp?.toolUnderstanding?.completed ??
// //     0
// //   );

// //   const toolTotal = Number(
// //     dp?.toolUnderstandingTotal ??
// //     dp?.toolsTotal ??
// //     dp?.toolTotal ??
// //     dp?.toolUnderstanding?.total ??
// //     0
// //   );

// //   const conceptDone = Number(
// //     dp?.conceptsCompleted ??
// //     dp?.conceptCompleted ??
// //     dp?.concepts?.completed ??
// //     0
// //   );

// //   const conceptTotal = Number(
// //     dp?.conceptsTotal ??
// //     dp?.conceptTotal ??
// //     dp?.concepts?.total ??
// //     0
// //   );

// //   const practicalDone = Number(
// //     dp?.practicalCompleted ??
// //     dp?.practicalsCompleted ??
// //     dp?.practicalDone ??
// //     dp?.practical?.completed ??
// //     0
// //   );

// //   const practicalTotal = Number(
// //     dp?.practicalTotal ??
// //     dp?.practicalsTotal ??
// //     dp?.practical?.total ??
// //     0
// //   );

// //   const advanceDone = Number(
// //     dp?.advanceCompleted ??
// //     dp?.advancedCompleted ??
// //     dp?.advanceDone ??
// //     dp?.advance?.completed ??
// //     0
// //   );

// //   const advanceTotal = Number(
// //     dp?.advanceTotal ??
// //     dp?.advancedTotal ??
// //     dp?.advance?.total ??
// //     0
// //   );

// //   const checklistDone =
// //     toolDone +
// //     conceptDone +
// //     practicalDone +
// //     advanceDone;

// //   const checklistTotal =
// //     toolTotal +
// //     conceptTotal +
// //     practicalTotal +
// //     advanceTotal;

// //   const writeupDone = Number(
// //     dp?.writeupsCompleted ??
// //     dp?.writeUpCompleted ??
// //     dp?.answersCompleted ??
// //     dp?.writeups?.completed ??
// //     0
// //   );

// //   const writeupTotal = Number(
// //     dp?.writeupsTotal ??
// //     dp?.writeUpTotal ??
// //     dp?.answersTotal ??
// //     dp?.writeups?.total ??
// //     0
// //   );

// //   const materials = dp?.trainingMaterials || dp?.materials || dp?.documents || [];
// //   const materialDone = Number(
// //     dp?.trainingReviewed ??
// //     dp?.materialsReviewed ??
// //     dp?.reviewedMaterials ??
// //     0
// //   );
// //   const materialTotal = Number(
// //     dp?.trainingTotal ??
// //     dp?.materialsTotal ??
// //     dp?.totalMaterials ??
// //     materials.length ??
// //     0
// //   );

// //   // const domainPpts = pptSubmissions.filter(s => {
// //   //   const sid = s?.domain?._id || s?.domain?.id || s?.domain;
// //   //   return String(sid) === String(selectedDomainId);
// //   // });
// //   const domainPpts = pptSubmissions.filter((submission) => {
// //   const submissionDomainId =
// //     submission.domain?._id ||
// //     submission.domain;

// //   const currentDomainId =
// //     selectedDomain?._id ||
// //     selectedDomain?.id;

// //   return String(submissionDomainId) === String(currentDomainId);
// // });

// //   const openPpt = link => {
// //     if (link) window.open(link, '_blank', 'noopener,noreferrer');
// //   };

// //   const openDomainModal = () => {
// //     setSelectedDomains(assignedIds);
// //     setShowDomainModal(true);
// //   };

// //   const toggleDomain = domainId => {
// //     const value = String(domainId);
// //     setSelectedDomains(current => {
// //       const normalized = current.map(String);
// //       return normalized.includes(value)
// //         ? normalized.filter(x => x !== value)
// //         : [...normalized, value];
// //     });
// //   };

// //   const saveDomains = async () => {
// //     try {
// //       setSavingDomains(true);
// //       const result = await api.assignUserDomains(id, selectedDomains);

// //       setData(current => ({
// //         ...current,
// //         user: {
// //           ...current.user,
// //           assignedDomains: result.assignedDomains || selectedDomains,
// //         },
// //       }));

// //       setShowDomainModal(false);
// //     } catch (e) {
// //       toastError(e);
// //     } finally {
// //       setSavingDomains(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>
// //         ← Back
// //       </button>

// //       <div
// //         className="page-head"
// //         style={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           gap: 20,
// //           flexWrap: 'wrap',
// //         }}
// //       >
// //         <div>
// //           <h1>{user.name}</h1>
// //           <p>{user.email} · {user.employeeCode}</p>
// //         </div>

// //         <button className="btn" onClick={openDomainModal}>
// //           Assign Domains
// //         </button>
// //       </div>

// //       {/* ONLY 3 TOP CARDS */}
// //       <div className="grid grid-3">
// //         <Kpi icon="📅" value={summary.daysEnrolled ?? 0} label="Days enrolled" />
// //         <Kpi icon="✅" value={`${summary.avgCompletion ?? 0}%`} label="Average completion" />
// //         <Kpi
// //           icon="🗂️"
// //           value={`${summary.domainsStarted ?? 0} / ${summary.totalDomains ?? domains.length}`}
// //           label="Domains"
// //         />
// //       </div>

// //       {/* DOMAIN TABS */}
// //       <section
// //         className="card"
// //         style={{
// //           marginTop: 20,
// //           padding: 14,
// //         }}
// //       >
// //         <div
// //           style={{
// //             fontSize: 13,
// //             fontWeight: 700,
// //             color: '#102a56',
// //             marginBottom: 10,
// //           }}
// //         >
// //           Domains
// //         </div>

// //         <div
// //           style={{
// //             display: 'flex',
// //             gap: 8,
// //             overflowX: 'auto',
// //           }}
// //         >
// //           {domains.map((domain) => {

// //             // Get assigned domain IDs from employee
// //             const assignedDomainIds = (
// //               data?.user?.assignedDomains || []
// //             )
// //               .map((item) => {
// //                 if (typeof item === 'string') {
// //                   return item;
// //                 }

// //                 return item?._id || item?.id;
// //               })
// //               .filter(Boolean)
// //               .map(String);

// //             // Check if current domain is assigned
// //             const assigned = assignedDomainIds.includes(
// //               String(domain._id)
// //             );

// //             const active =
// //               String(domain._id) ===
// //               String(selectedDomainId);

// //             const p = Math.max(
// //               0,
// //               Math.min(
// //                 100,
// //                 Number(
// //                   getDomainProgress(domain)?.overall || 0
// //                 )
// //               )
// //             );

// //             return (
// //               <button
// //                 key={domain._id}
// //                 type="button"
// //                 disabled={!assigned}
// //                 onClick={() => {
// //                   if (!assigned) return;

// //                   setSelectedDomainId(
// //                     String(domain._id)
// //                   );
// //                 }}
// //                 style={{
// //                   flex: '0 0 auto',
// //                   minWidth: 140,

// //                   border:
// //                     active && assigned
// //                       ? '1px solid #08a6c7'
// //                       : '1px solid #dbe3ec',

// //                   background:
// //                     active && assigned
// //                       ? '#eefbfe'
// //                       : '#fff',

// //                   borderRadius: 10,
// //                   padding: '10px 12px',
// //                   textAlign: 'left',

// //                   cursor: assigned
// //                     ? 'pointer'
// //                     : 'not-allowed',

// //                   opacity: assigned ? 1 : 0.5,
// //                 }}
// //               >
// //                 {/* DOMAIN NAME */}
// //                 <div
// //                   style={{
// //                     fontSize: 12.5,
// //                     fontWeight: 700,
// //                     color: '#102a56',
// //                   }}
// //                 >
// //                   {domain.icon || '📚'} {domain.name}
// //                 </div>

// //                 {/* ASSIGNED */}
// //                 {assigned ? (
// //                   <>
// //                     <div
// //                       style={{
// //                         height: 5,
// //                         background: '#e8edf5',
// //                         borderRadius: 99,
// //                         overflow: 'hidden',
// //                         marginTop: 8,
// //                       }}
// //                     >
// //                       <div
// //                         style={{
// //                           width: `${p}%`,
// //                           height: '100%',
// //                           background: '#08a6c7',
// //                         }}
// //                       />
// //                     </div>

// //                     <div
// //                       style={{
// //                         marginTop: 5,
// //                         fontSize: 10.5,
// //                         color: '#64748b',
// //                       }}
// //                     >
// //                       {p}% complete
// //                     </div>
// //                   </>
// //                 ) : (
// //                   /* NOT ASSIGNED */
// //                   <div
// //                     style={{
// //                       marginTop: 10,
// //                       fontSize: 11,
// //                       fontWeight: 700,
// //                       color: '#94a3b8',
// //                     }}
// //                   >
// //                     🔒 Not Assigned
// //                   </div>
// //                 )}
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* SELECTED DOMAIN - SAME STRUCTURE AS EMPLOYEE DOMAIN PAGE */}
// //       {selectedDomain?.assigned && (
// //         <>
// //           <div style={{ marginTop: 22, marginBottom: 12 }}>
// //             <div style={{ fontSize: 11, color: '#64748b' }}>
// //               Domains › {selectedDomain.name}
// //             </div>
// //             <h2 style={{ margin: '4px 0 0', color: '#102a56', fontSize: 20 }}>
// //               {selectedDomain.description || selectedDomain.name}
// //             </h2>
// //           </div>

// //           {/* TRAINING SCORE */}
// //           <section className="card" style={{ padding: 18, marginBottom: 16 }}>
// //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
// //               <div
// //                 style={{
// //                   width: 88,
// //                   height: 88,
// //                   borderRadius: '50%',
// //                   background: `conic-gradient(#08a6c7 ${overall * 3.6}deg, #e4e9f1 0deg)`,
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: 68,
// //                     height: 68,
// //                     borderRadius: '50%',
// //                     background: '#fff',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     justifyContent: 'center',
// //                     fontSize: 16,
// //                     fontWeight: 800,
// //                     color: '#102a56',
// //                   }}
// //                 >
// //                   {overall}%
// //                 </div>
// //               </div>

// //               <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#102a56' }}>
// //                 Training score
// //               </div>

// //               <div style={{ marginTop: 4, fontSize: 11.5, color: '#64748b' }}>
// //                 {user.name} · {selectedDomain.name}
// //               </div>
// //             </div>
// //           </section>

// //           <div className="grid grid-2">
// //             {/* TRAINING MATERIAL */}

// //             {/* <section className="card" style={{ padding: 16 }}>
// //               <SectionTitle
// //                 icon="📖"
// //                 title="Training material"
// //                 subtitle={
// //                   materialTotal
// //                     ? `${materialDone} of ${materialTotal} reviewed`
// //                     : 'Training material'
// //                 }
// //               />

// //               {materials.length ? (
// //                 <div style={{ marginTop: 10 }}>
// //                   {materials.map((item, index) => {
// //                     const done =
// //                       item?.reviewed ??
// //                       item?.completed ??
// //                       item?.checked ??
// //                       false;

// //                     return (
// //                       <div
// //                         key={item?._id || item?.id || index}
// //                         style={{
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           justifyContent: 'space-between',
// //                           gap: 12,
// //                           padding: '11px 0',
// //                           borderBottom: '1px solid #e2e8f0',
// //                         }}
// //                       >

// //                         <div
// //                           style={{
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             gap: 9,
// //                             minWidth: 0,
// //                             flex: 1,
// //                           }}
// //                         >
// //                           <span style={{ fontSize: 15 }}>
// //                             {done ? '☑️' : '⬜'}
// //                           </span>

// //                           <div
// //                             style={{
// //                               minWidth: 0,
// //                             }}
// //                           >
// //                             <div
// //                               style={{
// //                                 fontSize: 12,
// //                                 fontWeight: 600,
// //                                 color: '#334155',
// //                                 overflow: 'hidden',
// //                                 textOverflow: 'ellipsis',
// //                                 whiteSpace: 'nowrap',
// //                               }}
// //                             >
// //                               {item?.title ||
// //                                 item?.name ||
// //                                 `Training material ${index + 1}`}
// //                             </div>

// //                             <div
// //                               style={{
// //                                 fontSize: 10.5,
// //                                 color: done ? '#16a34a' : '#94a3b8',
// //                                 marginTop: 3,
// //                               }}
// //                             >
// //                               {done ? 'Reviewed' : 'Not reviewed'}
// //                             </div>
// //                           </div>
// //                         </div>


// //                         <button
// //                           type="button"
// //                           onClick={() => {
// //                             setPreviewDoc(item);
// //                           }}
// //                           style={{
// //                             flex: '0 0 auto',
// //                             border: '1px solid #dbe3ec',
// //                             background: '#fff',
// //                             color: '#102a56',
// //                             borderRadius: 7,
// //                             padding: '6px 13px',
// //                             fontSize: 11,
// //                             fontWeight: 700,
// //                             cursor: 'pointer',
// //                           }}
// //                         >
// //                           👁 View
// //                         </button>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               ) : (
// //                 <div
// //                   className="muted"
// //                   style={{
// //                     marginTop: 12,
// //                     fontSize: 12,
// //                   }}
// //                 >
// //                   No training material available.
// //                 </div>
// //               )}
// //             </section> */}


// //             {/* CHECKLIST */}
// //             <section className="card" style={{ padding: 16 }}>
// //               <SectionTitle
// //                 icon="☑️"
// //                 title="Training checklist"
// //                 subtitle={
// //                   checklistTotal
// //                     ? `${checklistDone} of ${checklistTotal} completed`
// //                     : 'Employee checklist progress'
// //                 }
// //               />

// //               <div style={{ marginTop: 12 }}>

// //                 {/* TOOL */}
// //                 <ProgressMini
// //                   label="🔧 Tool"
// //                   done={toolDone}
// //                   total={toolTotal}
// //                 />

// //                 {/* CONCEPT */}
// //                 <ProgressMini
// //                   label="📚 Concept"
// //                   done={conceptDone}
// //                   total={conceptTotal}
// //                 />

// //                 {/* PRACTICAL */}
// //                 <ProgressMini
// //                   label="🛠️ Practical"
// //                   done={practicalDone}
// //                   total={practicalTotal}
// //                 />

// //                 {/* ADVANCE */}
// //                 <ProgressMini
// //                   label="🚀 Advance"
// //                   done={advanceDone}
// //                   total={advanceTotal}
// //                 />

// //               </div>

// //               <div
// //                 style={{
// //                   marginTop: 14,
// //                   padding: '10px 12px',
// //                   background: '#f8fafc',
// //                   borderRadius: 8,
// //                   fontSize: 11.5,
// //                   color: '#64748b',
// //                 }}
// //               >
// //                 <strong style={{ color: '#102a56' }}>
// //                   Overall checklist:
// //                 </strong>{' '}
// //                 {checklistDone} / {checklistTotal} completed
// //               </div>
// //             </section>

// //             {/* WRITE UPS */}
// //             {/* WRITE-UP QUESTIONS */}
// // <section className="card" style={{ padding: 16 }}>
// //   <SectionTitle
// //     icon="📝"
// //     title="Write-up questions"
// //     subtitle={
// //       writeupTotal
// //         ? `${writeupDone} of ${writeupTotal} answered`
// //         : "Employee answers"
// //     }
// //   />

// //   {dp?.writeups?.length > 0 ? (
// //     <div style={{ marginTop: 12 }}>
// //       {dp.writeups.map((item, index) => {
// //         const question =
// //           item?.question ||
// //           item?.title ||
// //           item?.name ||
// //           `Question ${index + 1}`;

// //         const answer =
// //           item?.answer ??
// //           item?.response ??
// //           item?.textAnswer ??
// //           item?.text ??
// //           "";

// //         const answered =
// //           String(answer).trim().length > 0;

// //         return (
// //           <div
// //             key={item?._id || item?.id || index}
// //             style={{
// //               padding: "13px 0",
// //               borderBottom: "1px solid #e2e8f0",
// //             }}
// //           >
// //             {/* QUESTION */}
// //             <div
// //               style={{
// //                 fontSize: 12,
// //                 fontWeight: 700,
// //                 color: "#102a56",
// //                 lineHeight: 1.5,
// //               }}
// //             >
// //               Q{index + 1}. {question}
// //             </div>

// //             {/* ANSWER */}
// //             <div
// //               style={{
// //                 marginTop: 8,
// //                 padding: "10px 12px",
// //                 background: answered
// //                   ? "#f8fafc"
// //                   : "#f1f5f9",
// //                 borderRadius: 8,
// //                 border: "1px solid #e2e8f0",
// //                 fontSize: 11.5,
// //                 lineHeight: 1.6,
// //                 color: answered
// //                   ? "#334155"
// //                   : "#94a3b8",
// //                 whiteSpace: "pre-wrap",
// //               }}
// //             >
// //               {answered
// //                 ? answer
// //                 : "No answer submitted"}
// //             </div>

// //             {/* STATUS */}
// //             <div
// //               style={{
// //                 marginTop: 5,
// //                 fontSize: 10.5,
// //                 fontWeight: 600,
// //                 color: answered
// //                   ? "#16a34a"
// //                   : "#94a3b8",
// //               }}
// //             >
// //               {answered
// //                 ? "✓ Answered"
// //                 : "○ Not answered"}
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   ) : (
// //     <div
// //       className="muted"
// //       style={{
// //         marginTop: 12,
// //         fontSize: 12,
// //       }}
// //     >
// //       No write-up questions available.
// //     </div>
// //   )}
// // </section>  

// //             {/* PPT */}
// //            <section className="card" style={{ padding: 16 }}>
// //   <SectionTitle
// //     icon="📊"
// //     title="PPT exercise uploads"
// //     subtitle={`${domainPpts.length} submitted for this domain`}
// //   />

// //   <div style={{ marginTop: 10 }}>
// //     {pptLoading ? (
// //       <div
// //         className="muted"
// //         style={{ padding: 10, fontSize: 12 }}
// //       >
// //         Loading PPT submissions...
// //       </div>
// //     ) : domainPpts.length === 0 ? (
// //       <div
// //         className="muted"
// //         style={{ padding: 10, fontSize: 12 }}
// //       >
// //         No PPT submitted for this domain.
// //       </div>
// //     ) : (
// //       domainPpts.map((submission) => (
// //         <div
// //           key={submission._id}
// //           style={{
// //             padding: '12px 0',
// //             borderBottom: '1px solid #e2e8f0',
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: 'flex',
// //               justifyContent: 'space-between',
// //               alignItems: 'flex-start',
// //               gap: 12,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 flex: 1,
// //                 minWidth: 0,
// //               }}
// //             >
// //               {/* EXERCISE NAME */}
// //               <div
// //                 style={{
// //                   fontSize: 12,
// //                   fontWeight: 700,
// //                   color: '#102a56',
// //                 }}
// //               >
// //                 {submission.exerciseName || 'PPT Exercise'}
// //               </div>

// //               {/* EMPLOYEE */}
// //               <div
// //                 style={{
// //                   marginTop: 4,
// //                   fontSize: 10.5,
// //                   color: '#64748b',
// //                 }}
// //               >
// //                 Submitted by:{' '}
// //                 {submission.uploadedBy?.name || user.name}
// //               </div>

// //               {/* DATE */}
// //               {submission.createdAt && (
// //                 <div
// //                   style={{
// //                     marginTop: 3,
// //                     fontSize: 10.5,
// //                     color: '#94a3b8',
// //                   }}
// //                 >
// //                   {new Date(
// //                     submission.createdAt
// //                   ).toLocaleDateString('en-IN', {
// //                     day: '2-digit',
// //                     month: 'short',
// //                     year: 'numeric',
// //                   })}
// //                 </div>
// //               )}

// //               {/* GOOGLE DRIVE LINK */}
// //               <div
// //                 style={{
// //                   marginTop: 8,
// //                   padding: '8px 10px',
// //                   background: '#f8fafc',
// //                   border: '1px solid #e2e8f0',
// //                   borderRadius: 7,
// //                   fontSize: 10.5,
// //                   color: '#475569',
// //                   wordBreak: 'break-all',
// //                 }}
// //               >
// //                 <strong style={{ color: '#102a56' }}>
// //                   Google Drive:
// //                 </strong>{' '}
// //                 {submission.googleDriveLink || 'No link available'}
// //               </div>
// //             </div>

// //             {/* VIEW BUTTON */}
// //             <button
// //   className="training-small-button"
// //   disabled={!submission.googleDriveLink}
// //   onClick={() => {
// //     if (submission.googleDriveLink) {
// //       window.open(
// //         submission.googleDriveLink,
// //         '_blank',
// //         'noopener,noreferrer'
// //       );
// //     }
// //   }}
// // >
// //   🔗 View PPT
// // </button>
// //           </div>
// //         </div>
// //       ))
// //     )}
// //   </div>
// // </section>
// //           </div>
// //         </>
// //       )}

// //       {/* ASSIGN DOMAIN MODAL */}
// //       {showDomainModal && (
// //         <div
// //           style={{
// //             position: 'fixed',
// //             inset: 0,
// //             background: 'rgba(0,0,0,0.6)',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             zIndex: 9999,
// //             padding: 20,
// //           }}
// //         >
// //           <div className="card" style={{ width: '100%', maxWidth: 500, maxHeight: '80vh', overflowY: 'auto', padding: 24 }}>
// //             <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
// //               <div>
// //                 <h2 style={{ margin: 0 }}>Assign Domains</h2>
// //                 <p className="muted">Select domains for {user.name}</p>
// //               </div>

// //               <button className="btn link" onClick={() => setShowDomainModal(false)}>
// //                 ✕
// //               </button>
// //             </div>

// //             <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// //               {allDomains.map(domain => {
// //                 const domainId = String(domain._id || domain.id);
// //                 const checked = selectedDomains.includes(domainId);

// //                 return (
// //                   <label
// //                     key={domainId}
// //                     style={{
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: 12,
// //                       padding: 14,
// //                       border: '1px solid var(--border)',
// //                       borderRadius: 8,
// //                       cursor: 'pointer',
// //                     }}
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={checked}
// //                       onChange={() => toggleDomain(domainId)}
// //                     />

// //                     <div>
// //                       <div style={{ fontWeight: 700 }}>{domain.name}</div>
// //                       {domain.description && (
// //                         <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>
// //                           {domain.description}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </label>
// //                 );
// //               })}
// //             </div>

// //             <div className="row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
// //               <button className="btn" onClick={() => setShowDomainModal(false)}>
// //                 Cancel
// //               </button>

// //               <button className="btn primary" onClick={saveDomains} disabled={savingDomains}>
// //                 {savingDomains ? 'Saving...' : 'Save Domains'}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // function SectionTitle({ icon, title, subtitle }) {
// //   return (
// //     <div className="section-title">
// //       <span className="section-icon">{icon}</span>
// //       <div>
// //         <div className="section-heading">{title}</div>
// //         <div className="section-subtitle">{subtitle}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // function ProgressMini({ label, done, total }) {
// //   const d = Number(done || 0);
// //   const t = Number(total || 0);
// //   const percent = t ? Math.min(100, Math.max(0, (d / t) * 100)) : 0;

// //   return (
// //     <div style={{ background: '#f8fafc', borderRadius: 9, padding: 10, marginBottom: 9 }}>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#52658a' }}>
// //         <span>{label}</span>
// //         <span>{d} / {t}</span>
// //       </div>

// //       <div style={{ marginTop: 7, height: 5, background: '#dfe6ef', borderRadius: 99, overflow: 'hidden' }}>
// //         <div style={{ width: `${percent}%`, height: '100%', background: '#08a6c7' }} />
// //       </div>
// //     </div>
// //   );
// // }

// //-------------------------------------------------//



// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../api/client';
// import { Kpi, LoadingPage, Empty } from '../../components/ui';
// import { useToast } from '../../components/Toast';

// export default function EmployeeDetail() {
//   const { id } = useParams();
//   const nav = useNavigate();
//   const { toastError } = useToast();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [allDomains, setAllDomains] = useState([]);
//   const [selectedDomainId, setSelectedDomainId] = useState(null);

//   const [selectedDomains, setSelectedDomains] = useState([]);
//   const [showDomainModal, setShowDomainModal] = useState(false);
//   const [savingDomains, setSavingDomains] = useState(false);

//   const [pptSubmissions, setPptSubmissions] = useState([]);
//   const [pptLoading, setPptLoading] = useState(true);
//   // const [employeeChecklists, setEmployeeChecklists] = useState([]);
//   // const [checklistLoading, setChecklistLoading] = useState(false);
//   const [previewDoc, setPreviewDoc] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         setData(await api.employeeProgress(id));
//       } catch (e) {
//         toastError(e);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const result = await api.listDomains();
//         setAllDomains(result?.domains || result || []);
//       } catch (e) {
//         toastError(e);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       try {
//         setPptLoading(true);
//         const result = await api.getEmployeePptSubmissions(id);
//         setPptSubmissions(result?.submissions || []);
//       } catch (e) {
//         console.error('[PPT submissions]', e);
//         setPptSubmissions([]);
//       } finally {
//         setPptLoading(false);
//       }
//     })();
//   }, [id]);

//   // Select the first assigned domain once data is available.
//   // useEffect(() => {
//   //   if (selectedDomainId) return;

//   //   const assignedIds = (data?.user?.assignedDomains || [])
//   //     .map((d) => (typeof d === 'string' ? d : d?._id || d?.id))
//   //     .filter(Boolean)
//   //     .map(String);

//   //   const available = allDomains || [];
//   //   const firstAssigned =
//   //     available.find((d) => assignedIds.includes(String(d._id || d.id))) || available[0];

//   //   if (firstAssigned) {
//   //     setSelectedDomainId(String(firstAssigned._id || firstAssigned.id));
//   //   }
//   // }, [data, allDomains, selectedDomainId]);


// //   useEffect(() => {
// //   const loadEmployeeChecklists = async () => {
// //     if (!selectedDomainId) return;

// //     try {
// //       setChecklistLoading(true);

// //       /*
// //        * Get the documents/materials belonging to the selected domain.
// //        * Each document can have checklist definitions attached to it.
// //        */
// //       const docsResponse = await api.listDocuments(selectedDomainId);

// //       const documents = docsResponse?.documents || [];

// //       const allChecklists = [];

// //       await Promise.all(
// //         documents.map(async (doc) => {
// //           try {
// //             const response = await api.checklistsForDocument(
// //               doc._id || doc.id
// //             );

// //             const checklists = response?.checklists || [];

// //             allChecklists.push(
// //               ...checklists.map((checklist) => ({
// //                 ...checklist,
// //                 documentTitle: doc.title,
// //               }))
// //             );
// //           } catch (error) {
// //             console.error(
// //               '[employee checklist] document error:',
// //               error
// //             );
// //           }
// //         })
// //       );

// //       setEmployeeChecklists(allChecklists);
// //     } catch (error) {
// //       console.error(
// //         '[employee checklist]',
// //         error
// //       );

// //       setEmployeeChecklists([]);
// //     } finally {
// //       setChecklistLoading(false);
// //     }
// //   };

// //   loadEmployeeChecklists();
// // }, [selectedDomainId]);

// // Select the first assigned domain automatically
// useEffect(() => {
//   if (selectedDomainId) return;
//   if (!data?.user) return;

//   const assignedIds = (data.user.assignedDomains || [])
//     .map((d) =>
//       typeof d === 'string'
//         ? d
//         : d?._id || d?.id
//     )
//     .filter(Boolean)
//     .map(String);

//   const firstAssigned = (allDomains || []).find((domain) =>
//     assignedIds.includes(
//       String(domain._id || domain.id)
//     )
//   );

//   if (firstAssigned) {
//     setSelectedDomainId(
//       String(firstAssigned._id || firstAssigned.id)
//     );
//   }
// }, [data, allDomains, selectedDomainId]);

//   if (loading) return <LoadingPage />;
//   if (!data) return <Empty>Engineer not found.</Empty>;

//   const { user, progress = {}, summary = {} } = data;

//   const assignedIds = (user.assignedDomains || [])
//     .map((d) => (typeof d === 'string' ? d : d?._id || d?.id))
//     .filter(Boolean)
//     .map(String);

//   // Backend progress is keyed by domain.key; index it by domainId instead.
//   const progressByDomainId = {};
//   Object.values(progress).forEach((d) => {
//     if (d?.domainId) progressByDomainId[String(d.domainId)] = d;
//   });

//   // Build the tab list from all domains, marking assignment + attaching progress.
//   const domainMap = new Map();
//   (allDomains || []).forEach((d) => {
//     const domainId = String(d._id || d.id);
//     if (!domainId) return;
//     domainMap.set(domainId, { ...d, _id: domainId });
//   });
//   Object.values(progress).forEach((d) => {
//     const domainId = String(d.domainId);
//     if (!domainId) return;
//     domainMap.set(domainId, { ...(domainMap.get(domainId) || {}), ...d, _id: domainId });
//   });

//   const domains = Array.from(domainMap.values())
//     .map((d) => ({ ...d, assigned: assignedIds.includes(String(d._id)) }))
//     .sort((a, b) => {
//       if (a.assigned && !b.assigned) return -1;
//       if (!a.assigned && b.assigned) return 1;
//       return String(a.name || '').localeCompare(String(b.name || ''));
//     });

//   const selectedDomain = domains.find((d) => String(d._id) === String(selectedDomainId));
//   const detail = progressByDomainId[String(selectedDomainId)] || {};

//   // ---- calculated, DB-backed numbers for the selected domain ----
//   const trainingScore = Number(detail.score ?? detail.overall ?? 0);

//   const checklistTotal = Number(detail.checklistTotal || 0);
//   const checklistDone = Number(detail.checklistCompleted || 0);
//   const toolDone = Number(detail.toolCompleted || 0);
//   const toolTotal = Number(detail.toolTotal || 0);
//   const conceptDone = Number(detail.conceptCompleted || 0);
//   const conceptTotal = Number(detail.conceptTotal || 0);
//   const writeupTotal = Number(detail.writeupTotal || 0);
//   const writeupDone = Number(detail.writeupAnswered || 0);
//   const materials = detail.materialsList || [];
//   const materialTotal = Number(detail.materialsTotal || materials.length || 0);
//   const materialDone = Number(detail.materialsReviewed || 0);
//   const checklists = detail.checklists || [];
//   const writeupGroups = detail.writeups || [];

//   const domainPpts = pptSubmissions.filter((submission) => {
//     const submissionDomainId = submission.domain?._id || submission.domain;
//     return String(submissionDomainId) === String(selectedDomainId);
//   });

//   const openDomainModal = () => {
//     setSelectedDomains(assignedIds);
//     setShowDomainModal(true);
//   };

//   const toggleDomain = (domainId) => {
//     const value = String(domainId);
//     setSelectedDomains((current) => {
//       const normalized = current.map(String);
//       return normalized.includes(value)
//         ? normalized.filter((x) => x !== value)
//         : [...normalized, value];
//     });
//   };

//   const saveDomains = async () => {
//     try {
//       setSavingDomains(true);
//       const result = await api.assignUserDomains(id, selectedDomains);
//       setData((current) => ({
//         ...current,
//         user: { ...current.user, assignedDomains: result.assignedDomains || selectedDomains },
//       }));
//       setShowDomainModal(false);
//     } catch (e) {
//       toastError(e);
//     } finally {
//       setSavingDomains(false);
//     }
//   };

//   const openMaterial = (doc) => {
//     if (doc.cloudinaryUrl || doc.previewUrl) setPreviewDoc(doc);
//   };

//   return (
//     <>
//       <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>
//         ← Back
//       </button>

//       <div
//         className="page-head"
//         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}
//       >
//         <div>
//           <h1>{user.name}</h1>
//           <p>{user.email} · {user.employeeCode}</p>
//         </div>

//         <button className="btn" onClick={openDomainModal}>Assign Domains</button>
//       </div>

//       {/* TOP KPIs */}
//       <div className="grid grid-3">
//         <Kpi icon="📅" value={summary.daysEnrolled ?? 0} label="Days enrolled" />
//         <Kpi icon="✅" value={`${summary.avgCompletion ?? 0}%`} label="Average completion" />
//         <Kpi
//           icon="🗂️"
//           value={`${summary.domainsStarted ?? 0} / ${summary.totalDomains ?? domains.length}`}
//           label="Domains"
//         />
//       </div>

//       {/* DOMAIN TABS */}
//       <section className="card" style={{ marginTop: 20, padding: 14 }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#102a56', marginBottom: 10 }}>Domains</div>

//         <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
//           {domains.map((domain) => {
//             const assigned = domain.assigned;
//             const active = String(domain._id) === String(selectedDomainId);
//             const p = Math.max(0, Math.min(100, Number(progressByDomainId[String(domain._id)]?.score || 0)));

//             return (
//               <button
//                 key={domain._id}
//                 type="button"
//                 disabled={!assigned}
//                 onClick={() => assigned && setSelectedDomainId(String(domain._id))}
//                 style={{
//                   flex: '0 0 auto',
//                   minWidth: 140,
//                   border: active && assigned ? '1px solid #08a6c7' : '1px solid #dbe3ec',
//                   background: active && assigned ? '#eefbfe' : '#fff',
//                   borderRadius: 10,
//                   padding: '10px 12px',
//                   textAlign: 'left',
//                   cursor: assigned ? 'pointer' : 'not-allowed',
//                   opacity: assigned ? 1 : 0.5,
//                 }}
//               >
//                 <div style={{ fontSize: 12.5, fontWeight: 700, color: '#102a56' }}>
//                   {domain.icon || '📚'} {domain.name}
//                 </div>

//                 {assigned ? (
//                   <>
//                     <div
//                       style={{
//                         height: 5,
//                         background: '#e8edf5',
//                         borderRadius: 99,
//                         overflow: 'hidden',
//                         marginTop: 8,
//                       }}
//                     >
//                       <div style={{ width: `${p}%`, height: '100%', background: '#08a6c7' }} />
//                     </div>
//                     <div style={{ marginTop: 5, fontSize: 10.5, color: '#64748b' }}>{p}% complete</div>
//                   </>
//                 ) : (
//                   <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
//                     🔒 Not Assigned
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </section>

//       {/* LOCKED / NOT-ASSIGNED PANEL */}
//       {selectedDomain && !selectedDomain.assigned && (
//         <section
//           className="card"
//           style={{ marginTop: 22, padding: 40, textAlign: 'center' }}
//         >
//           <div style={{ fontSize: 34, marginBottom: 10 }}>🔒</div>
//           <div style={{ fontSize: 16, fontWeight: 700, color: '#102a56' }}>
//             {selectedDomain.name}
//           </div>
//           <div style={{ marginTop: 6, fontSize: 13, color: '#64748b' }}>
//             Not assigned to the employee.
//           </div>
//         </section>
//       )}

//       {/* SELECTED DOMAIN DETAIL — same layout as the employee side */}
//       {selectedDomain?.assigned && (
//         <>
//           <div style={{ marginTop: 22, marginBottom: 12 }}>
//             <div style={{ fontSize: 11, color: '#64748b' }}>Domains › {selectedDomain.name}</div>
//             <h2 style={{ margin: '4px 0 0', color: '#102a56', fontSize: 20 }}>
//               {selectedDomain.description || selectedDomain.name}
//             </h2>
//           </div>

//           {/* TRAINING SCORE (calculated) */}
//           <section className="card" style={{ padding: 18, marginBottom: 16 }}>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//               <div
//                 style={{
//                   width: 88,
//                   height: 88,
//                   borderRadius: '50%',
//                   background: `conic-gradient(#08a6c7 ${trainingScore * 3.6}deg, #e4e9f1 0deg)`,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 68,
//                     height: 68,
//                     borderRadius: '50%',
//                     background: '#fff',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: 16,
//                     fontWeight: 800,
//                     color: '#102a56',
//                   }}
//                 >
//                   {trainingScore}%
//                 </div>
//               </div>

//               <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#102a56' }}>Training score</div>
//               <div style={{ marginTop: 4, fontSize: 11.5, color: '#64748b' }}>
//                 {user.name} · {selectedDomain.name}
//               </div>
//               <div style={{ marginTop: 4, fontSize: 11, color: '#64748b' }}>
//                 {checklistDone} of {checklistTotal} checklist items · {writeupDone} of {writeupTotal} answered
//               </div>
//             </div>
//           </section>

//           <div className="grid grid-2">
//             {/* TRAINING MATERIAL */}
//             <section className="card" style={{ padding: 16 }}>
//               <SectionTitle
//                 icon="📖"
//                 title="Training material"
//                 subtitle={materialTotal ? `${materialDone} of ${materialTotal} reviewed` : 'Training material'}
//               />

//               {materials.length ? (
//                 <div style={{ marginTop: 10 }}>
//                   {materials.map((item) => (
//                     <div
//                       key={item.id}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         gap: 12,
//                         padding: '11px 0',
//                         borderBottom: '1px solid #e2e8f0',
//                       }}
//                     >
//                       <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0, flex: 1 }}>
//                         <span style={{ fontSize: 15 }}>{item.reviewed ? '☑️' : '⬜'}</span>
//                         <div style={{ minWidth: 0 }}>
//                           <div
//                             style={{
//                               fontSize: 12,
//                               fontWeight: 600,
//                               color: '#334155',
//                               overflow: 'hidden',
//                               textOverflow: 'ellipsis',
//                               whiteSpace: 'nowrap',
//                             }}
//                           >
//                             {item.title}
//                           </div>
//                           <div style={{ fontSize: 10.5, color: item.reviewed ? '#16a34a' : '#94a3b8', marginTop: 3 }}>
//                             {item.reviewed ? 'Reviewed' : 'Not reviewed'}
//                           </div>
//                         </div>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() => openMaterial(item)}
//                         style={{
//                           flex: '0 0 auto',
//                           border: '1px solid #dbe3ec',
//                           background: '#fff',
//                           color: '#102a56',
//                           borderRadius: 7,
//                           padding: '6px 13px',
//                           fontSize: 11,
//                           fontWeight: 700,
//                           cursor: 'pointer',
//                         }}
//                       >
//                         👁 View
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="muted" style={{ marginTop: 12, fontSize: 12 }}>
//                   No training material available.
//                 </div>
//               )}
//             </section>

//             {/* CHECKLIST SUMMARY */}
//             <section className="card" style={{ padding: 16 }}>
//               <SectionTitle
//                 icon="☑️"
//                 title="Training checklist"
//                 subtitle={checklistTotal ? `${checklistDone} of ${checklistTotal} completed` : 'Employee checklist progress'}
//               />

//               <div style={{ marginTop: 12 }}>
//                 <ProgressMini label="🔧 Tool" done={toolDone} total={toolTotal} />
//                 <ProgressMini label="📚 Concept" done={conceptDone} total={conceptTotal} />
//                 <ProgressMini label="✍️ Write-ups" done={writeupDone} total={writeupTotal} />
//               </div>

//               <div
//                 style={{
//                   marginTop: 14,
//                   padding: '10px 12px',
//                   background: '#f8fafc',
//                   borderRadius: 8,
//                   fontSize: 11.5,
//                   color: '#64748b',
//                 }}
//               >
//                 <strong style={{ color: '#102a56' }}>Overall checklist:</strong>{' '}
//                 {checklistDone} / {checklistTotal} completed
//               </div>
//             </section>
//           </div>

//           {/* FULL CHECKLIST (all items, employee's real state) */}
//           {/* =====================================================
//     FULL CHECKLIST
// ===================================================== */}

// <section
//   className="card"
//   style={{
//     padding: 16,
//     marginTop: 16,
//   }}
// >
//   <SectionTitle
//     icon="☑️"
//     title="Full checklist"
//     subtitle={
//       checklistTotal
//         ? `${checklistDone} of ${checklistTotal} items completed`
//         : 'Employee checklist progress'
//     }
//   />

//   {checklists.length === 0 ? (
//     <div
//       className="muted"
//       style={{
//         marginTop: 14,
//         fontSize: 12,
//       }}
//     >
//       No checklist items available.
//     </div>
//   ) : (
//     <div style={{ marginTop: 18 }}>

//       {checklists.map((checklist, checklistIndex) => {

//         /*
//          * Each checklist = SECTION
//          */
//         const sectionTitle =
//           checklist.title ||
//           checklist.name ||
//           `Section ${checklistIndex + 1}`;

//         const items = checklist.items || [];

//         /*
//          * Group checklist items by category.
//          *
//          * Example:
//          * Tool
//          * Concept
//          * Practical
//          * Advance
//          */
//         const groupedItems = {};

//         items.forEach((item) => {
//           const topic =
//             item.category ||
//             item.topic ||
//             item.topicName ||
//             'General';

//           if (!groupedItems[topic]) {
//             groupedItems[topic] = [];
//           }

//           groupedItems[topic].push(item);
//         });

//         return (
//           <div
//             key={
//               checklist.id ||
//               checklist._id ||
//               checklistIndex
//             }
//             style={{
//               marginBottom: 26,
//             }}
//           >

//             {/* SECTION */}
//             <div
//               style={{
//                 fontSize: 14,
//                 fontWeight: 800,
//                 color: '#102a56',
//                 marginBottom: 12,
//               }}
//             >
//               {sectionTitle}
//             </div>

//             {Object.entries(groupedItems).map(
//               ([topicName, topicItems]) => (
//                 <div
//                   key={topicName}
//                   style={{
//                     marginBottom: 18,
//                   }}
//                 >

//                   {/* TOPIC */}
//                   <div
//                     style={{
//                       fontSize: 11,
//                       fontWeight: 800,
//                       color: '#52658a',
//                       textTransform: 'uppercase',
//                       marginBottom: 7,
//                       paddingLeft: 3,
//                     }}
//                   >
//                     {topicName}
//                   </div>

//                   {/* TABLE */}
//                   <div
//                     style={{
//                       border: '1px solid #dbe3ec',
//                       borderRadius: 9,
//                       overflowX: 'auto',
//                     }}
//                   >
//                     <div
//                       style={{
//                         minWidth: 650,
//                       }}
//                     >

//                       {/* HEADER */}
//                       <div
//                         style={{
//                           display: 'grid',
//                           gridTemplateColumns:
//                             '70px 90px minmax(280px, 1fr) 100px',
//                           background: '#08a9c7',
//                           color: '#fff',
//                           fontSize: 10.5,
//                           fontWeight: 750,
//                         }}
//                       >
//                         <div
//                           style={{
//                             padding: '9px 8px',
//                             textAlign: 'center',
//                           }}
//                         >
//                           Tried
//                         </div>

//                         <div
//                           style={{
//                             padding: '9px 8px',
//                             textAlign: 'center',
//                           }}
//                         >
//                           Understood
//                         </div>

//                         <div
//                           style={{
//                             padding: '9px 10px',
//                           }}
//                         >
//                           Checklist item
//                         </div>

//                         <div
//                           style={{
//                             padding: '9px 8px',
//                             textAlign: 'center',
//                           }}
//                         >
//                           Proficiency
//                         </div>
//                       </div>

//                       {/* ITEMS */}
//                       {topicItems.map(
//                         (item, itemIndex) => {

//                           const tried =
//                             item?.tried === true ||
//                             item?.isTried === true ||
//                             item?.attempted === true;

//                           const understood =
//                             item?.understood === true ||
//                             item?.isUnderstood === true ||
//                             item?.completed === true;

//                           const proficiency =
//                             item?.proficiency ??
//                             item?.rating ??
//                             item?.score ??
//                             '-';

//                           const itemText =
//                             item?.text ||
//                             item?.title ||
//                             item?.name ||
//                             item?.question ||
//                             `Checklist item ${itemIndex + 1}`;

//                           return (
//                             <div
//                               key={
//                                 item.id ||
//                                 item._id ||
//                                 itemIndex
//                               }
//                               style={{
//                                 display: 'grid',
//                                 gridTemplateColumns:
//                                   '70px 90px minmax(280px, 1fr) 100px',
//                                 borderTop:
//                                   '1px solid #e2e8f0',
//                                 background:
//                                   itemIndex % 2 === 0
//                                     ? '#fff'
//                                     : '#f8fafc',
//                                 fontSize: 11,
//                               }}
//                             >

//                               {/* TRIED */}
//                               <div
//                                 style={{
//                                   display: 'flex',
//                                   justifyContent: 'center',
//                                   alignItems: 'center',
//                                   padding: 10,
//                                 }}
//                               >
//                                 <span
//                                   style={{
//                                     width: 17,
//                                     height: 17,
//                                     borderRadius: 4,
//                                     border: tried
//                                       ? '1px solid #08a9c7'
//                                       : '1px solid #94a3b8',
//                                     background: tried
//                                       ? '#08a9c7'
//                                       : '#fff',
//                                     color: '#fff',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     fontSize: 10,
//                                     fontWeight: 800,
//                                   }}
//                                 >
//                                   {tried ? '✓' : ''}
//                                 </span>
//                               </div>

//                               {/* UNDERSTOOD */}
//                               <div
//                                 style={{
//                                   display: 'flex',
//                                   justifyContent: 'center',
//                                   alignItems: 'center',
//                                   padding: 10,
//                                 }}
//                               >
//                                 <span
//                                   style={{
//                                     width: 17,
//                                     height: 17,
//                                     borderRadius: 4,
//                                     border: understood
//                                       ? '1px solid #08a9c7'
//                                       : '1px solid #94a3b8',
//                                     background: understood
//                                       ? '#08a9c7'
//                                       : '#fff',
//                                     color: '#fff',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     fontSize: 10,
//                                     fontWeight: 800,
//                                   }}
//                                 >
//                                   {understood ? '✓' : ''}
//                                 </span>
//                               </div>

//                               {/* CHECKLIST ITEM */}
//                               <div
//                                 style={{
//                                   padding: '10px 12px',
//                                   lineHeight: 1.5,
//                                   color: '#334155',
//                                 }}
//                               >
//                                 {itemText}
//                               </div>

//                               {/* PROFICIENCY */}
//                               <div
//                                 style={{
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   justifyContent: 'center',
//                                   padding: 8,
//                                 }}
//                               >
//                                 <span
//                                   style={{
//                                     minWidth: 36,
//                                     padding: '5px 7px',
//                                     textAlign: 'center',
//                                     border: '1px solid #dbe3ec',
//                                     borderRadius: 6,
//                                     background: '#fff',
//                                     fontSize: 10,
//                                     fontWeight: 700,
//                                     color: '#334155',
//                                   }}
//                                 >
//                                   {proficiency}
//                                 </span>
//                               </div>
//                             </div>
//                           );
//                         }
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         );
//       })}
//     </div>
//   )}
// </section>

//           {/* WRITE-UP QUESTIONS (all questions + employee's answers) */}
//           <section className="card" style={{ padding: 16, marginTop: 16 }}>
//             <SectionTitle
//               icon="📝"
//               title="Write-up questions"
//               subtitle={writeupTotal ? `${writeupDone} of ${writeupTotal} answered` : 'Employee answers'}
//             />

//             {writeupGroups.length === 0 ? (
//               <div className="muted" style={{ marginTop: 12, fontSize: 12 }}>No write-up questions available.</div>
//             ) : (
//               writeupGroups.map((w) => (
//                 <div key={w.id} style={{ marginTop: 14 }}>
//                   <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>{w.title}</div>

//                   {(w.questions || []).map((q, index) => (
//                     <div key={q.id} style={{ padding: '13px 0', borderBottom: '1px solid #e2e8f0' }}>
//                       <div style={{ fontSize: 12, fontWeight: 700, color: '#102a56', lineHeight: 1.5 }}>
//                         Q{index + 1}. {q.text}
//                       </div>

//                       <div
//                         style={{
//                           marginTop: 8,
//                           padding: '10px 12px',
//                           background: q.answered ? '#f8fafc' : '#f1f5f9',
//                           borderRadius: 8,
//                           border: '1px solid #e2e8f0',
//                           fontSize: 11.5,
//                           lineHeight: 1.6,
//                           color: q.answered ? '#334155' : '#94a3b8',
//                           whiteSpace: 'pre-wrap',
//                         }}
//                       >
//                         {q.answered ? q.answer : 'No answer submitted'}
//                       </div>

//                       <div
//                         style={{
//                           marginTop: 5,
//                           fontSize: 10.5,
//                           fontWeight: 600,
//                           color: q.answered ? '#16a34a' : '#94a3b8',
//                         }}
//                       >
//                         {q.answered ? '✓ Answered' : '○ Not answered'}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))
//             )}
//           </section>

//           {/* PPT EXERCISE UPLOADS */}
//           <section className="card" style={{ padding: 16, marginTop: 16 }}>
//             <SectionTitle
//               icon="📊"
//               title="PPT exercise uploads"
//               subtitle={`${domainPpts.length} submitted for this domain`}
//             />

//             <div style={{ marginTop: 10 }}>
//               {pptLoading ? (
//                 <div className="muted" style={{ padding: 10, fontSize: 12 }}>Loading PPT submissions...</div>
//               ) : domainPpts.length === 0 ? (
//                 <div className="muted" style={{ padding: 10, fontSize: 12 }}>No PPT submitted for this domain.</div>
//               ) : (
//                 domainPpts.map((submission) => (
//                   <div key={submission._id} style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ fontSize: 12, fontWeight: 700, color: '#102a56' }}>
//                           {submission.exerciseName || submission.exercise || 'PPT Exercise'}
//                         </div>

//                         <div style={{ marginTop: 4, fontSize: 10.5, color: '#64748b' }}>
//                           Submitted by: {submission.uploadedBy?.name || user.name}
//                         </div>

//                         {submission.createdAt && (
//                           <div style={{ marginTop: 3, fontSize: 10.5, color: '#94a3b8' }}>
//                             {new Date(submission.createdAt).toLocaleDateString('en-IN', {
//                               day: '2-digit',
//                               month: 'short',
//                               year: 'numeric',
//                             })}
//                           </div>
//                         )}

//                         <div
//                           style={{
//                             marginTop: 8,
//                             padding: '8px 10px',
//                             background: '#f8fafc',
//                             border: '1px solid #e2e8f0',
//                             borderRadius: 7,
//                             fontSize: 10.5,
//                             color: '#475569',
//                             wordBreak: 'break-all',
//                           }}
//                         >
//                           <strong style={{ color: '#102a56' }}>Google Drive:</strong>{' '}
//                           {submission.googleDriveLink || 'No link available'}
//                         </div>
//                       </div>

//                       <button
//                         className="training-small-button"
//                         disabled={!submission.googleDriveLink}
//                         onClick={() => {
//                           if (submission.googleDriveLink) {
//                             window.open(submission.googleDriveLink, '_blank', 'noopener,noreferrer');
//                           }
//                         }}
//                       >
//                         🔗 View PPT
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </section>
//         </>
//       )}

//       {/* ASSIGN DOMAIN MODAL */}
//       {showDomainModal && (
//         <div
//           style={{
//             position: 'fixed',
//             inset: 0,
//             background: 'rgba(0,0,0,0.6)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 9999,
//             padding: 20,
//           }}
//         >
//           <div className="card" style={{ width: '100%', maxWidth: 500, maxHeight: '80vh', overflowY: 'auto', padding: 24 }}>
//             <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
//               <div>
//                 <h2 style={{ margin: 0 }}>Assign Domains</h2>
//                 <p className="muted">Select domains for {user.name}</p>
//               </div>

//               <button className="btn link" onClick={() => setShowDomainModal(false)}>✕</button>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//               {allDomains.map((domain) => {
//                 const domainId = String(domain._id || domain.id);
//                 const checked = selectedDomains.includes(domainId);

//                 return (
//                   <label
//                     key={domainId}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 12,
//                       padding: 14,
//                       border: '1px solid var(--border)',
//                       borderRadius: 8,
//                       cursor: 'pointer',
//                     }}
//                   >
//                     <input type="checkbox" checked={checked} onChange={() => toggleDomain(domainId)} />
//                     <div>
//                       <div style={{ fontWeight: 700 }}>{domain.name}</div>
//                       {domain.description && (
//                         <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>{domain.description}</div>
//                       )}
//                     </div>
//                   </label>
//                 );
//               })}
//             </div>

//             <div className="row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
//               <button className="btn" onClick={() => setShowDomainModal(false)}>Cancel</button>
//               <button className="btn primary" onClick={saveDomains} disabled={savingDomains}>
//                 {savingDomains ? 'Saving...' : 'Save Domains'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* MATERIAL PREVIEW MODAL */}
//       {previewDoc && (
//         <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
//           <div
//             style={{
//               height: 58,
//               background: '#fff',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               padding: '0 18px',
//               borderBottom: '1px solid #e2e8f0',
//               flexShrink: 0,
//             }}
//           >
//             <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//               {previewDoc.title}
//             </div>
//             <button
//               onClick={() => setPreviewDoc(null)}
//               style={{ border: 'none', background: '#f1f5f9', color: '#334155', width: 34, height: 34, borderRadius: 7, cursor: 'pointer', fontSize: 18, fontWeight: 700 }}
//             >
//               ×
//             </button>
//           </div>

//           <div style={{ flex: 1, background: '#e5e7eb', overflow: 'hidden' }}>
//             {previewDoc.cloudinaryUrl || previewDoc.previewUrl ? (
//               <iframe
//                 src={`${previewDoc.cloudinaryUrl || previewDoc.previewUrl}#toolbar=0`}
//                 title={previewDoc.title}
//                 style={{ width: '100%', height: '100%', border: 'none', display: 'block', background: '#fff' }}
//               />
//             ) : (
//               <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
//                 Preview not available.
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style>{`
//         .training-small-button {
//           border: 1px solid #08a9cc; background: #fff; color: #0284a8; border-radius: 6px;
//           padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer;
//         }
//         .training-small-button:disabled { opacity: 0.5; cursor: not-allowed; }
//       `}</style>
//     </>
//   );
// }

// function SectionTitle({ icon, title, subtitle }) {
//   return (
//     <div className="section-title">
//       <span className="section-icon">{icon}</span>
//       <div>
//         <div className="section-heading">{title}</div>
//         <div className="section-subtitle">{subtitle}</div>
//       </div>
//     </div>
//   );
// }

// function ProgressMini({ label, done, total }) {
//   const d = Number(done || 0);
//   const t = Number(total || 0);
//   const percent = t ? Math.min(100, Math.max(0, (d / t) * 100)) : 0;

//   return (
//     <div style={{ background: '#f8fafc', borderRadius: 9, padding: 10, marginBottom: 9 }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#52658a' }}>
//         <span>{label}</span>
//         <span>{d} / {t}</span>
//       </div>
//       <div style={{ marginTop: 7, height: 5, background: '#dfe6ef', borderRadius: 99, overflow: 'hidden' }}>
//         <div style={{ width: `${percent}%`, height: '100%', background: '#08a6c7' }} />
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { Kpi, LoadingPage, Empty } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function EmployeeDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { toastError } = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allDomains, setAllDomains] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState(null);

  const [selectedDomains, setSelectedDomains] = useState([]);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [savingDomains, setSavingDomains] = useState(false);

  const [pptSubmissions, setPptSubmissions] = useState([]);
  const [pptLoading, setPptLoading] = useState(true);

  const [previewDoc, setPreviewDoc] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setData(await api.employeeProgress(id));
      } catch (e) {
        toastError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const result = await api.listDomains();
        setAllDomains(result?.domains || result || []);
      } catch (e) {
        toastError(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setPptLoading(true);
        const result = await api.getEmployeePptSubmissions(id);
        setPptSubmissions(result?.submissions || []);
      } catch (e) {
        console.error('[PPT submissions]', e);
        setPptSubmissions([]);
      } finally {
        setPptLoading(false);
      }
    })();
  }, [id]);

  // Select the first assigned domain once data is available.
  useEffect(() => {
    if (selectedDomainId) return;

    const assignedIds = (data?.user?.assignedDomains || [])
      .map((d) => (typeof d === 'string' ? d : d?._id || d?.id))
      .filter(Boolean)
      .map(String);

    const available = allDomains || [];
    const firstAssigned =
      available.find((d) => assignedIds.includes(String(d._id || d.id))) || available[0];

    if (firstAssigned) {
      setSelectedDomainId(String(firstAssigned._id || firstAssigned.id));
    }
  }, [data, allDomains, selectedDomainId]);

  if (loading) return <LoadingPage />;
  if (!data) return <Empty>Engineer not found.</Empty>;

  const { user, progress = {}, summary = {} } = data;

  const assignedIds = (user.assignedDomains || [])
    .map((d) => (typeof d === 'string' ? d : d?._id || d?.id))
    .filter(Boolean)
    .map(String);

  // Backend progress is keyed by domain.key; index it by domainId instead.
  const progressByDomainId = {};
  Object.values(progress).forEach((d) => {
    if (d?.domainId) progressByDomainId[String(d.domainId)] = d;
  });

  // Build the tab list from all domains, marking assignment + attaching progress.
  const domainMap = new Map();
  (allDomains || []).forEach((d) => {
    const domainId = String(d._id || d.id);
    if (!domainId) return;
    domainMap.set(domainId, { ...d, _id: domainId });
  });
  Object.values(progress).forEach((d) => {
    const domainId = String(d.domainId);
    if (!domainId) return;
    domainMap.set(domainId, { ...(domainMap.get(domainId) || {}), ...d, _id: domainId });
  });

  const domains = Array.from(domainMap.values())
    .map((d) => ({ ...d, assigned: assignedIds.includes(String(d._id)) }))
    .sort((a, b) => {
      if (a.assigned && !b.assigned) return -1;
      if (!a.assigned && b.assigned) return 1;
      return String(a.name || '').localeCompare(String(b.name || ''));
    });

  const selectedDomain = domains.find((d) => String(d._id) === String(selectedDomainId));
  const detail = progressByDomainId[String(selectedDomainId)] || {};

  // ---- calculated, DB-backed numbers for the selected domain ----
  const trainingScore = Number(detail.score ?? detail.overall ?? 0);

  const checklistTotal = Number(detail.checklistTotal || 0);
  const checklistDone = Number(detail.checklistCompleted || 0);
  const toolDone = Number(detail.toolCompleted || 0);
  const toolTotal = Number(detail.toolTotal || 0);
  const conceptDone = Number(detail.conceptCompleted || 0);
  const conceptTotal = Number(detail.conceptTotal || 0);
  const writeupTotal = Number(detail.writeupTotal || 0);
  const writeupDone = Number(detail.writeupAnswered || 0);
  const materials = detail.materialsList || [];
  const materialTotal = Number(detail.materialsTotal || materials.length || 0);
  const materialDone = Number(detail.materialsReviewed || 0);
  const checklists = detail.checklists || [];
  const writeupGroups = detail.writeups || [];

  const domainPpts = pptSubmissions.filter((submission) => {
    const submissionDomainId = submission.domain?._id || submission.domain;
    return String(submissionDomainId) === String(selectedDomainId);
  });

  const openDomainModal = () => {
    setSelectedDomains(assignedIds);
    setShowDomainModal(true);
  };

  const toggleDomain = (domainId) => {
    const value = String(domainId);
    setSelectedDomains((current) => {
      const normalized = current.map(String);
      return normalized.includes(value)
        ? normalized.filter((x) => x !== value)
        : [...normalized, value];
    });
  };

  const saveDomains = async () => {
    try {
      setSavingDomains(true);
      const result = await api.assignUserDomains(id, selectedDomains);
      setData((current) => ({
        ...current,
        user: { ...current.user, assignedDomains: result.assignedDomains || selectedDomains },
      }));
      setShowDomainModal(false);
    } catch (e) {
      toastError(e);
    } finally {
      setSavingDomains(false);
    }
  };

  const openMaterial = (doc) => {
    if (doc.cloudinaryUrl || doc.previewUrl) setPreviewDoc(doc);
  };

  return (
    <>
      <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>
        ← Back
      </button>

      <div
        className="page-head"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}
      >
        <div>
          <h1>{user.name}</h1>
          <p>{user.email} · {user.employeeCode}</p>
        </div>

        <button className="btn" onClick={openDomainModal}>Assign Domains</button>
      </div>

      {/* TOP KPIs */}
      <div className="grid grid-3">
        <Kpi icon="📅" value={summary.daysEnrolled ?? 0} label="Days enrolled" />
        <Kpi icon="✅" value={`${summary.avgCompletion ?? 0}%`} label="Average completion" />
        <Kpi
          icon="🗂️"
          value={`${summary.domainsStarted ?? 0} / ${summary.totalDomains ?? domains.length}`}
          label="Domains"
        />
      </div>

      {/* DOMAIN TABS */}
      <section className="card" style={{ marginTop: 20, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#102a56', marginBottom: 10 }}>Domains</div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {domains.map((domain) => {
            const assigned = domain.assigned;
            const active = String(domain._id) === String(selectedDomainId);
            const p = Math.max(0, Math.min(100, Number(progressByDomainId[String(domain._id)]?.score || 0)));

            return (
              <button
                key={domain._id}
                type="button"
                disabled={!assigned}
                onClick={() => assigned && setSelectedDomainId(String(domain._id))}
                style={{
                  flex: '0 0 auto',
                  minWidth: 140,
                  border: active && assigned ? '1px solid #08a6c7' : '1px solid #dbe3ec',
                  background: active && assigned ? '#eefbfe' : '#fff',
                  borderRadius: 10,
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: assigned ? 'pointer' : 'not-allowed',
                  opacity: assigned ? 1 : 0.5,
                }}
              >
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#102a56' }}>
                  {domain.icon || '📚'} {domain.name}
                </div>

                {assigned ? (
                  <>
                    <div
                      style={{
                        height: 5,
                        background: '#e8edf5',
                        borderRadius: 99,
                        overflow: 'hidden',
                        marginTop: 8,
                      }}
                    >
                      <div style={{ width: `${p}%`, height: '100%', background: '#08a6c7' }} />
                    </div>
                    <div style={{ marginTop: 5, fontSize: 10.5, color: '#64748b' }}>{p}% complete</div>
                  </>
                ) : (
                  <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
                    🔒 Not Assigned
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* LOCKED / NOT-ASSIGNED PANEL */}
      {selectedDomain && !selectedDomain.assigned && (
        <section
          className="card"
          style={{ marginTop: 22, padding: 40, textAlign: 'center' }}
        >
          <div style={{ fontSize: 34, marginBottom: 10 }}>🔒</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#102a56' }}>
            {selectedDomain.name}
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: '#64748b' }}>
            Not assigned to the employee.
          </div>
        </section>
      )}

      {/* SELECTED DOMAIN DETAIL — same layout as the employee side */}
      {selectedDomain?.assigned && (
        <>
          <div style={{ marginTop: 22, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#64748b' }}>Domains › {selectedDomain.name}</div>
            <h2 style={{ margin: '4px 0 0', color: '#102a56', fontSize: 20 }}>
              {selectedDomain.description || selectedDomain.name}
            </h2>
          </div>

          {/* TRAINING SCORE (calculated) */}
          <section className="card" style={{ padding: 18, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  background: `conic-gradient(#08a6c7 ${trainingScore * 3.6}deg, #e4e9f1 0deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#102a56',
                  }}
                >
                  {trainingScore}%
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#102a56' }}>Training score</div>
              <div style={{ marginTop: 4, fontSize: 11.5, color: '#64748b' }}>
                {user.name} · {selectedDomain.name}
              </div>
              <div style={{ marginTop: 4, fontSize: 11, color: '#64748b' }}>
                {checklistDone} of {checklistTotal} checklist items · {writeupDone} of {writeupTotal} answered
              </div>
            </div>
          </section>

          <div className="grid grid-2">
            {/* TRAINING MATERIAL */}
            <section className="card" style={{ padding: 16 }}>
              <SectionTitle
                icon="📖"
                title="Training material"
                subtitle={materialTotal ? `${materialDone} of ${materialTotal} reviewed` : 'Training material'}
              />

              {materials.length ? (
                <div style={{ marginTop: 10 }}>
                  {materials.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        padding: '11px 0',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: 15 }}>{item.reviewed ? '☑️' : '⬜'}</span>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#334155',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.title}
                          </div>
                          <div style={{ fontSize: 10.5, color: item.reviewed ? '#16a34a' : '#94a3b8', marginTop: 3 }}>
                            {item.reviewed ? 'Reviewed' : 'Not reviewed'}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openMaterial(item)}
                        style={{
                          flex: '0 0 auto',
                          border: '1px solid #dbe3ec',
                          background: '#fff',
                          color: '#102a56',
                          borderRadius: 7,
                          padding: '6px 13px',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        👁 View
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="muted" style={{ marginTop: 12, fontSize: 12 }}>
                  No training material available.
                </div>
              )}
            </section>

            {/* CHECKLIST SUMMARY */}
            <section className="card" style={{ padding: 16 }}>
              <SectionTitle
                icon="☑️"
                title="Training checklist"
                subtitle={checklistTotal ? `${checklistDone} of ${checklistTotal} completed` : 'Employee checklist progress'}
              />

             <div style={{ marginTop: 12 }}>
  <ProgressMini label="📄 Training material" done={materialDone} total={materialTotal} />
  <ProgressMini label="🧰 Tool & concept" done={checklistDone} total={checklistTotal} />
  <ProgressMini label="✍️ Write-up" done={writeupDone} total={writeupTotal} />
  <ProgressMini label="📊 PPT exercise" done={detail.pptPct ? 1 : 0} total={1} />
</div>

              <div
                style={{
                  marginTop: 14,
                  padding: '10px 12px',
                  background: '#f8fafc',
                  borderRadius: 8,
                  fontSize: 11.5,
                  color: '#64748b',
                }}
              >
                <strong style={{ color: '#102a56' }}>Overall checklist:</strong>{' '}
                {checklistDone} / {checklistTotal} completed
              </div>
            </section>
          </div>

          {/* FULL CHECKLIST → opens on its own page */}
          <section className="card" style={{ padding: 16, marginTop: 16 }}>
            <SectionTitle
              icon="✅"
              title="Full checklist"
              subtitle={`${checklistDone} of ${checklistTotal} items completed`}
            />

            <button
              type="button"
              onClick={() => nav(`/employee/${id}/domain/${selectedDomainId}/checklist`)}
              disabled={checklistTotal === 0}
              style={{
                marginTop: 12,
                width: '100%',
                height: 40,
                border: '1px solid #08a6c7',
                background: checklistTotal === 0 ? '#f1f5f9' : '#eefbfe',
                color: '#0284a8',
                borderRadius: 8,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: checklistTotal === 0 ? 'not-allowed' : 'pointer',
                opacity: checklistTotal === 0 ? 0.6 : 1,
              }}
            >
              {checklistTotal === 0 ? 'No checklist items' : 'View full checklist →'}
            </button>
          </section>

          {/* WRITE-UP QUESTIONS (all questions + employee's answers) */}
          <section className="card" style={{ padding: 16, marginTop: 16 }}>
            <SectionTitle
              icon="📝"
              title="Write-up questions"
              subtitle={writeupTotal ? `${writeupDone} of ${writeupTotal} answered` : 'Employee answers'}
            />

            {writeupGroups.length === 0 ? (
              <div className="muted" style={{ marginTop: 12, fontSize: 12 }}>No write-up questions available.</div>
            ) : (
              writeupGroups.map((w) => (
                <div key={w.id} style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>{w.title}</div>

                  {(w.questions || []).map((q, index) => (
                    <div key={q.id} style={{ padding: '13px 0', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#102a56', lineHeight: 1.5 }}>
                        Q{index + 1}. {q.text}
                      </div>

                      <div
                        style={{
                          marginTop: 8,
                          padding: '10px 12px',
                          background: q.answered ? '#f8fafc' : '#f1f5f9',
                          borderRadius: 8,
                          border: '1px solid #e2e8f0',
                          fontSize: 11.5,
                          lineHeight: 1.6,
                          color: q.answered ? '#334155' : '#94a3b8',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {q.answered ? q.answer : 'No answer submitted'}
                      </div>

                      <div
                        style={{
                          marginTop: 5,
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: q.answered ? '#16a34a' : '#94a3b8',
                        }}
                      >
                        {q.answered ? '✓ Answered' : '○ Not answered'}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </section>

          {/* PPT EXERCISE UPLOADS */}
          <section className="card" style={{ padding: 16, marginTop: 16 }}>
            <SectionTitle
              icon="📊"
              title="PPT exercise uploads"
              subtitle={`${domainPpts.length} submitted for this domain`}
            />

            <div style={{ marginTop: 10 }}>
              {pptLoading ? (
                <div className="muted" style={{ padding: 10, fontSize: 12 }}>Loading PPT submissions...</div>
              ) : domainPpts.length === 0 ? (
                <div className="muted" style={{ padding: 10, fontSize: 12 }}>No PPT submitted for this domain.</div>
              ) : (
                domainPpts.map((submission) => (
                  <div key={submission._id} style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#102a56' }}>
                          {submission.exerciseName || submission.exercise || 'PPT Exercise'}
                        </div>

                        <div style={{ marginTop: 4, fontSize: 10.5, color: '#64748b' }}>
                          Submitted by: {submission.uploadedBy?.name || user.name}
                        </div>

                        {submission.createdAt && (
                          <div style={{ marginTop: 3, fontSize: 10.5, color: '#94a3b8' }}>
                            {new Date(submission.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        )}

                        <div
                          style={{
                            marginTop: 8,
                            padding: '8px 10px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: 7,
                            fontSize: 10.5,
                            color: '#475569',
                            wordBreak: 'break-all',
                          }}
                        >
                          <strong style={{ color: '#102a56' }}>Google Drive:</strong>{' '}
                          {submission.googleDriveLink || 'No link available'}
                        </div>
                      </div>

                      <button
                        className="training-small-button"
                        disabled={!submission.googleDriveLink}
                        onClick={() => {
                          if (submission.googleDriveLink) {
                            window.open(submission.googleDriveLink, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        🔗 View PPT
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}

      {/* ASSIGN DOMAIN MODAL */}
      {showDomainModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div className="card" style={{ width: '100%', maxWidth: 500, maxHeight: '80vh', overflowY: 'auto', padding: 24 }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0 }}>Assign Domains</h2>
                <p className="muted">Select domains for {user.name}</p>
              </div>

              <button className="btn link" onClick={() => setShowDomainModal(false)}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {allDomains.map((domain) => {
                const domainId = String(domain._id || domain.id);
                const checked = selectedDomains.includes(domainId);

                return (
                  <label
                    key={domainId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: 14,
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <input type="checkbox" checked={checked} onChange={() => toggleDomain(domainId)} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{domain.name}</div>
                      {domain.description && (
                        <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>{domain.description}</div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
              <button className="btn" onClick={() => setShowDomainModal(false)}>Cancel</button>
              <button className="btn primary" onClick={saveDomains} disabled={savingDomains}>
                {savingDomains ? 'Saving...' : 'Save Domains'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MATERIAL PREVIEW MODAL */}
      {previewDoc && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              height: 58,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 18px',
              borderBottom: '1px solid #e2e8f0',
              flexShrink: 0,
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {previewDoc.title}
            </div>
            <button
              onClick={() => setPreviewDoc(null)}
              style={{ border: 'none', background: '#f1f5f9', color: '#334155', width: 34, height: 34, borderRadius: 7, cursor: 'pointer', fontSize: 18, fontWeight: 700 }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, background: '#e5e7eb', overflow: 'hidden' }}>
            {previewDoc.cloudinaryUrl || previewDoc.previewUrl ? (
              <iframe
                src={`${previewDoc.cloudinaryUrl || previewDoc.previewUrl}#toolbar=0`}
                title={previewDoc.title}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block', background: '#fff' }}
              />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                Preview not available.
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .training-small-button {
          border: 1px solid #08a9cc; background: #fff; color: #0284a8; border-radius: 6px;
          padding: 6px 12px; font-size: 11px; font-weight: 700; cursor: pointer;
        }
        .training-small-button:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="section-title">
      <span className="section-icon">{icon}</span>
      <div>
        <div className="section-heading">{title}</div>
        <div className="section-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}

function ProgressMini({ label, done, total }) {
  const d = Number(done || 0);
  const t = Number(total || 0);
  const percent = t ? Math.min(100, Math.max(0, (d / t) * 100)) : 0;

  return (
    <div style={{ background: '#f8fafc', borderRadius: 9, padding: 10, marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#52658a' }}>
        <span>{label}</span>
        <span>{d} / {t}</span>
      </div>
      <div style={{ marginTop: 7, height: 5, background: '#dfe6ef', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: '#08a6c7' }} />
      </div>
    </div>
  );
}