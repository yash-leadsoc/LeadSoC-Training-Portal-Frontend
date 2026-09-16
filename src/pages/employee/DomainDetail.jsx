import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, uid } from '../../api/client';
import { Button, Badge, LoadingPage, Empty } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function DomainDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [domain, setDomain] = useState(null);
  const [docs, setDocs] = useState([]);
  const [byDoc, setByDoc] = useState({}); // docId -> { checklists, writeups }
  const [loading, setLoading] = useState(true);
  const { toast, toastError } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const dRes = await api.listDomains();
      const dom = dRes.domains.find((x) => uid(x) === id);
      setDomain(dom);
      const docsRes = await api.listDocuments(id);
      const map = {};
      for (const doc of docsRes.documents) {
        const [c, w] = await Promise.all([
          api.checklistsForDocument(uid(doc)),
          api.writeupsForDocument(uid(doc)),
        ]);
        map[uid(doc)] = { checklists: c.checklists, writeups: w.writeups };
      }
      setDocs(docsRes.documents);
      setByDoc(map);
    } catch (e) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load(); // eslint-disable-next-line
  }, [id]);

  if (loading) return <LoadingPage />;

  const download = async (doc) => {
    try {
      toast(`Downloading ${doc.originalName}…`);
      await api.downloadDocument({ id: uid(doc), originalName: doc.originalName });
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <>
      <button className="btn link" onClick={() => nav('/')} style={{ marginBottom: 12 }}>← All domains</button>
      <div className="page-head">
        <h1>{domain ? `${domain.icon} ${domain.name}` : 'Domain'}</h1>
        <p>{domain?.description}</p>
      </div>

      {docs.length === 0 ? (
        <Empty>No materials in this domain yet.</Empty>
      ) : (
        <div className="stack" style={{ gap: 14 }}>
          {docs.map((doc) => {
            const bundle = byDoc[uid(doc)] || { checklists: [], writeups: [] };
            return (
              <div key={uid(doc)} className="card pad-lg">
                <div className="row gap-12" style={{ alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 26 }}>📄</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{doc.title}</div>
                    <div className="muted" style={{ fontSize: 12.5 }}>{doc.originalName}</div>
                    {doc.description && <p className="muted" style={{ fontSize: 13, margin: '6px 0 0' }}>{doc.description}</p>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => download(doc)}>⬇ Download</Button>
                </div>

                {bundle.checklists.length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan)', marginBottom: 6 }}>CHECKLISTS</div>
                    {bundle.checklists.map((c) => (
                      <div className="list-row" key={uid(c)} style={{ cursor: 'pointer' }} onClick={() => nav(`/checklist/${uid(c)}`)}>
                        <div style={{ flex: 1 }}>
                          <div className="li-title">✅ {c.title}</div>
                          <div className="li-sub">{c.items.length} items</div>
                        </div>
                        <Badge kind="info">Open →</Badge>
                      </div>
                    ))}
                  </div>
                )}

                {bundle.writeups.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan)', marginBottom: 6 }}>WRITE-UPS</div>
                    {bundle.writeups.map((w) => (
                      <div className="list-row" key={uid(w)} style={{ cursor: 'pointer' }} onClick={() => nav(`/writeup/${uid(w)}`)}>
                        <div style={{ flex: 1 }}>
                          <div className="li-title">✍️ {w.title}</div>
                          <div className="li-sub">{w.questions.length} questions</div>
                        </div>
                        <Badge kind="info">Open →</Badge>
                      </div>
                    ))}
                  </div>
                )}

                {bundle.checklists.length === 0 && bundle.writeups.length === 0 && (
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 12 }}>
                    No checklist or write-up attached yet.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
