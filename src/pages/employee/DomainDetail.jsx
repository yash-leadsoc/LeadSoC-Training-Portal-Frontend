// // import { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { api, uid } from '../../api/client';
// // import { Button, Badge, LoadingPage, Empty } from '../../components/ui';
// // import { useToast } from '../../components/Toast';

// // export default function DomainDetail() {
// //   const { id } = useParams();
// //   const nav = useNavigate();
// //   const [domain, setDomain] = useState(null);
// //   const [docs, setDocs] = useState([]);
// //   const [byDoc, setByDoc] = useState({}); // docId -> { checklists, writeups }
// //   const [loading, setLoading] = useState(true);
// //   const { toast, toastError } = useToast();

// //   const load = async () => {
// //     setLoading(true);
// //     try {
// //       const dRes = await api.listDomains();
// //       const dom = dRes.domains.find((x) => uid(x) === id);
// //       setDomain(dom);
// //       const docsRes = await api.listDocuments(id);
// //       const map = {};
// //       for (const doc of docsRes.documents) {
// //         const [c, w] = await Promise.all([
// //           api.checklistsForDocument(uid(doc)),
// //           api.writeupsForDocument(uid(doc)),
// //         ]);
// //         map[uid(doc)] = { checklists: c.checklists, writeups: w.writeups };
// //       }
// //       setDocs(docsRes.documents);
// //       setByDoc(map);
// //     } catch (e) {
// //       toastError(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   useEffect(() => {
// //     load(); // eslint-disable-next-line
// //   }, [id]);

// //   if (loading) return <LoadingPage />;

// //   const download = async (doc) => {
// //     try {
// //       toast(`Downloading ${doc.originalName}…`);
// //       await api.downloadDocument({ id: uid(doc), originalName: doc.originalName });
// //     } catch (e) {
// //       toastError(e);
// //     }
// //   };

// //   return (
// //     <>
// //       <button className="btn link" onClick={() => nav('/')} style={{ marginBottom: 12 }}>← All domains</button>
// //       <div className="page-head">
// //         <h1>{domain ? `${domain.icon} ${domain.name}` : 'Domain'}</h1>
// //         <p>{domain?.description}</p>
// //       </div>

// //       {docs.length === 0 ? (
// //         <Empty>No materials in this domain yet.</Empty>
// //       ) : (
// //         <div className="stack" style={{ gap: 14 }}>
// //           {docs.map((doc) => {
// //             const bundle = byDoc[uid(doc)] || { checklists: [], writeups: [] };
// //             return (
// //               <div key={uid(doc)} className="card pad-lg">
// //                 <div className="row gap-12" style={{ alignItems: 'flex-start' }}>
// //                   <div style={{ fontSize: 26 }}>📄</div>
// //                   <div style={{ flex: 1 }}>
// //                     <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{doc.title}</div>
// //                     <div className="muted" style={{ fontSize: 12.5 }}>{doc.originalName}</div>
// //                     {doc.description && <p className="muted" style={{ fontSize: 13, margin: '6px 0 0' }}>{doc.description}</p>}
// //                   </div>
// //                   <Button variant="ghost" size="sm" onClick={() => download(doc)}>⬇ Download</Button>
// //                 </div>

// //                 {bundle.checklists.length > 0 && (
// //                   <div style={{ marginTop: 14 }}>
// //                     <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan)', marginBottom: 6 }}>CHECKLISTS</div>
// //                     {bundle.checklists.map((c) => (
// //                       <div className="list-row" key={uid(c)} style={{ cursor: 'pointer' }} onClick={() => nav(`/checklist/${uid(c)}`)}>
// //                         <div style={{ flex: 1 }}>
// //                           <div className="li-title">✅ {c.title}</div>
// //                           <div className="li-sub">{c.items.length} items</div>
// //                         </div>
// //                         <Badge kind="info">Open →</Badge>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {bundle.writeups.length > 0 && (
// //                   <div style={{ marginTop: 12 }}>
// //                     <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan)', marginBottom: 6 }}>WRITE-UPS</div>
// //                     {bundle.writeups.map((w) => (
// //                       <div className="list-row" key={uid(w)} style={{ cursor: 'pointer' }} onClick={() => nav(`/writeup/${uid(w)}`)}>
// //                         <div style={{ flex: 1 }}>
// //                           <div className="li-title">✍️ {w.title}</div>
// //                           <div className="li-sub">{w.questions.length} questions</div>
// //                         </div>
// //                         <Badge kind="info">Open →</Badge>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {bundle.checklists.length === 0 && bundle.writeups.length === 0 && (
// //                   <div className="muted" style={{ fontSize: 12.5, marginTop: 12 }}>
// //                     No checklist or write-up attached yet.
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// /////////------------------------------------////////////////////

// // import { useEffect, useMemo, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { api, uid } from '../../api/client';
// // import { Button, LoadingPage, Empty } from '../../components/ui';
// // import { useToast } from '../../components/Toast';

// // export default function DomainDetail() {
// //   const { id } = useParams();
// //   const nav = useNavigate();

// //   const [domain, setDomain] = useState(null);
// //   const [docs, setDocs] = useState([]);
// //   const [byDoc, setByDoc] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [previewDoc, setPreviewDoc] = useState(null);
// //   const { toast, toastError } = useToast();

// //   const [pptLinks, setPptLinks] = useState({});
// //   const [pptSubmitting, setPptSubmitting] = useState({});
// //   const load = async () => {
// //     setLoading(true);

// //     try {
// //       const dRes = await api.listDomains();

// //       const dom = dRes.domains.find(
// //         (x) => String(uid(x)) === String(id)
// //       );

// //       setDomain(dom);

// //       const docsRes = await api.listDocuments(id);
// //       const documents = docsRes.documents || [];

// //       const map = {};

// //       await Promise.all(
// //         documents.map(async (doc) => {
// //           const docId = uid(doc);

// //           const [c, w] = await Promise.all([
// //             api.checklistsForDocument(docId),
// //             api.writeupsForDocument(docId),
// //           ]);

// //           map[docId] = {
// //             checklists: c.checklists || [],
// //             writeups: w.writeups || [],
// //           };
// //         })
// //       );

// //       setDocs(documents);
// //       setByDoc(map);
// //     } catch (e) {
// //       console.error(e);
// //       toastError(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     load();
// //     // eslint-disable-next-line
// //   }, [id]);


// //   const handlePptSubmit = async (exerciseId) => {
// //   const link = (pptLinks[exerciseId] || '').trim();

// //   if (!link) {
// //     alert('Please enter your Google Drive link.');
// //     return;
// //   }

// //   if (
// //     !link.includes('drive.google.com') &&
// //     !link.includes('docs.google.com')
// //   ) {
// //     alert('Please enter a valid Google Drive link.');
// //     return;
// //   }

// //   // Make sure domain ID exists
// //   const domainId = domain?._id || domain?.id;

// //   if (!domainId) {
// //     alert('Domain ID is missing.');
// //     return;
// //   }

// //   try {
// //     setPptSubmitting((prev) => ({
// //       ...prev,
// //       [exerciseId]: true,
// //     }));

// //     await api.submitPptSubmission(
// //       domainId,
// //       'PPT Exercise',
// //       link
// //     );

// //     alert('PPT submitted successfully.');

// //   } catch (error) {
// //     console.error('[PPT submit]', error);

// //     alert(
// //       error?.response?.data?.message ||
// //       error?.message ||
// //       'Failed to submit PPT.'
// //     );
// //   } finally {
// //     setPptSubmitting((prev) => ({
// //       ...prev,
// //       [exerciseId]: false,
// //     }));
// //   }
// // };


// //   const download = async (doc) => {
// //     try {
// //       toast(`Downloading ${doc.originalName}…`);

// //       await api.downloadDocument({
// //         id: uid(doc),
// //         originalName: doc.originalName,
// //       });
// //     } catch (e) {
// //       toastError(e);
// //     }
// //   };

// //   /*
// //    * Collect all checklists/writeups for this domain
// //    */
// //   const trainingData = useMemo(() => {
// //     const checklists = [];
// //     const writeups = [];

// //     Object.values(byDoc).forEach((bundle) => {
// //       checklists.push(...(bundle.checklists || []));
// //       writeups.push(...(bundle.writeups || []));
// //     });

// //     return {
// //       checklists,
// //       writeups,
// //     };
// //   }, [byDoc]);

// //   /*
// //    * Calculate checklist totals.
// //    *
// //    * This supports common item structures:
// //    * completed / checked / done / isCompleted
// //    *
// //    * If your backend later returns user-specific progress,
// //    * this function can easily be connected to it.
// //    */
// //   const checklistStats = useMemo(() => {
// //     let total = 0;
// //     let completed = 0;

// //     let toolTotal = 0;
// //     let toolCompleted = 0;

// //     let conceptTotal = 0;
// //     let conceptCompleted = 0;

// //     trainingData.checklists.forEach((checklist) => {
// //       const items = checklist.items || [];

// //       items.forEach((item) => {
// //         total++;

// //         const done =
// //           item.completed === true ||
// //           item.checked === true ||
// //           item.done === true ||
// //           item.isCompleted === true;

// //         if (done) {
// //           completed++;
// //         }

// //         const title = String(
// //           item.title ||
// //           item.name ||
// //           item.text ||
// //           ''
// //         ).toLowerCase();

// //         const checklistTitle = String(
// //           checklist.title || ''
// //         ).toLowerCase();

// //         const isConcept =
// //           checklistTitle.includes('concept') ||
// //           title.includes('concept');

// //         if (isConcept) {
// //           conceptTotal++;

// //           if (done) {
// //             conceptCompleted++;
// //           }
// //         } else {
// //           toolTotal++;

// //           if (done) {
// //             toolCompleted++;
// //           }
// //         }
// //       });
// //     });

// //     return {
// //       total,
// //       completed,
// //       toolTotal,
// //       toolCompleted,
// //       conceptTotal,
// //       conceptCompleted,
// //     };
// //   }, [trainingData.checklists]);

// //   /*
// //    * Write-up question count
// //    */
// //   const writeupStats = useMemo(() => {
// //     let total = 0;
// //     let answered = 0;

// //     trainingData.writeups.forEach((writeup) => {
// //       const questions = writeup.questions || [];

// //       questions.forEach((question) => {
// //         total++;

// //         const answer =
// //           question.answer ??
// //           question.response ??
// //           question.textAnswer ??
// //           '';

// //         if (
// //           typeof answer === 'string'
// //             ? answer.trim().length > 0
// //             : Boolean(answer)
// //         ) {
// //           answered++;
// //         }
// //       });
// //     });

// //     return {
// //       total,
// //       answered,
// //     };
// //   }, [trainingData.writeups]);

// //   const materialStats = useMemo(() => {
// //     const total = docs.length;

// //     let reviewed = 0;

// //     docs.forEach((doc) => {
// //       if (
// //         doc.reviewed === true ||
// //         doc.isReviewed === true ||
// //         doc.status === 'reviewed'
// //       ) {
// //         reviewed++;
// //       }
// //     });

// //     return {
// //       total,
// //       reviewed,
// //     };
// //   }, [docs]);

// //   /*
// //    * Overall training score
// //    */
// //   const trainingScore = useMemo(() => {
// //     const checklistPercent =
// //       checklistStats.total > 0
// //         ? (checklistStats.completed / checklistStats.total) * 100
// //         : 0;

// //     const writeupPercent =
// //       writeupStats.total > 0
// //         ? (writeupStats.answered / writeupStats.total) * 100
// //         : 0;

// //     const materialPercent =
// //       materialStats.total > 0
// //         ? (materialStats.reviewed / materialStats.total) * 100
// //         : 0;

// //     const sections = [];

// //     if (checklistStats.total > 0) {
// //       sections.push(checklistPercent);
// //     }

// //     if (writeupStats.total > 0) {
// //       sections.push(writeupPercent);
// //     }

// //     if (materialStats.total > 0) {
// //       sections.push(materialPercent);
// //     }

// //     if (!sections.length) return 0;

// //     return Math.round(
// //       sections.reduce((a, b) => a + b, 0) / sections.length
// //     );
// //   }, [
// //     checklistStats,
// //     writeupStats,
// //     materialStats,
// //   ]);

// //   const progressBar = (value) => ({
// //     width: `${Math.max(0, Math.min(100, value))}%`,
// //   });

// //   if (loading) {
// //     return <LoadingPage />;
// //   }

// //   if (!domain) {
// //     return <Empty>Domain not found.</Empty>;
// //   }

// //   const checklistPercent =
// //     checklistStats.total > 0
// //       ? Math.round(
// //         (checklistStats.completed / checklistStats.total) * 100
// //       )
// //       : 0;

// //   const toolPercent =
// //     checklistStats.toolTotal > 0
// //       ? Math.round(
// //         (checklistStats.toolCompleted /
// //           checklistStats.toolTotal) *
// //         100
// //       )
// //       : 0;

// //   const conceptPercent =
// //     checklistStats.conceptTotal > 0
// //       ? Math.round(
// //         (checklistStats.conceptCompleted /
// //           checklistStats.conceptTotal) *
// //         100
// //       )
// //       : 0;

// //   const writeupPercent =
// //     writeupStats.total > 0
// //       ? Math.round(
// //         (writeupStats.answered /
// //           writeupStats.total) *
// //         100
// //       )
// //       : 0;

// //   const materialPercent =
// //     materialStats.total > 0
// //       ? Math.round(
// //         (materialStats.reviewed /
// //           materialStats.total) *
// //         100
// //       )
// //       : 0;




// //   return (
// //     <div className="domain-training-page">

// //       {/* =========================
// //           HEADER
// //       ========================== */}
// //       <div
// //         style={{
// //           marginBottom: 18,
// //         }}
// //       >
// //         <button
// //           className="btn link"
// //           onClick={() => nav('/')}
// //           style={{
// //             marginBottom: 10,
// //             paddingLeft: 0,
// //           }}
// //         >
// //           ← All domains
// //         </button>

// //         <div
// //           style={{
// //             fontSize: 12,
// //             color: '#64748b',
// //             marginBottom: 5,
// //           }}
// //         >
// //           Domains › {domain.name}
// //         </div>

// //         <h1
// //           style={{
// //             margin: 0,
// //             color: 'var(--navy)',
// //             fontSize: 22,
// //             fontWeight: 750,
// //           }}
// //         >
// //           {domain.icon} {domain.name}
// //         </h1>

// //         <p
// //           style={{
// //             margin: '5px 0 0',
// //             color: '#64748b',
// //             fontSize: 13,
// //           }}
// //         >
// //           {domain.description}
// //         </p>
// //       </div>

// //       {/* =========================
// //           TRAINING SCORE
// //       ========================== */}
// //       <section
// //         className="card"
// //         style={{
// //           padding: '18px 24px',
// //           marginBottom: 14,
// //         }}
// //       >
// //         <div
// //           style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             flexDirection: 'column',
// //             minHeight: 220,
// //           }}
// //         >
// //           {/* Circle */}
// //           <div
// //             style={{
// //               width: 86,
// //               height: 86,
// //               borderRadius: '50%',
// //               background: `conic-gradient(
// //                 #08a9cc ${trainingScore * 3.6}deg,
// //                 #e4e9f0 ${trainingScore * 3.6}deg
// //               )`,
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               marginBottom: 12,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 width: 68,
// //                 height: 68,
// //                 borderRadius: '50%',
// //                 background: '#fff',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 fontWeight: 800,
// //                 fontSize: 18,
// //                 color: 'var(--navy)',
// //               }}
// //             >
// //               {trainingScore}%
// //             </div>
// //           </div>

// //           <div
// //             style={{
// //               fontWeight: 750,
// //               color: 'var(--navy)',
// //               fontSize: 14,
// //             }}
// //           >
// //             Training score
// //           </div>

// //           <div
// //             className="muted"
// //             style={{
// //               fontSize: 11.5,
// //               marginTop: 4,
// //             }}
// //           >
// //             {checklistStats.completed} of {checklistStats.total} checklist
// //             items completed
// //           </div>

// //           <div
// //             style={{
// //               display: 'flex',
// //               gap: 16,
// //               marginTop: 10,
// //               fontSize: 11,
// //             }}
// //           >
// //             <span>
// //               Tool understanding:{' '}
// //               <strong>
// //                 {checklistStats.toolCompleted} /{' '}
// //                 {checklistStats.toolTotal}
// //               </strong>
// //             </span>

// //             <span>
// //               Concepts:{' '}
// //               <strong>
// //                 {checklistStats.conceptCompleted} /{' '}
// //                 {checklistStats.conceptTotal}
// //               </strong>
// //             </span>
// //           </div>

// //           <span
// //             style={{
// //               marginTop: 9,
// //               background: '#f1f5f9',
// //               color: '#64748b',
// //               borderRadius: 5,
// //               padding: '4px 8px',
// //               fontSize: 10,
// //             }}
// //           >
// //             {trainingScore >= 100
// //               ? 'Completed'
// //               : trainingScore > 0
// //                 ? 'In progress'
// //                 : 'Not started'}
// //           </span>
// //         </div>
// //       </section>

// //       {/* =========================
// //           MAIN GRID
// //       ========================== */}
// //       <div
// //         className="domain-training-grid"
// //         style={{
// //           display: 'grid',
// //           gridTemplateColumns: '1fr 1fr',
// //           gap: 14,
// //         }}
// //       >

// //         {/* =========================
// //             TRAINING MATERIAL
// //         ========================== */}
// //         <section
// //           className="card"
// //           style={{
// //             padding: 18,
// //           }}
// //         >
// //           <div className="section-title">
// //             <span className="section-icon">📖</span>
// //             <div>
// //               <div className="section-heading">
// //                 Training material
// //               </div>

// //               <div className="section-subtitle">
// //                 Mark each as reviewed
// //               </div>
// //             </div>
// //           </div>

// //           <div
// //             style={{
// //               borderTop: '1px solid #e2e8f0',
// //               marginTop: 10,
// //             }}
// //           />

// //           {docs.length === 0 ? (
// //             <div
// //               className="muted"
// //               style={{
// //                 padding: '20px 0',
// //                 fontSize: 12,
// //               }}
// //             >
// //               No training material available.
// //             </div>
// //           ) : (
// //             docs.map((doc) => {
// //               const reviewed =
// //                 doc.reviewed === true ||
// //                 doc.isReviewed === true ||
// //                 doc.status === 'reviewed';

// //               return (
// //                 <div
// //                   key={uid(doc)}
// //                   style={{
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     gap: 9,
// //                     padding: '10px 0',
// //                     borderBottom: '1px solid #e2e8f0',
// //                     fontSize: 12,
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       width: 14,
// //                       height: 14,
// //                       borderRadius: 3,
// //                       border: reviewed
// //                         ? '1px solid #08a9cc'
// //                         : '1px solid #94a3b8',
// //                       background: reviewed
// //                         ? '#08a9cc'
// //                         : '#fff',
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       justifyContent: 'center',
// //                       color: '#fff',
// //                       fontSize: 9,
// //                       flexShrink: 0,
// //                     }}
// //                   >
// //                     {reviewed ? '✓' : ''}
// //                   </div>

// //                   {/* <div
// //                     style={{
// //                       flex: 1,
// //                       cursor: 'pointer',
// //                       color: '#1e293b',
// //                     }}
// //                     onClick={() => {
// //                       if (doc.cloudinaryUrl) {
// //                         window.open(
// //                           doc.cloudinaryUrl,
// //                           '_blank',
// //                           'noopener,noreferrer'
// //                         );
// //                       }
// //                     }}
// //                   >
// //                     {doc.title}
// //                   </div> */}

// //                   <div
// //                     style={{
// //                       flex: 1,
// //                       color: '#1e293b',
// //                       minWidth: 0,
// //                     }}
// //                   >
// //                     {doc.title}
// //                   </div>

// //                   <button
// //                     className="training-small-button"
// //                     onClick={() => setPreviewDoc(doc)}
// //                   >
// //                     View
// //                   </button>
// //                 </div>
// //               );
// //             })
// //           )}

// //           <div
// //             className="muted"
// //             style={{
// //               fontSize: 11,
// //               marginTop: 9,
// //             }}
// //           >
// //             {materialStats.reviewed} of {materialStats.total} reviewed
// //           </div>
// //         </section>

// //         {/* =========================
// //             TOOL & CONCEPT CHECKLIST
// //         ========================== */}
// //         <section
// //           className="card"
// //           style={{
// //             padding: 18,
// //           }}
// //         >
// //           <div className="section-title">
// //             <span className="section-icon">☑️</span>

// //             <div>
// //               <div className="section-heading">
// //                 Tool & concept checklist
// //               </div>

// //               <div className="section-subtitle">
// //                 {checklistStats.total} checklist items total
// //               </div>
// //             </div>
// //           </div>

// //           {/* Tool */}
// //           <div
// //             style={{
// //               background: '#f8fafc',
// //               borderRadius: 8,
// //               padding: 11,
// //               marginTop: 13,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 display: 'flex',
// //                 justifyContent: 'space-between',
// //                 fontSize: 11,
// //                 marginBottom: 7,
// //               }}
// //             >
// //               <span>Tool understanding</span>

// //               <span>
// //                 {checklistStats.toolCompleted} /{' '}
// //                 {checklistStats.toolTotal}
// //               </span>
// //             </div>

// //             <div className="training-progress-track">
// //               <div
// //                 className="training-progress-fill"
// //                 style={progressBar(toolPercent)}
// //               />
// //             </div>
// //           </div>

// //           {/* Concepts */}
// //           <div
// //             style={{
// //               background: '#f8fafc',
// //               borderRadius: 8,
// //               padding: 11,
// //               marginTop: 10,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 display: 'flex',
// //                 justifyContent: 'space-between',
// //                 fontSize: 11,
// //                 marginBottom: 7,
// //               }}
// //             >
// //               <span>Concepts checklist</span>

// //               <span>
// //                 {checklistStats.conceptCompleted} /{' '}
// //                 {checklistStats.conceptTotal}
// //               </span>
// //             </div>

// //             <div className="training-progress-track">
// //               <div
// //                 className="training-progress-fill"
// //                 style={progressBar(conceptPercent)}
// //               />
// //             </div>
// //           </div>

// //           {/* Open checklist */}
// //           <button
// //             className="training-outline-button"
// //             onClick={() => {
// //               if (trainingData.checklists.length > 0) {
// //                 nav(
// //                   `/checklist/${uid(
// //                     trainingData.checklists[0]
// //                   )}`
// //                 );
// //               }
// //             }}
// //             disabled={trainingData.checklists.length === 0}
// //           >
// //             Open checklist →
// //           </button>
// //         </section>

// //         {/* =========================
// //             WRITE-UP QUESTIONS
// //         ========================== */}
// //         <section
// //           className="card"
// //           style={{
// //             padding: 18,
// //           }}
// //         >
// //           <div className="section-title">
// //             <span className="section-icon">✍️</span>

// //             <div>
// //               <div className="section-heading">
// //                 Write-up questions
// //               </div>

// //               <div className="section-subtitle">
// //                 {writeupStats.total} questions across both sections
// //               </div>
// //             </div>
// //           </div>

// //           <div
// //             style={{
// //               marginTop: 13,
// //               fontSize: 20,
// //               color: 'var(--navy)',
// //               fontWeight: 700,
// //             }}
// //           >
// //             {writeupStats.answered}
// //             <span
// //               style={{
// //                 fontSize: 12,
// //                 fontWeight: 400,
// //                 color: '#64748b',
// //                 marginLeft: 5,
// //               }}
// //             >
// //               of {writeupStats.total} answered
// //             </span>
// //           </div>

// //           <div
// //             className="training-progress-track"
// //             style={{
// //               marginTop: 10,
// //             }}
// //           >
// //             <div
// //               className="training-progress-fill"
// //               style={progressBar(writeupPercent)}
// //             />
// //           </div>

// //           <button
// //             className="training-outline-button"
// //             onClick={() => {
// //               if (trainingData.writeups.length > 0) {
// //                 nav(
// //                   `/writeup/${uid(
// //                     trainingData.writeups[0]
// //                   )}`
// //                 );
// //               }
// //             }}
// //             disabled={trainingData.writeups.length === 0}
// //           >
// //             Continue answers →
// //           </button>
// //         </section>

// //         {/* =========================
// //             EXERCISE UPLOADS
// //         ========================== */}
// //         <section
// //   className="card"
// //   style={{
// //     padding: 18,
// //   }}
// // >
// //   <div className="section-title">
// //     <span className="section-icon">📊</span>

// //     <div>
// //       <div className="section-heading">
// //         PPT Exercise
// //       </div>

// //       <div className="section-subtitle">
// //         Create a PPT about what you learned and submit your Google Drive link
// //       </div>
// //     </div>
// //   </div>

// //   <div
// //     style={{
// //       marginTop: 14,
// //     }}
// //   >
// //     {/* Instructions */}
// //     <div
// //       style={{
// //         background: '#f8fafc',
// //         border: '1px solid #e2e8f0',
// //         borderRadius: 10,
// //         padding: 14,
// //         marginBottom: 16,
// //       }}
// //     >
// //       <div
// //         style={{
// //           fontSize: 12,
// //           fontWeight: 700,
// //           color: '#334155',
// //           marginBottom: 7,
// //         }}
// //       >
// //         📌 Instructions
// //       </div>

// //       <div
// //         style={{
// //           fontSize: 12,
// //           color: '#64748b',
// //           lineHeight: 1.6,
// //         }}
// //       >
// //         Create a PPT explaining what you learned during this
// //         training. Upload the PPT to your Google Drive and paste
// //         the shareable link below so your manager can review it.
// //       </div>

// //       <div
// //         style={{
// //           marginTop: 8,
// //           fontSize: 11.5,
// //           color: '#64748b',
// //         }}
// //       >
// //         Make sure your Google Drive sharing is set to
// //         <strong> Anyone with the link → Viewer</strong>.
// //       </div>
// //     </div>

// //     {/* Google Drive Link */}
// //     <label
// //       style={{
// //         display: 'block',
// //         fontSize: 12,
// //         fontWeight: 700,
// //         color: '#334155',
// //         marginBottom: 7,
// //       }}
// //     >
// //       Google Drive PPT Link
// //     </label>

// //     <input
// //       type="url"
// //       placeholder="https://drive.google.com/..."
// //       value={pptLinks[domain?._id] || ''}
// //       onChange={(e) =>
// //         setPptLinks((prev) => ({
// //           ...prev,
// //           [domain?._id]: e.target.value,
// //         }))
// //       }
// //       style={{
// //         width: '100%',
// //         height: 42,
// //         boxSizing: 'border-box',
// //         border: '1px solid #cbd5e1',
// //         borderRadius: 8,
// //         padding: '0 12px',
// //         fontSize: 13,
// //         outline: 'none',
// //       }}
// //     />

// //     {/* Submit */}
// //     <button
// //       onClick={() => handlePptSubmit(domain?._id)}
// //       disabled={pptSubmitting[domain?._id]}
// //       style={{
// //         width: '100%',
// //         height: 42,
// //         marginTop: 10,
// //         border: 'none',
// //         borderRadius: 8,
// //         background: 'var(--navy)',
// //         color: '#fff',
// //         fontWeight: 700,
// //         fontSize: 13,
// //         cursor: pptSubmitting[domain?._id]
// //           ? 'not-allowed'
// //           : 'pointer',
// //         opacity: pptSubmitting[domain?._id] ? 0.6 : 1,
// //       }}
// //     >
// //       {pptSubmitting[domain?._id]
// //         ? 'Submitting...'
// //         : 'Submit PPT Link'}
// //     </button>
// //   </div>
// // </section>


// //       </div>

// //       {/* =========================
// //           ACTUAL CHECKLIST / WRITEUP LIST
// //           ========================= */}
// //       {(trainingData.checklists.length > 0 ||
// //         trainingData.writeups.length > 0) && (
// //           <section
// //             className="card"
// //             style={{
// //               marginTop: 14,
// //               padding: 18,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontSize: 13,
// //                 fontWeight: 750,
// //                 color: 'var(--navy)',
// //                 marginBottom: 12,
// //               }}
// //             >
// //               Training activities
// //             </div>

// //             {docs.map((doc) => {
// //               const bundle =
// //                 byDoc[uid(doc)] || {
// //                   checklists: [],
// //                   writeups: [],
// //                 };

// //               return (
// //                 <div
// //                   key={uid(doc)}
// //                   style={{
// //                     marginBottom: 14,
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       fontSize: 12,
// //                       fontWeight: 700,
// //                       color: '#475569',
// //                       marginBottom: 6,
// //                     }}
// //                   >
// //                     {doc.title}
// //                   </div>

// //                   {bundle.checklists.map((c) => (
// //                     <div
// //                       key={uid(c)}
// //                       className="list-row"
// //                       style={{
// //                         cursor: 'pointer',
// //                       }}
// //                       onClick={() =>
// //                         nav(`/checklist/${uid(c)}`)
// //                       }
// //                     >
// //                       <div style={{ flex: 1 }}>
// //                         <div className="li-title">
// //                           ✅ {c.title}
// //                         </div>

// //                         <div className="li-sub">
// //                           {(c.items || []).length} items
// //                         </div>
// //                       </div>

// //                       <span
// //                         style={{
// //                           background: '#eff6ff',
// //                           color: '#0369a1',
// //                           borderRadius: 20,
// //                           padding: '5px 10px',
// //                           fontSize: 10,
// //                           fontWeight: 700,
// //                         }}
// //                       >
// //                         Open →
// //                       </span>
// //                     </div>
// //                   ))}

// //                   {bundle.writeups.map((w) => (
// //                     <div
// //                       key={uid(w)}
// //                       className="list-row"
// //                       style={{
// //                         cursor: 'pointer',
// //                       }}
// //                       onClick={() =>
// //                         nav(`/writeup/${uid(w)}`)
// //                       }
// //                     >
// //                       <div style={{ flex: 1 }}>
// //                         <div className="li-title">
// //                           ✍️ {w.title}
// //                         </div>

// //                         <div className="li-sub">
// //                           {(w.questions || []).length} questions
// //                         </div>
// //                       </div>

// //                       <span
// //                         style={{
// //                           background: '#eff6ff',
// //                           color: '#0369a1',
// //                           borderRadius: 20,
// //                           padding: '5px 10px',
// //                           fontSize: 10,
// //                           fontWeight: 700,
// //                         }}
// //                       >
// //                         Open →
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               );
// //             })}
// //           </section>
// //         )}

// //       {/* =========================
// //           PAGE STYLES
// //       ========================== */}
// //       <style>{`
// //         .domain-training-page {
// //           width: 100%;
// //           max-width: 1100px;
// //           margin: 0;
// //         }

// //         .section-title {
// //           display: flex;
// //           align-items: flex-start;
// //           gap: 9px;
// //         }

// //         .section-icon {
// //           width: 22px;
// //           height: 22px;
// //           border-radius: 5px;
// //           background: #eef6ff;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           font-size: 12px;
// //           flex-shrink: 0;
// //         }

// //         .section-heading {
// //           font-size: 13px;
// //           font-weight: 750;
// //           color: var(--navy);
// //         }

// //         .section-subtitle {
// //           font-size: 10.5px;
// //           color: #64748b;
// //           margin-top: 3px;
// //         }

// //         .training-progress-track {
// //           width: 100%;
// //           height: 5px;
// //           border-radius: 10px;
// //           background: #e2e8f0;
// //           overflow: hidden;
// //         }

// //         .training-progress-fill {
// //           height: 100%;
// //           border-radius: 10px;
// //           background: #08a9cc;
// //           transition: width 0.3s ease;
// //         }

// //         .training-outline-button {
// //           width: 100%;
// //           height: 34px;
// //           margin-top: 18px;
// //           border: 1px solid #dbe3ec;
// //           background: #fff;
// //           color: var(--navy);
// //           border-radius: 7px;
// //           font-size: 11px;
// //           font-weight: 700;
// //           cursor: pointer;
// //         }

// //         .training-outline-button:hover:not(:disabled) {
// //           background: #f8fafc;
// //         }

// //         .training-outline-button:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }

// //         .training-small-button {
// //           border: 1px solid #08a9cc;
// //           background: #fff;
// //           color: #0284a8;
// //           border-radius: 6px;
// //           padding: 4px 8px;
// //           font-size: 10px;
// //           cursor: pointer;
// //         }

// //         @media (max-width: 800px) {
// //           .domain-training-grid {
// //             grid-template-columns: 1fr !important;
// //           }
// //         }

// //         @media (max-width: 600px) {
// //           .domain-training-page {
// //             padding: 0 4px;
// //           }

// //           .domain-training-grid {
// //             gap: 10px !important;
// //           }

// //           .card {
// //             border-radius: 12px;
// //           }
// //         }
// //       `}</style>


// //       {previewDoc && (
// //         <div
// //           style={{
// //             position: 'fixed',
// //             inset: 0,
// //             background: 'rgba(15, 23, 42, 0.65)',
// //             zIndex: 9999,
// //             display: 'flex',
// //             flexDirection: 'column',
// //           }}
// //         >
// //           {/* Preview Header */}
// //           <div
// //             style={{
// //               height: 58,
// //               background: '#fff',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'space-between',
// //               padding: '0 18px',
// //               borderBottom: '1px solid #e2e8f0',
// //               flexShrink: 0,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontWeight: 700,
// //                 color: 'var(--navy)',
// //                 fontSize: 14,
// //                 overflow: 'hidden',
// //                 textOverflow: 'ellipsis',
// //                 whiteSpace: 'nowrap',
// //               }}
// //             >
// //               {previewDoc.title}
// //             </div>

// //             <button
// //               onClick={() => setPreviewDoc(null)}
// //               style={{
// //                 border: 'none',
// //                 background: '#f1f5f9',
// //                 color: '#334155',
// //                 width: 34,
// //                 height: 34,
// //                 borderRadius: 7,
// //                 cursor: 'pointer',
// //                 fontSize: 18,
// //                 fontWeight: 700,
// //               }}
// //             >
// //               ×
// //             </button>
// //           </div>

// //           {/* PDF Preview */}
// //           <div
// //             style={{
// //               flex: 1,
// //               background: '#e5e7eb',
// //               overflow: 'hidden',
// //             }}
// //           >
// //             {previewDoc.cloudinaryUrl ? (
// //               <iframe
// //                 src={`${previewDoc.cloudinaryUrl}#toolbar=0`}
// //                 title={previewDoc.title}
// //                 style={{
// //                   width: '100%',
// //                   height: '100%',
// //                   border: 'none',
// //                   display: 'block',
// //                   background: '#fff',
// //                 }}
// //               />
// //             ) : (
// //               <div
// //                 style={{
// //                   height: '100%',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   color: '#64748b',
// //                 }}
// //               >
// //                 Preview not available.
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )};

// //     </div>


// //   );
// // }



// //------------------------------------------------------//

// // import { useEffect, useMemo, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { api } from '../../api/client';
// // import { LoadingPage, Empty } from '../../components/ui';
// // import { useToast } from '../../components/Toast';

// // export default function DomainDetail() {
// //   const { id } = useParams();
// //   const nav = useNavigate();
// //   const { toastError } = useToast();

// //   const [detail, setDetail] = useState(null); // enriched per-domain progress from /tracking/me
// //   const [loading, setLoading] = useState(true);
// //   const [previewDoc, setPreviewDoc] = useState(null);

// //   const [pptLink, setPptLink] = useState('');
// //   const [pptSubmitting, setPptSubmitting] = useState(false);

// //   const load = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await api.myProgress();
// //       const progress = res.progress || {};

// //       // progress is keyed by domain.key; each value carries domainId
// //       const match = Object.values(progress).find(
// //         (d) => String(d.domainId) === String(id) || String(d.key) === String(id)
// //       );

// //       setDetail(match || null);
// //     } catch (e) {
// //       console.error(e);
// //       toastError(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     load();
// //     // eslint-disable-next-line
// //   }, [id]);

// //   // Flatten checklists / writeups for counts + "open" navigation
// //   const checklists = detail?.checklists || [];
// //   const writeupGroups = detail?.writeups || [];
// //   const materials = detail?.materialsList || [];

// //   const allChecklistItems = useMemo(
// //     () =>
// //       checklists.flatMap((c) =>
// //         (c.items || []).map((it) => ({ ...it, checklistId: c.id, checklistTitle: c.title }))
// //       ),
// //     [checklists]
// //   );

// //   const allQuestions = useMemo(
// //     () =>
// //       writeupGroups.flatMap((w) =>
// //         (w.questions || []).map((q) => ({ ...q, writeupId: w.id, writeupTitle: w.title }))
// //       ),
// //     [writeupGroups]
// //   );

// //   if (loading) return <LoadingPage />;
// //   if (!detail) return <Empty>Domain not found.</Empty>;

// //   // ---- everything below is CALCULATED (from the DB), not static ----
// //   const trainingScore = Number(detail.score || 0);

// //   const checklistTotal = Number(detail.checklistTotal || 0);
// //   const checklistDone = Number(detail.checklistCompleted || 0);

// //   const toolDone = Number(detail.toolCompleted || 0);
// //   const toolTotal = Number(detail.toolTotal || 0);
// //   const conceptDone = Number(detail.conceptCompleted || 0);
// //   const conceptTotal = Number(detail.conceptTotal || 0);

// //   const writeupTotal = Number(detail.writeupTotal || 0);
// //   const writeupDone = Number(detail.writeupAnswered || 0);

// //   const materialTotal = Number(detail.materialsTotal || materials.length || 0);
// //   const materialDone = Number(detail.materialsReviewed || 0);

// //   const pct = (part, total) =>
// //     total ? Math.round(Math.max(0, Math.min(100, (part / total) * 100))) : 0;

// //   const toolPercent = pct(toolDone, toolTotal);
// //   const conceptPercent = pct(conceptDone, conceptTotal);
// //   const writeupPercent = pct(writeupDone, writeupTotal);

// //   const firstChecklistId = checklists.find((c) => c.id)?.id;
// //   const firstWriteupId = writeupGroups.find((w) => w.id)?.id;

// //   const openMaterial = (doc) => {
// //     if (doc.cloudinaryUrl || doc.previewUrl) setPreviewDoc(doc);
// //   };

// //   const handlePptSubmit = async () => {
// //     const link = (pptLink || '').trim();

// //     if (!link) {
// //       alert('Please enter your Google Drive link.');
// //       return;
// //     }
// //     if (!link.includes('drive.google.com') && !link.includes('docs.google.com')) {
// //       alert('Please enter a valid Google Drive link.');
// //       return;
// //     }

// //     const domainId = detail.domainId;
// //     if (!domainId) {
// //       alert('Domain ID is missing.');
// //       return;
// //     }

// //     try {
// //       setPptSubmitting(true);
// //       await api.submitPptSubmission(domainId, 'PPT Exercise', link);
// //       alert('PPT submitted successfully.');
// //     } catch (error) {
// //       console.error('[PPT submit]', error);
// //       alert(error?.message || 'Failed to submit PPT.');
// //     } finally {
// //       setPptSubmitting(false);
// //     }
// //   };

// //   const progressBar = (value) => ({ width: `${Math.max(0, Math.min(100, value))}%` });

// //   return (
// //     <div className="domain-training-page">
// //       {/* HEADER */}
// //       <div style={{ marginBottom: 18 }}>
// //         <button className="btn link" onClick={() => nav('/')} style={{ marginBottom: 10, paddingLeft: 0 }}>
// //           ← All domains
// //         </button>

// //         <div style={{ fontSize: 12, color: '#64748b', marginBottom: 5 }}>
// //           Domains › {detail.name}
// //         </div>

// //         <h1 style={{ margin: 0, color: 'var(--navy)', fontSize: 22, fontWeight: 750 }}>
// //           {detail.icon} {detail.name}
// //         </h1>

// //         <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: 13 }}>
// //           {detail.description}
// //         </p>
// //       </div>

// //       {/* TRAINING SCORE (calculated) */}
// //       <section className="card" style={{ padding: '18px 24px', marginBottom: 14 }}>
// //         <div
// //           style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             flexDirection: 'column',
// //             minHeight: 220,
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: 86,
// //               height: 86,
// //               borderRadius: '50%',
// //               background: `conic-gradient(#08a9cc ${trainingScore * 3.6}deg, #e4e9f0 ${trainingScore * 3.6}deg)`,
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               marginBottom: 12,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 width: 68,
// //                 height: 68,
// //                 borderRadius: '50%',
// //                 background: '#fff',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 fontWeight: 800,
// //                 fontSize: 18,
// //                 color: 'var(--navy)',
// //               }}
// //             >
// //               {trainingScore}%
// //             </div>
// //           </div>

// //           <div style={{ fontWeight: 750, color: 'var(--navy)', fontSize: 14 }}>Training score</div>

// //           <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
// //             {checklistDone} of {checklistTotal} checklist items completed
// //           </div>

// //           <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11 }}>
// //             <span>
// //               Tool understanding: <strong>{toolDone} / {toolTotal}</strong>
// //             </span>
// //             <span>
// //               Concepts: <strong>{conceptDone} / {conceptTotal}</strong>
// //             </span>
// //             <span>
// //               Write-ups: <strong>{writeupDone} / {writeupTotal}</strong>
// //             </span>
// //           </div>

// //           <span
// //             style={{
// //               marginTop: 9,
// //               background: '#f1f5f9',
// //               color: '#64748b',
// //               borderRadius: 5,
// //               padding: '4px 8px',
// //               fontSize: 10,
// //             }}
// //           >
// //             {trainingScore >= 100 ? 'Completed' : trainingScore > 0 ? 'In progress' : 'Not started'}
// //           </span>
// //         </div>
// //       </section>

// //       {/* GRID: materials + checklist summary */}
// //       <div
// //         className="domain-training-grid"
// //         style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
// //       >
// //         {/* TRAINING MATERIAL */}
// //         <section className="card" style={{ padding: 18 }}>
// //           <div className="section-title">
// //             <span className="section-icon">📖</span>
// //             <div>
// //               <div className="section-heading">Training material</div>
// //               <div className="section-subtitle">{materialDone} of {materialTotal} reviewed</div>
// //             </div>
// //           </div>

// //           <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 10 }} />

// //           {materials.length === 0 ? (
// //             <div className="muted" style={{ padding: '20px 0', fontSize: 12 }}>
// //               No training material available.
// //             </div>
// //           ) : (
// //             materials.map((doc) => (
// //               <div
// //                 key={doc.id}
// //                 style={{
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: 9,
// //                   padding: '10px 0',
// //                   borderBottom: '1px solid #e2e8f0',
// //                   fontSize: 12,
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: 14,
// //                     height: 14,
// //                     borderRadius: 3,
// //                     border: doc.reviewed ? '1px solid #08a9cc' : '1px solid #94a3b8',
// //                     background: doc.reviewed ? '#08a9cc' : '#fff',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     justifyContent: 'center',
// //                     color: '#fff',
// //                     fontSize: 9,
// //                     flexShrink: 0,
// //                   }}
// //                 >
// //                   {doc.reviewed ? '✓' : ''}
// //                 </div>

// //                 <div style={{ flex: 1, color: '#1e293b', minWidth: 0 }}>{doc.title}</div>

// //                 <button className="training-small-button" onClick={() => openMaterial(doc)}>
// //                   View
// //                 </button>
// //               </div>
// //             ))
// //           )}
// //         </section>

// //         {/* TOOL & CONCEPT CHECKLIST SUMMARY */}
// //         <section className="card" style={{ padding: 18 }}>
// //           <div className="section-title">
// //             <span className="section-icon">☑️</span>
// //             <div>
// //               <div className="section-heading">Tool &amp; concept checklist</div>
// //               <div className="section-subtitle">{checklistTotal} checklist items total</div>
// //             </div>
// //           </div>

// //           <div style={{ background: '#f8fafc', borderRadius: 8, padding: 11, marginTop: 13 }}>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 7 }}>
// //               <span>Tool understanding</span>
// //               <span>{toolDone} / {toolTotal}</span>
// //             </div>
// //             <div className="training-progress-track">
// //               <div className="training-progress-fill" style={progressBar(toolPercent)} />
// //             </div>
// //           </div>

// //           <div style={{ background: '#f8fafc', borderRadius: 8, padding: 11, marginTop: 10 }}>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 7 }}>
// //               <span>Concepts checklist</span>
// //               <span>{conceptDone} / {conceptTotal}</span>
// //             </div>
// //             <div className="training-progress-track">
// //               <div className="training-progress-fill" style={progressBar(conceptPercent)} />
// //             </div>
// //           </div>

// //           <button
// //             className="training-outline-button"
// //             onClick={() => firstChecklistId && nav(`/checklist/${firstChecklistId}`)}
// //             disabled={!firstChecklistId}
// //           >
// //             Open checklist →
// //           </button>
// //         </section>
// //       </div>

// //       {/* FULL CHECKLIST (all items, not static) */}
// //       {/* <section className="card" style={{ padding: 18, marginTop: 14 }}>
// //         <div className="section-title">
// //           <span className="section-icon">✅</span>
// //           <div>
// //             <div className="section-heading">Full checklist</div>
// //             <div className="section-subtitle">{checklistDone} of {checklistTotal} items completed</div>
// //           </div>
// //         </div>

// //         {allChecklistItems.length === 0 ? (
// //           <div className="muted" style={{ marginTop: 12, fontSize: 12 }}>
// //             No checklist items available.
// //           </div>
// //         ) : (
// //           checklists.map((c) => (
// //             <div key={c.id} style={{ marginTop: 14 }}>
// //               <div
// //                 style={{
// //                   display: 'flex',
// //                   justifyContent: 'space-between',
// //                   alignItems: 'center',
// //                   marginBottom: 6,
// //                 }}
// //               >
// //                 <div style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{c.title}</div>
// //                 <button className="training-small-button" onClick={() => nav(`/checklist/${c.id}`)}>
// //                   Open →
// //                 </button>
// //               </div>

// //               {(c.items || []).map((item) => (
// //                 <div
// //                   key={item.id}
// //                   style={{
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     gap: 9,
// //                     padding: '9px 0',
// //                     borderBottom: '1px solid #eef2f7',
// //                     fontSize: 12,
// //                   }}
// //                 >
// //                   <span style={{ fontSize: 14 }}>{item.understood ? '☑️' : '⬜'}</span>
// //                   <div style={{ flex: 1, minWidth: 0 }}>
// //                     <div style={{ color: '#1e293b' }}>{item.text}</div>
// //                     <div style={{ fontSize: 10, color: item.understood ? '#16a34a' : '#94a3b8', marginTop: 2 }}>
// //                       {item.category} · {item.understood ? 'Understood' : 'Pending'}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ))
// //         )}
// //       </section> */}

// //    <div
// //   style={{
// //     display: 'grid',
// //     gridTemplateColumns: '1fr 1fr',
// //     gap: 14,
// //     marginTop: 14,
// //     alignItems: 'stretch',
// //   }}
// // >
// //   {/* WRITE-UP QUESTIONS */}
// //   <section className="card" style={{ padding: 18 }}>
// //     <div className="section-title">
// //       <span className="section-icon">✍️</span>

// //       <div style={{ flex: 1 }}>
// //         <div className="section-heading">Write-up questions</div>

// //         <div className="section-subtitle">
// //           {writeupDone} of {writeupTotal} answered
// //         </div>
// //       </div>

// //       <button
// //         className="training-small-button"
// //         onClick={() => {
// //           const firstWriteup = writeupGroups?.[0];

// //           if (firstWriteup?.id) {
// //             nav(`/writeup/${firstWriteup.id}`);
// //           }
// //         }}
// //         disabled={!writeupGroups?.length}
// //       >
// //         Continue →
// //       </button>
// //     </div>

// //     <div
// //       className="training-progress-track"
// //       style={{ marginTop: 12 }}
// //     >
// //       <div
// //         className="training-progress-fill"
// //         style={progressBar(writeupPercent)}
// //       />
// //     </div>
// //   </section>

// //   {/* PPT EXERCISE */}
// //   <section className="card" style={{ padding: 18 }}>
// //     <div className="section-title">
// //       <span className="section-icon">📊</span>

// //       <div style={{ flex: 1 }}>
// //         <div className="section-heading">PPT Exercise</div>

// //         <div className="section-subtitle">
// //           Submit your Google Drive PPT link
// //         </div>
// //       </div>
// //     </div>

// //     <div style={{ marginTop: 14 }}>
// //       <label
// //         style={{
// //           display: 'block',
// //           fontSize: 12,
// //           fontWeight: 700,
// //           color: '#334155',
// //           marginBottom: 7,
// //         }}
// //       >
// //         Google Drive PPT Link
// //       </label>

// //       <input
// //         type="url"
// //         placeholder="https://drive.google.com/..."
// //         value={pptLink}
// //         onChange={(e) => setPptLink(e.target.value)}
// //         style={{
// //           width: '100%',
// //           height: 42,
// //           boxSizing: 'border-box',
// //           border: '1px solid #cbd5e1',
// //           borderRadius: 8,
// //           padding: '0 12px',
// //           fontSize: 13,
// //           outline: 'none',
// //         }}
// //       />

// //       <button
// //         onClick={handlePptSubmit}
// //         disabled={pptSubmitting}
// //         style={{
// //           width: '100%',
// //           height: 42,
// //           marginTop: 10,
// //           border: 'none',
// //           borderRadius: 8,
// //           background: 'var(--navy)',
// //           color: '#fff',
// //           fontWeight: 700,
// //           fontSize: 13,
// //           cursor: pptSubmitting ? 'not-allowed' : 'pointer',
// //           opacity: pptSubmitting ? 0.6 : 1,
// //         }}
// //       >
// //         {pptSubmitting ? 'Submitting...' : 'Submit PPT Link'}
// //       </button>

// //       <div
// //         style={{
// //           marginTop: 8,
// //           fontSize: 11.5,
// //           color: '#64748b',
// //         }}
// //       >
// //         Google Drive sharing:
// //         <strong> Anyone with the link → Viewer</strong>
// //       </div>
// //     </div>
// //   </section>
// // </div>

// //       {/* STYLES */}
// //       <style>{`
// //         .domain-training-page { width: 100%; max-width: 1100px; margin: 0; }
// //         .section-title { display: flex; align-items: flex-start; gap: 9px; }
// //         .section-icon {
// //           width: 22px; height: 22px; border-radius: 5px; background: #eef6ff;
// //           display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
// //         }
// //         .section-heading { font-size: 13px; font-weight: 750; color: var(--navy); }
// //         .section-subtitle { font-size: 10.5px; color: #64748b; margin-top: 3px; }
// //         .training-progress-track { width: 100%; height: 5px; border-radius: 10px; background: #e2e8f0; overflow: hidden; }
// //         .training-progress-fill { height: 100%; border-radius: 10px; background: #08a9cc; transition: width 0.3s ease; }
// //         .training-outline-button {
// //           width: 100%; height: 34px; margin-top: 18px; border: 1px solid #dbe3ec; background: #fff;
// //           color: var(--navy); border-radius: 7px; font-size: 11px; font-weight: 700; cursor: pointer;
// //         }
// //         .training-outline-button:hover:not(:disabled) { background: #f8fafc; }
// //         .training-outline-button:disabled { opacity: 0.5; cursor: not-allowed; }
// //         .training-small-button {
// //           border: 1px solid #08a9cc; background: #fff; color: #0284a8; border-radius: 6px;
// //           padding: 4px 8px; font-size: 10px; cursor: pointer;
// //         }
// //         @media (max-width: 800px) { .domain-training-grid { grid-template-columns: 1fr !important; } }
// //         @media (max-width: 600px) {
// //           .domain-training-page { padding: 0 4px; }
// //           .domain-training-grid { gap: 10px !important; }
// //           .card { border-radius: 12px; }
// //         }
// //       `}</style>

// //       {/* PREVIEW MODAL (kept) */}
// //       {previewDoc && (
// //         <div
// //           style={{
// //             position: 'fixed',
// //             inset: 0,
// //             background: 'rgba(15, 23, 42, 0.65)',
// //             zIndex: 9999,
// //             display: 'flex',
// //             flexDirection: 'column',
// //           }}
// //         >
// //           <div
// //             style={{
// //               height: 58,
// //               background: '#fff',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'space-between',
// //               padding: '0 18px',
// //               borderBottom: '1px solid #e2e8f0',
// //               flexShrink: 0,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontWeight: 700,
// //                 color: 'var(--navy)',
// //                 fontSize: 14,
// //                 overflow: 'hidden',
// //                 textOverflow: 'ellipsis',
// //                 whiteSpace: 'nowrap',
// //               }}
// //             >
// //               {previewDoc.title}
// //             </div>

// //             <button
// //               onClick={() => setPreviewDoc(null)}
// //               style={{
// //                 border: 'none',
// //                 background: '#f1f5f9',
// //                 color: '#334155',
// //                 width: 34,
// //                 height: 34,
// //                 borderRadius: 7,
// //                 cursor: 'pointer',
// //                 fontSize: 18,
// //                 fontWeight: 700,
// //               }}
// //             >
// //               ×
// //             </button>
// //           </div>

// //           <div style={{ flex: 1, background: '#e5e7eb', overflow: 'hidden' }}>
// //             {previewDoc.cloudinaryUrl || previewDoc.previewUrl ? (
// //               <iframe
// //                 src={`${previewDoc.cloudinaryUrl || previewDoc.previewUrl}#toolbar=0`}
// //                 title={previewDoc.title}
// //                 style={{ width: '100%', height: '100%', border: 'none', display: 'block', background: '#fff' }}
// //               />
// //             ) : (
// //               <div
// //                 style={{
// //                   height: '100%',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   color: '#64748b',
// //                 }}
// //               >
// //                 Preview not available.
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// //==  ----------------------------------------------------//v2

// import { useEffect, useMemo, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../api/client';
// import { LoadingPage, Empty } from '../../components/ui';
// import { useToast } from '../../components/Toast';

// export default function DomainDetail() {
//   const { id } = useParams();
//   const nav = useNavigate();
//   const { toastError } = useToast();

//   const [detail, setDetail] = useState(null); // enriched per-domain progress from /tracking/me
//   const [loading, setLoading] = useState(true);
//   const [blocked, setBlocked] = useState(false); // domain not assigned to this employee
//   const [previewDoc, setPreviewDoc] = useState(null);

//   const [pptLink, setPptLink] = useState('');
//   const [pptSubmitting, setPptSubmitting] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const [domRes, res] = await Promise.all([
//         api.listDomains(),
//         api.myProgress(),
//       ]);

//       // listDomains marks each domain assigned/not for the current employee
//       const domainList = domRes?.domains || domRes || [];
//       const thisDomain = domainList.find(
//         (d) => String(d._id || d.id) === String(id)
//       );

//       // Not assigned to this employee → block access to the detail page
//       if (thisDomain && thisDomain.assigned === false) {
//         setBlocked(true);
//         setDetail(null);
//         return;
//       }

//       const progress = res.progress || {};

//       // progress is keyed by domain.key; each value carries domainId
//       const match = Object.values(progress).find(
//         (d) => String(d.domainId) === String(id) || String(d.key) === String(id)
//       );

//       setBlocked(false);
//       setDetail(match || null);
//     } catch (e) {
//       console.error(e);
//       toastError(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line
//   }, [id]);

//   // Flatten checklists / writeups for counts + "open" navigation
//   const checklists = detail?.checklists || [];
//   const writeupGroups = detail?.writeups || [];
//   const materials = detail?.materialsList || [];

//   const allChecklistItems = useMemo(
//     () =>
//       checklists.flatMap((c) =>
//         (c.items || []).map((it) => ({ ...it, checklistId: c.id, checklistTitle: c.title }))
//       ),
//     [checklists]
//   );

//   const allQuestions = useMemo(
//     () =>
//       writeupGroups.flatMap((w) =>
//         (w.questions || []).map((q) => ({ ...q, writeupId: w.id, writeupTitle: w.title }))
//       ),
//     [writeupGroups]
//   );

//   // Group checklist items by their section → { label, code, total, done(ticked) }
//   const sectionSummary = useMemo(() => {
//     const map = new Map();
//     allChecklistItems.forEach((it) => {
//       const key = it.section || it.category || 'General';
//       if (!map.has(key)) {
//         map.set(key, {
//           key,
//           label:
//             it.section ||
//             (it.category ? it.category.charAt(0).toUpperCase() + it.category.slice(1) : 'General'),
//           code: it.code || '',
//           total: 0,
//           done: 0,
//         });
//       }
//       const row = map.get(key);
//       row.total += 1;
//       if (it.understood) row.done += 1;
//       if (!row.code && it.code) row.code = it.code;
//     });
//     return Array.from(map.values());
//   }, [allChecklistItems]);

//   if (loading) return <LoadingPage />;

//   if (blocked)
//     return (
//       <div style={{ maxWidth: 1100 }}>
//         <button
//           className="btn link"
//           onClick={() => nav('/')}
//           style={{ marginBottom: 12, paddingLeft: 0 }}
//         >
//           ← All domains
//         </button>
//         <Empty>🔒 This domain is not assigned to you.</Empty>
//       </div>
//     );

//   if (!detail) return <Empty>Domain not found.</Empty>;

//   // ---- everything below is CALCULATED (from the DB), not static ----
//   const trainingScore = Number(detail.score || 0);

//   const checklistTotal = Number(detail.checklistTotal || 0);
//   const checklistDone = Number(detail.checklistCompleted || 0);

//   const toolDone = Number(detail.toolCompleted || 0);
//   const toolTotal = Number(detail.toolTotal || 0);
//   const conceptDone = Number(detail.conceptCompleted || 0);
//   const conceptTotal = Number(detail.conceptTotal || 0);

//   const writeupTotal = Number(detail.writeupTotal || 0);
//   const writeupDone = Number(detail.writeupAnswered || 0);

//   const materialTotal = Number(detail.materialsTotal || materials.length || 0);
//   const materialDone = Number(detail.materialsReviewed || 0);

//   const pct = (part, total) =>
//     total ? Math.round(Math.max(0, Math.min(100, (part / total) * 100))) : 0;

//   const toolPercent = pct(toolDone, toolTotal);
//   const conceptPercent = pct(conceptDone, conceptTotal);
//   const writeupPercent = pct(writeupDone, writeupTotal);

//   const firstChecklistId = checklists.find((c) => c.id)?.id;
//   const firstWriteupId = writeupGroups.find((w) => w.id)?.id;

//   const openMaterial = (doc) => {
//     if (doc.cloudinaryUrl || doc.previewUrl) setPreviewDoc(doc);
//   };

//   const handlePptSubmit = async () => {
//     const link = (pptLink || '').trim();

//     if (!link) {
//       alert('Please enter your Google Drive link.');
//       return;
//     }
//     if (!link.includes('drive.google.com') && !link.includes('docs.google.com')) {
//       alert('Please enter a valid Google Drive link.');
//       return;
//     }

//     const domainId = detail.domainId;
//     if (!domainId) {
//       alert('Domain ID is missing.');
//       return;
//     }

//     try {
//       setPptSubmitting(true);
//       await api.submitPptSubmission(domainId, 'PPT Exercise', link);
//       alert('PPT submitted successfully.');
//     } catch (error) {
//       console.error('[PPT submit]', error);
//       alert(error?.message || 'Failed to submit PPT.');
//     } finally {
//       setPptSubmitting(false);
//     }
//   };

//   const progressBar = (value) => ({ width: `${Math.max(0, Math.min(100, value))}%` });

//   return (
//     <div className="domain-training-page">
//       {/* HEADER */}
//       <div style={{ marginBottom: 18 }}>
//         <button className="btn link" onClick={() => nav('/')} style={{ marginBottom: 10, paddingLeft: 0 }}>
//           ← All domains
//         </button>

//         <div style={{ fontSize: 12, color: '#64748b', marginBottom: 5 }}>
//           Domains › {detail.name}
//         </div>

//         <h1 style={{ margin: 0, color: 'var(--navy)', fontSize: 22, fontWeight: 750 }}>
//           {detail.icon} {detail.name}
//         </h1>

//         <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: 13 }}>
//           {detail.description}
//         </p>
//       </div>

//       {/* TRAINING SCORE (calculated) */}
//       <section className="card" style={{ padding: '18px 24px', marginBottom: 14 }}>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'column',
//             minHeight: 220,
//           }}
//         >
//           <div
//             style={{
//               width: 86,
//               height: 86,
//               borderRadius: '50%',
//               background: `conic-gradient(#08a9cc ${trainingScore * 3.6}deg, #e4e9f0 ${trainingScore * 3.6}deg)`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 12,
//             }}
//           >
//             <div
//               style={{
//                 width: 68,
//                 height: 68,
//                 borderRadius: '50%',
//                 background: '#fff',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontWeight: 800,
//                 fontSize: 18,
//                 color: 'var(--navy)',
//               }}
//             >
//               {trainingScore}%
//             </div>
//           </div>

//           <div style={{ fontWeight: 750, color: 'var(--navy)', fontSize: 14 }}>Training score</div>

//           <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
//             {checklistDone} of {checklistTotal} checklist items completed
//           </div>

//           <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11 }}>
//             <span>
//               Tool understanding: <strong>{toolDone} / {toolTotal}</strong>
//             </span>
//             <span>
//               Concepts: <strong>{conceptDone} / {conceptTotal}</strong>
//             </span>
//             <span>
//               Write-ups: <strong>{writeupDone} / {writeupTotal}</strong>
//             </span>
//           </div>

//           <span
//             style={{
//               marginTop: 9,
//               background: '#f1f5f9',
//               color: '#64748b',
//               borderRadius: 5,
//               padding: '4px 8px',
//               fontSize: 10,
//             }}
//           >
//             {trainingScore >= 100 ? 'Completed' : trainingScore > 0 ? 'In progress' : 'Not started'}
//           </span>
//         </div>
//       </section>

//       {/* GRID: materials + checklist summary */}
//       <div
//         className="domain-training-grid"
//         style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
//       >
//         {/* TRAINING MATERIAL */}
//         <section className="card" style={{ padding: 18 }}>
//           <div className="section-title">
//             <span className="section-icon">📖</span>
//             <div>
//               <div className="section-heading">Training material</div>
//               <div className="section-subtitle">{materialDone} of {materialTotal} reviewed</div>
//             </div>
//           </div>

//           <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 10 }} />

//           {materials.length === 0 ? (
//             <div className="muted" style={{ padding: '20px 0', fontSize: 12 }}>
//               No training material available.
//             </div>
//           ) : (
//             materials.map((doc) => (
//               <div
//                 key={doc.id}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 9,
//                   padding: '10px 0',
//                   borderBottom: '1px solid #e2e8f0',
//                   fontSize: 12,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 14,
//                     height: 14,
//                     borderRadius: 3,
//                     border: doc.reviewed ? '1px solid #08a9cc' : '1px solid #94a3b8',
//                     background: doc.reviewed ? '#08a9cc' : '#fff',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: '#fff',
//                     fontSize: 9,
//                     flexShrink: 0,
//                   }}
//                 >
//                   {doc.reviewed ? '✓' : ''}
//                 </div>

//                 <div style={{ flex: 1, color: '#1e293b', minWidth: 0 }}>{doc.title}</div>

//                 <button className="training-small-button" onClick={() => openMaterial(doc)}>
//                   View
//                 </button>
//               </div>
//             ))
//           )}
//         </section>

//         {/* CHECKLIST SUMMARY — by section */}
//         <section className="card" style={{ padding: 18 }}>
//           <div className="section-title">
//             <span className="section-icon">☑️</span>
//             <div>
//               <div className="section-heading">Checklist</div>
//               <div className="section-subtitle">
//                 {checklistDone} of {checklistTotal} items · {sectionSummary.length} section
//                 {sectionSummary.length === 1 ? '' : 's'}
//               </div>
//             </div>
//           </div>

//           {sectionSummary.length === 0 ? (
//             <div className="muted" style={{ marginTop: 13, fontSize: 12 }}>
//               No checklist items yet.
//             </div>
//           ) : (
//             sectionSummary.map((sec, idx) => (
//               <div
//                 key={sec.key}
//                 style={{ background: '#f8fafc', borderRadius: 8, padding: 11, marginTop: idx === 0 ? 13 : 10 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 7 }}>
//                   <span>
//                     {sec.label}
//                     {sec.code ? ` (${sec.code})` : ''}
//                   </span>
//                   <span>{sec.done} / {sec.total}</span>
//                 </div>
//                 <div className="training-progress-track">
//                   <div
//                     className="training-progress-fill"
//                     style={progressBar(sec.total ? (sec.done / sec.total) * 100 : 0)}
//                   />
//                 </div>
//               </div>
//             ))
//           )}

//           <button
//             className="training-outline-button"
//             onClick={() => firstChecklistId && nav(`/checklist/${firstChecklistId}`)}
//             disabled={!firstChecklistId}
//           >
//             Open checklist →
//           </button>
//         </section>
//       </div>

      

//     <div
//   style={{
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: 14,
//     marginTop: 14,
//     alignItems: 'stretch',
//   }}
// >
//   {/* WRITE-UP QUESTIONS */}
//   <section
//   className="card"
//   style={{
//     padding: 18,
//     position: 'relative',
//     overflow: 'hidden',
//     background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
//   }}
// >
//   {/* Decorative background */}
//   <div
//     style={{
//       position: 'absolute',
//       width: 120,
//       height: 120,
//       borderRadius: '50%',
//       background: 'rgba(37, 99, 235, 0.06)',
//       right: -45,
//       top: -45,
//     }}
//   />

//   <div
//     style={{
//       position: 'absolute',
//       width: 70,
//       height: 70,
//       borderRadius: '50%',
//       background: 'rgba(37, 99, 235, 0.04)',
//       right: 45,
//       bottom: -35,
//     }}
//   />

//   {/* Header */}
//   <div
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       gap: 12,
//       position: 'relative',
//       zIndex: 1,
//     }}
//   >
//     {/* Icon */}
//     <div
//       style={{
//         width: 44,
//         height: 44,
//         minWidth: 44,
//         borderRadius: 12,
//         background: '#eff6ff',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: 21,
//         border: '1px solid #dbeafe',
//       }}
//     >
//       ✍️
//     </div>

//     {/* Title */}
//     <div style={{ flex: 1 }}>
//       <div
//         style={{
//           fontSize: 15,
//           fontWeight: 800,
//           color: '#102a56',
//         }}
//       >
//         Write-up Questions
//       </div>

//       <div
//         style={{
//           marginTop: 3,
//           fontSize: 11.5,
//           color: '#64748b',
//         }}
//       >
//         Test your understanding of the training
//       </div>
//     </div>

//     {/* Status */}
//     <div
//       style={{
//         padding: '5px 9px',
//         borderRadius: 20,
//         background:
//           writeupPercent === 100 ? '#dcfce7' : '#eff6ff',
//         color:
//           writeupPercent === 100 ? '#15803d' : '#2563eb',
//         fontSize: 10.5,
//         fontWeight: 700,
//         whiteSpace: 'nowrap',
//       }}
//     >
//       {writeupPercent === 100 ? '✓ Completed' : 'In Progress'}
//     </div>
//   </div>

//   {/* Progress area */}
//   <div
//     style={{
//       marginTop: 18,
//       display: 'flex',
//       alignItems: 'center',
//       gap: 16,
//       position: 'relative',
//       zIndex: 1,
//     }}
//   >
//     {/* Circular progress */}
//     <div
//       style={{
//         width: 68,
//         height: 68,
//         minWidth: 68,
//         borderRadius: '50%',
//         background: `conic-gradient(
//           #2563eb ${writeupPercent}%,
//           #e5e7eb ${writeupPercent}%
//         )`,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <div
//         style={{
//           width: 54,
//           height: 54,
//           borderRadius: '50%',
//           background: '#fff',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//         }}
//       >
//         <div
//           style={{
//             fontSize: 15,
//             fontWeight: 800,
//             color: '#102a56',
//             lineHeight: 1,
//           }}
//         >
//           {writeupPercent}%
//         </div>

//         <div
//           style={{
//             fontSize: 8,
//             color: '#94a3b8',
//             marginTop: 3,
//           }}
//         >
//           Complete
//         </div>
//       </div>
//     </div>

//     {/* Progress details */}
//     <div style={{ flex: 1 }}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: 7,
//         }}
//       >
//         <span
//           style={{
//             fontSize: 12,
//             fontWeight: 700,
//             color: '#334155',
//           }}
//         >
//           Your progress
//         </span>

//         <span
//           style={{
//             fontSize: 11,
//             fontWeight: 700,
//             color: '#2563eb',
//           }}
//         >
//           {writeupDone}/{writeupTotal}
//         </span>
//       </div>

//       <div
//         className="training-progress-track"
//         style={{
//           height: 8,
//           borderRadius: 20,
//           overflow: 'hidden',
//         }}
//       >
//         <div
//           className="training-progress-fill"
//           style={{
//             ...progressBar(writeupPercent),
//             borderRadius: 20,
//             transition: 'width 0.4s ease',
//           }}
//         />
//       </div>

//       <div
//         style={{
//           marginTop: 7,
//           fontSize: 10.5,
//           color: '#94a3b8',
//         }}
//       >
//         {writeupPercent === 100
//           ? 'Great job! All questions are completed.'
//           : writeupDone === 0
//             ? 'Start answering the questions to track your progress.'
//             : `${writeupTotal - writeupDone} question${
//                 writeupTotal - writeupDone === 1 ? '' : 's'
//               } remaining`}
//       </div>
//     </div>
//   </div>

//   {/* Continue button */}
//   <button
//     onClick={() => {
//       const firstWriteup = writeupGroups?.[0];

//       if (firstWriteup?.id) {
//         nav(`/writeup/${firstWriteup.id}`);
//       }
//     }}
//     disabled={!writeupGroups?.length}
//     style={{
//       width: '100%',
//       height: 40,
//       marginTop: 16,
//       border: 'none',
//       borderRadius: 9,
//       background:
//         writeupPercent === 100
//           ? '#257beb'
//           : '#257beb',
//       color: '#fff',
//       fontSize: 12,
//       fontWeight: 700,
//       cursor: writeupGroups?.length ? 'pointer' : 'not-allowed',
//       opacity: writeupGroups?.length ? 1 : 0.5,
//       position: 'relative',
//       zIndex: 1,
//       transition: 'all 0.2s ease',
//     }}
//   >
//     {writeupPercent === 100
//       ? 'Review Write-ups →'
//       : 'Continue Write-up →'}
//   </button>
// </section>

//   {/* PPT EXERCISE */}
//   <section className="card" style={{ padding: 18 }}>
//     <div className="section-title">
//       <span className="section-icon">📊</span>

//       <div style={{ flex: 1 }}>
//         <div className="section-heading">PPT Exercise</div>

//         <div className="section-subtitle">
//           Submit your Google Drive PPT link
//         </div>
//       </div>
//     </div>

//     <div style={{ marginTop: 14 }}>
//       <label
//         style={{
//           display: 'block',
//           fontSize: 12,
//           fontWeight: 700,
//           color: '#334155',
//           marginBottom: 7,
//         }}
//       >
//         Google Drive PPT Link
//       </label>

//       <input
//         type="url"
//         placeholder="https://drive.google.com/..."
//         value={pptLink}
//         onChange={(e) => setPptLink(e.target.value)}
//         style={{
//           width: '100%',
//           height: 42,
//           boxSizing: 'border-box',
//           border: '1px solid #cbd5e1',
//           borderRadius: 8,
//           padding: '0 12px',
//           fontSize: 13,
//           outline: 'none',
//         }}
//       />

//       <button
//         onClick={handlePptSubmit}
//         disabled={pptSubmitting}
//         style={{
//           width: '100%',
//           height: 42,
//           marginTop: 10,
//           border: 'none',
//           borderRadius: 8,
//           background: '#257beb',
//           color: '#fff',
//           fontWeight: 700,
//           fontSize: 13,
//           cursor: pptSubmitting ? 'not-allowed' : 'pointer',
//           opacity: pptSubmitting ? 0.6 : 1,
//         }}
//       >
//         {pptSubmitting ? 'Submitting...' : 'Submit PPT Link'}
//       </button>

//       <div
//         style={{
//           marginTop: 8,
//           fontSize: 11.5,
//           color: '#64748b',
//         }}
//       >
//         Google Drive sharing:
//         <strong> Anyone with the link → Viewer</strong>
//       </div>
//     </div>
//   </section>
// </div>

//       {/* STYLES */}
//       <style>{`
//         .domain-training-page { width: 100%; max-width: 1100px; margin: 0; }
//         .section-title { display: flex; align-items: flex-start; gap: 9px; }
//         .section-icon {
//           width: 22px; height: 22px; border-radius: 5px; background: #eef6ff;
//           display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
//         }
//         .section-heading { font-size: 13px; font-weight: 750; color: var(--navy); }
//         .section-subtitle { font-size: 10.5px; color: #64748b; margin-top: 3px; }
//         .training-progress-track { width: 100%; height: 5px; border-radius: 10px; background: #e2e8f0; overflow: hidden; }
//         .training-progress-fill { height: 100%; border-radius: 10px; background: #08a9cc; transition: width 0.3s ease; }
//         .training-outline-button {
//           width: 100%; height: 34px; margin-top: 18px; border: 1px solid #dbe3ec; background: #fff;
//           color: var(--navy); border-radius: 7px; font-size: 11px; font-weight: 700; cursor: pointer;
//         }
//         .training-outline-button:hover:not(:disabled) { background: #f8fafc; }
//         .training-outline-button:disabled { opacity: 0.5; cursor: not-allowed; }
//         .training-small-button {
//           border: 1px solid #08a9cc; background: #fff; color: #0284a8; border-radius: 6px;
//           padding: 4px 8px; font-size: 10px; cursor: pointer;
//         }
//         @media (max-width: 800px) { .domain-training-grid { grid-template-columns: 1fr !important; } }
//         @media (max-width: 600px) {
//           .domain-training-page { padding: 0 4px; }
//           .domain-training-grid { gap: 10px !important; }
//           .card { border-radius: 12px; }
//         }
//       `}</style>

//       {/* PREVIEW MODAL (kept) */}
//       {previewDoc && (
//         <div
//           style={{
//             position: 'fixed',
//             inset: 0,
//             background: 'rgba(15, 23, 42, 0.65)',
//             zIndex: 9999,
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
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
//             <div
//               style={{
//                 fontWeight: 700,
//                 color: 'var(--navy)',
//                 fontSize: 14,
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//               }}
//             >
//               {previewDoc.title}
//             </div>

//             <button
//               onClick={() => setPreviewDoc(null)}
//               style={{
//                 border: 'none',
//                 background: '#f1f5f9',
//                 color: '#334155',
//                 width: 34,
//                 height: 34,
//                 borderRadius: 7,
//                 cursor: 'pointer',
//                 fontSize: 18,
//                 fontWeight: 700,
//               }}
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
//               <div
//                 style={{
//                   height: '100%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   color: '#64748b',
//                 }}
//               >
//                 Preview not available.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { LoadingPage, Empty } from '../../components/ui';
import { useToast } from '../../components/Toast';


export default function DomainDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { toastError } = useToast();

  const [detail, setDetail] = useState(null); // enriched per-domain progress from /tracking/me
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false); // domain not assigned to this employee
  const [previewDoc, setPreviewDoc] = useState(null);
  const [savingReview, setSavingReview] = useState({}); // materialId -> bool

  const [pptLink, setPptLink] = useState('');
  const [pptSubmitting, setPptSubmitting] = useState(false);


  const load = async () => {
    setLoading(true);
    try {
      const [domRes, res] = await Promise.all([
        api.listDomains(),
        api.myProgress(),
      ]);

      // listDomains marks each domain assigned/not for the current employee
      const domainList = domRes?.domains || domRes || [];
      const thisDomain = domainList.find(
        (d) => String(d._id || d.id) === String(id)
      );

      // Not assigned to this employee → block access to the detail page
      if (thisDomain && thisDomain.assigned === false) {
        setBlocked(true);
        setDetail(null);
        return;
      }

      const progress = res.progress || {};

      // progress is keyed by domain.key; each value carries domainId
      const match = Object.values(progress).find(
        (d) => String(d.domainId) === String(id) || String(d.key) === String(id)
      );

      setBlocked(false);
      setDetail(match || null);
    } catch (e) {
      console.error(e);
      toastError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [id]);

  // Flatten checklists / writeups for counts + "open" navigation
  const checklists = detail?.checklists || [];
  const writeupGroups = detail?.writeups || [];
  const materials = detail?.materialsList || [];

  const allChecklistItems = useMemo(
    () =>
      checklists.flatMap((c) =>
        (c.items || []).map((it) => ({ ...it, checklistId: c.id, checklistTitle: c.title }))
      ),
    [checklists]
  );

  const allQuestions = useMemo(
    () =>
      writeupGroups.flatMap((w) =>
        (w.questions || []).map((q) => ({ ...q, writeupId: w.id, writeupTitle: w.title }))
      ),
    [writeupGroups]
  );

  // Group checklist items by their section → { label, code, total, done(ticked) }
  const sectionSummary = useMemo(() => {
    const map = new Map();
    allChecklistItems.forEach((it) => {
      const key = it.section || it.category || 'General';
      if (!map.has(key)) {
        map.set(key, {
          key,
          label:
            it.section ||
            (it.category ? it.category.charAt(0).toUpperCase() + it.category.slice(1) : 'General'),
          code: it.code || '',
          total: 0,
          done: 0,
        });
      }
      const row = map.get(key);
      row.total += 1;
      if (it.understood) row.done += 1;
      if (!row.code && it.code) row.code = it.code;
    });
    return Array.from(map.values());
  }, [allChecklistItems]);

  if (loading) return <LoadingPage />;

  if (blocked)
    return (
      <div style={{ maxWidth: 1100 }}>
        <button
          className="btn link"
          onClick={() => nav('/')}
          style={{ marginBottom: 12, paddingLeft: 0 }}
        >
          ← All domains
        </button>
        <Empty>🔒 This domain is not assigned to you.</Empty>
      </div>
    );

  if (!detail) return <Empty>Domain not found.</Empty>;

  // ---- everything below is CALCULATED (from the DB), not static ----
  const trainingScore = Number(detail.score || 0);

  const checklistTotal = Number(detail.checklistTotal || 0);
  const checklistDone = Number(detail.checklistCompleted || 0);

  const toolDone = Number(detail.toolCompleted || 0);
  const toolTotal = Number(detail.toolTotal || 0);
  const conceptDone = Number(detail.conceptCompleted || 0);
  const conceptTotal = Number(detail.conceptTotal || 0);

  const writeupTotal = Number(detail.writeupTotal || 0);
  const writeupDone = Number(detail.writeupAnswered || 0);

  const materialTotal = Number(detail.materialsTotal || materials.length || 0);
  const materialDone = Number(detail.materialsReviewed || 0);

  const pct = (part, total) =>
    total ? Math.round(Math.max(0, Math.min(100, (part / total) * 100))) : 0;

  const toolPercent = pct(toolDone, toolTotal);
  const conceptPercent = pct(conceptDone, conceptTotal);
  const writeupPercent = pct(writeupDone, writeupTotal);

  const firstChecklistId = checklists.find((c) => c.id)?.id;
  const firstWriteupId = writeupGroups.find((w) => w.id)?.id;

  const openMaterial = (doc) => {
    if (doc.cloudinaryUrl || doc.previewUrl) setPreviewDoc(doc);
  };

  // Tick a material as reviewed (or un-tick) and persist it.
  const toggleReviewed = async (doc) => {
    const next = !doc.reviewed;

    const applyReviewed = (value) =>
      setDetail((d) => {
        if (!d) return d;
        const list = (d.materialsList || []).map((m) =>
          m.id === doc.id ? { ...m, reviewed: value } : m
        );
        return {
          ...d,
          materialsList: list,
          materialsReviewed: list.filter((m) => m.reviewed).length,
        };
      });

    applyReviewed(next); // optimistic
    setSavingReview((s) => ({ ...s, [doc.id]: true }));
    try {
      await api.markReviewed(doc.id, next);
    } catch (e) {
      applyReviewed(!next); // revert on failure
      toastError(e);
    } finally {
      setSavingReview((s) => ({ ...s, [doc.id]: false }));
    }
  };

  const handlePptSubmit = async () => {
    const link = (pptLink || '').trim();

    if (!link) {
      alert('Please enter your Google Drive link.');
      return;
    }
    if (!link.includes('drive.google.com') && !link.includes('docs.google.com')) {
      alert('Please enter a valid Google Drive link.');
      return;
    }

    const domainId = detail.domainId;
    if (!domainId) {
      alert('Domain ID is missing.');
      return;
    }

    try {
      setPptSubmitting(true);
      await api.submitPptSubmission(domainId, 'PPT Exercise', link);
      alert('PPT submitted successfully.');
    } catch (error) {
      console.error('[PPT submit]', error);
      alert(error?.message || 'Failed to submit PPT.');
    } finally {
      setPptSubmitting(false);
    }
  };

  const progressBar = (value) => ({ width: `${Math.max(0, Math.min(100, value))}%` });

  return (
    <div className="domain-training-page">
      {/* HEADER */}
      <div style={{ marginBottom: 18 }}>
        <button className="btn link" onClick={() => nav('/')} style={{ marginBottom: 10, paddingLeft: 0 }}>
          ← All domains
        </button>

        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 5 }}>
          Domains › {detail.name}
        </div>

        <h1 style={{ margin: 0, color: 'var(--navy)', fontSize: 22, fontWeight: 750 }}>
          {detail.icon} {detail.name}
        </h1>

        <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: 13 }}>
          {detail.description}
        </p>
      </div>

      {/* TRAINING SCORE (calculated) */}
      <section className="card" style={{ padding: '18px 24px', marginBottom: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: 220,
          }}
        >
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: '50%',
              background: `conic-gradient(#08a9cc ${trainingScore * 3.6}deg, #e4e9f0 ${trainingScore * 3.6}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
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
                fontWeight: 800,
                fontSize: 18,
                color: 'var(--navy)',
              }}
            >
              {trainingScore}%
            </div>
          </div>

          <div style={{ fontWeight: 750, color: 'var(--navy)', fontSize: 14 }}>Training score</div>

          <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
            {checklistDone} of {checklistTotal} checklist items completed
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11 }}>
            <span>
              Tool understanding: <strong>{toolDone} / {toolTotal}</strong>
            </span>
            <span>
              Concepts: <strong>{conceptDone} / {conceptTotal}</strong>
            </span>
            <span>
              Write-ups: <strong>{writeupDone} / {writeupTotal}</strong>
            </span>
          </div>

          <span
            style={{
              marginTop: 9,
              background: '#f1f5f9',
              color: '#64748b',
              borderRadius: 5,
              padding: '4px 8px',
              fontSize: 10,
            }}
          >
            {trainingScore >= 100 ? 'Completed' : trainingScore > 0 ? 'In progress' : 'Not started'}
          </span>
        </div>
      </section>

      {/* GRID: materials + checklist summary */}
      <div
        className="domain-training-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
      >
        {/* TRAINING MATERIAL */}
        <section className="card" style={{ padding: 18 }}>
          <div className="section-title">
            <span className="section-icon">📖</span>
            <div>
              <div className="section-heading">Training material</div>
              <div className="section-subtitle">{materialDone} of {materialTotal} reviewed</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 10 }} />

          {materials.length === 0 ? (
            <div className="muted" style={{ padding: '20px 0', fontSize: 12 }}>
              No training material available.
            </div>
          ) : (
            materials.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '10px 0',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: 12,
                }}
              >
                <div
                  onClick={() => !savingReview[doc.id] && toggleReviewed(doc)}
                  role="checkbox"
                  aria-checked={doc.reviewed}
                  title={doc.reviewed ? 'Reviewed — click to undo' : 'Mark as reviewed'}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    border: doc.reviewed ? '1px solid #08a9cc' : '1px solid #94a3b8',
                    background: doc.reviewed ? '#08a9cc' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 9,
                    flexShrink: 0,
                    cursor: savingReview[doc.id] ? 'wait' : 'pointer',
                    opacity: savingReview[doc.id] ? 0.6 : 1,
                  }}
                >
                  {doc.reviewed ? '✓' : ''}
                </div>

                <div style={{ flex: 1, color: '#1e293b', minWidth: 0 }}>{doc.title}</div>

                <button className="training-small-button" onClick={() => openMaterial(doc)}>
                  View
                </button>
              </div>
            ))
          )}
        </section>

        {/* CHECKLIST SUMMARY — by section */}
        <section className="card" style={{ padding: 18 }}>
          <div className="section-title">
            <span className="section-icon">☑️</span>
            <div>
              <div className="section-heading">Checklist</div>
              <div className="section-subtitle">
                {checklistDone} of {checklistTotal} items ticked · {sectionSummary.length} section
                {sectionSummary.length === 1 ? '' : 's'}
              </div>
            </div>
          </div>

          {sectionSummary.length === 0 ? (
            <div className="muted" style={{ marginTop: 13, fontSize: 12 }}>
              No checklist items yet.
            </div>
          ) : (
            sectionSummary.map((sec, idx) => (
              <div
                key={sec.key}
                style={{ background: '#f8fafc', borderRadius: 8, padding: 11, marginTop: idx === 0 ? 13 : 10 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 7 }}>
                  <span>
                    {sec.label}
                    {sec.code ? ` (${sec.code})` : ''}
                  </span>
                  <span>{sec.done} / {sec.total}</span>
                </div>
                <div className="training-progress-track">
                  <div
                    className="training-progress-fill"
                    style={progressBar(sec.total ? (sec.done / sec.total) * 100 : 0)}
                  />
                </div>
              </div>
            ))
          )}

          <button
            className="training-outline-button"
            onClick={() => firstChecklistId && nav(`/checklist/${firstChecklistId}`)}
            disabled={!firstChecklistId}
          >
            Open checklist →
          </button>
        </section>
      </div>

      {/* FULL CHECKLIST (all items, not static) */}
      {/* <section className="card" style={{ padding: 18, marginTop: 14 }}>
        <div className="section-title">
          <span className="section-icon">✅</span>
          <div>
            <div className="section-heading">Full checklist</div>
            <div className="section-subtitle">{checklistDone} of {checklistTotal} items completed</div>
          </div>
        </div>

        {allChecklistItems.length === 0 ? (
          <div className="muted" style={{ marginTop: 12, fontSize: 12 }}>
            No checklist items available.
          </div>
        ) : (
          checklists.map((c) => (
            <div key={c.id} style={{ marginTop: 14 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{c.title}</div>
                <button className="training-small-button" onClick={() => nav(`/checklist/${c.id}`)}>
                  Open →
                </button>
              </div>

              {(c.items || []).map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '9px 0',
                    borderBottom: '1px solid #eef2f7',
                    fontSize: 12,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.understood ? '☑️' : '⬜'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#1e293b' }}>{item.text}</div>
                    <div style={{ fontSize: 10, color: item.understood ? '#16a34a' : '#94a3b8', marginTop: 2 }}>
                      {item.category} · {item.understood ? 'Understood' : 'Pending'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </section> */}

     <div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
    marginTop: 14,
    alignItems: 'stretch',
  }}
>
  {/* WRITE-UP QUESTIONS */}
  <section
  className="card"
  style={{
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
  }}
>
  {/* Decorative background */}
  <div
    style={{
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: '50%',
      background: 'rgba(37, 99, 235, 0.06)',
      right: -45,
      top: -45,
    }}
  />

  <div
    style={{
      position: 'absolute',
      width: 70,
      height: 70,
      borderRadius: '50%',
      background: 'rgba(37, 99, 235, 0.04)',
      right: 45,
      bottom: -35,
    }}
  />

  {/* Header */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      position: 'relative',
      zIndex: 1,
    }}
  >
    {/* Icon */}
    <div
      style={{
        width: 44,
        height: 44,
        minWidth: 44,
        borderRadius: 12,
        background: '#eff6ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 21,
        border: '1px solid #dbeafe',
      }}
    >
      ✍️
    </div>

    {/* Title */}
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          color: '#102a56',
        }}
      >
        Write-up Questions
      </div>

      <div
        style={{
          marginTop: 3,
          fontSize: 11.5,
          color: '#64748b',
        }}
      >
        Test your understanding of the training
      </div>
    </div>

    {/* Status */}
    <div
      style={{
        padding: '5px 9px',
        borderRadius: 20,
        background:
          writeupPercent === 100 ? '#dcfce7' : '#eff6ff',
        color:
          writeupPercent === 100 ? '#15803d' : '#2563eb',
        fontSize: 10.5,
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      {writeupPercent === 100 ? '✓ Completed' : 'In Progress'}
    </div>
  </div>

  {/* Progress area */}
  <div
    style={{
      marginTop: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      position: 'relative',
      zIndex: 1,
    }}
  >
    {/* Circular progress */}
    <div
      style={{
        width: 68,
        height: 68,
        minWidth: 68,
        borderRadius: '50%',
        background: `conic-gradient(
          #2563eb ${writeupPercent}%,
          #e5e7eb ${writeupPercent}%
        )`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: '#102a56',
            lineHeight: 1,
          }}
        >
          {writeupPercent}%
        </div>

        <div
          style={{
            fontSize: 8,
            color: '#94a3b8',
            marginTop: 3,
          }}
        >
          Complete
        </div>
      </div>
    </div>

    {/* Progress details */}
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 7,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#334155',
          }}
        >
          Your progress
        </span>

        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#2563eb',
          }}
        >
          {writeupDone}/{writeupTotal}
        </span>
      </div>

      <div
        className="training-progress-track"
        style={{
          height: 8,
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        <div
          className="training-progress-fill"
          style={{
            ...progressBar(writeupPercent),
            borderRadius: 20,
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      <div
        style={{
          marginTop: 7,
          fontSize: 10.5,
          color: '#94a3b8',
        }}
      >
        {writeupPercent === 100
          ? 'Great job! All questions are completed.'
          : writeupDone === 0
            ? 'Start answering the questions to track your progress.'
            : `${writeupTotal - writeupDone} question${
                writeupTotal - writeupDone === 1 ? '' : 's'
              } remaining`}
      </div>
    </div>
  </div>

  {/* Continue button */}
  <button
    onClick={() => {
      const firstWriteup = writeupGroups?.[0];

      if (firstWriteup?.id) {
        nav(`/writeup/${firstWriteup.id}`);
      }
    }}
    disabled={!writeupGroups?.length}
    style={{
      width: '100%',
      height: 40,
      marginTop: 16,
      border: 'none',
      borderRadius: 9,
      background:
        writeupPercent === 100
          ? '#16a34a'
          : 'var(--navy)',
      color: '#fff',
      fontSize: 12,
      fontWeight: 700,
      cursor: writeupGroups?.length ? 'pointer' : 'not-allowed',
      opacity: writeupGroups?.length ? 1 : 0.5,
      position: 'relative',
      zIndex: 1,
      transition: 'all 0.2s ease',
    }}
  >
    {writeupPercent === 100
      ? 'Review Write-ups →'
      : 'Continue Write-up →'}
  </button>
</section>

  {/* PPT EXERCISE */}
  <section className="card" style={{ padding: 18 }}>
    <div className="section-title">
      <span className="section-icon">📊</span>

      <div style={{ flex: 1 }}>
        <div className="section-heading">PPT Exercise</div>

        <div className="section-subtitle">
          Submit your Google Drive PPT link
        </div>
      </div>
    </div>

    <div style={{ marginTop: 14 }}>
      <label
        style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 700,
          color: '#334155',
          marginBottom: 7,
        }}
      >
        Google Drive PPT Link
      </label>

      <input
        type="url"
        placeholder="https://drive.google.com/..."
        value={pptLink}
        onChange={(e) => setPptLink(e.target.value)}
        style={{
          width: '100%',
          height: 42,
          boxSizing: 'border-box',
          border: '1px solid #cbd5e1',
          borderRadius: 8,
          padding: '0 12px',
          fontSize: 13,
          outline: 'none',
        }}
      />

      <button
        onClick={handlePptSubmit}
        disabled={pptSubmitting}
        style={{
          width: '100%',
          height: 42,
          marginTop: 10,
          border: 'none',
          borderRadius: 8,
          background: 'var(--navy)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 13,
          cursor: pptSubmitting ? 'not-allowed' : 'pointer',
          opacity: pptSubmitting ? 0.6 : 1,
        }}
      >
        {pptSubmitting ? 'Submitting...' : 'Submit PPT Link'}
      </button>

      <div
        style={{
          marginTop: 8,
          fontSize: 11.5,
          color: '#64748b',
        }}
      >
        Google Drive sharing:
        <strong> Anyone with the link → Viewer</strong>
      </div>
    </div>
  </section>
</div>

      {/* STYLES */}
      <style>{`
        .domain-training-page { width: 100%; max-width: 1100px; margin: 0; }
        .section-title { display: flex; align-items: flex-start; gap: 9px; }
        .section-icon {
          width: 22px; height: 22px; border-radius: 5px; background: #eef6ff;
          display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
        }
        .section-heading { font-size: 13px; font-weight: 750; color: var(--navy); }
        .section-subtitle { font-size: 10.5px; color: #64748b; margin-top: 3px; }
        .training-progress-track { width: 100%; height: 5px; border-radius: 10px; background: #e2e8f0; overflow: hidden; }
        .training-progress-fill { height: 100%; border-radius: 10px; background: #08a9cc; transition: width 0.3s ease; }
        .training-outline-button {
          width: 100%; height: 34px; margin-top: 18px; border: 1px solid #dbe3ec; background: #fff;
          color: var(--navy); border-radius: 7px; font-size: 11px; font-weight: 700; cursor: pointer;
        }
        .training-outline-button:hover:not(:disabled) { background: #f8fafc; }
        .training-outline-button:disabled { opacity: 0.5; cursor: not-allowed; }
        .training-small-button {
          border: 1px solid #08a9cc; background: #fff; color: #0284a8; border-radius: 6px;
          padding: 4px 8px; font-size: 10px; cursor: pointer;
        }
        @media (max-width: 800px) { .domain-training-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) {
          .domain-training-page { padding: 0 4px; }
          .domain-training-grid { gap: 10px !important; }
          .card { border-radius: 12px; }
        }
      `}</style>

      {/* PREVIEW MODAL (kept) */}
      {previewDoc && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
            <div
              style={{
                fontWeight: 700,
                color: 'var(--navy)',
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {previewDoc.title}
            </div>

            <button
              onClick={() => setPreviewDoc(null)}
              style={{
                border: 'none',
                background: '#f1f5f9',
                color: '#334155',
                width: 34,
                height: 34,
                borderRadius: 7,
                cursor: 'pointer',
                fontSize: 18,
                fontWeight: 700,
              }}
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
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                }}
              >
                Preview not available.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}