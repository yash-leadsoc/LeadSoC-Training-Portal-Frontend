import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, uid } from '../../api/client';
import { Button, Badge, Modal, LoadingPage, Empty, Spinner } from '../../components/ui';
import { useToast } from '../../components/Toast';

const fileIcon = (name = '') => {
  const e = name.split('.').pop().toLowerCase();
  if (['ppt', 'pptx'].includes(e)) return '📊';
  if (['doc', 'docx'].includes(e)) return '📄';
  if (e === 'pdf') return '📕';
  if (['xls', 'xlsx', 'csv'].includes(e)) return '📈';
  if (['png', 'jpg', 'jpeg'].includes(e)) return '🖼️';
  if (e === 'zip') return '🗜️';
  return '📁';
};

export default function MaterialsPage() {
  const [domains, setDomains] = useState([]);
  const [docs, setDocs] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const { toast, toastError } = useToast();
  const nav = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const [d, docsRes] = await Promise.all([api.listDomains(), api.listDocuments(filter || undefined)]);
      setDomains(d.domains);
      setDocs(docsRes.documents);
    } catch (e) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load(); // eslint-disable-next-line
  }, [filter]);

  const download = async (doc) => {
    try {
      await api.downloadDocument(mapDoc(doc));
    } catch (e) {
      toastError(e);
    }
  };
  const remove = async (doc) => {
    if (!confirm('Archive this material?')) return;
    try {
      await api.deleteDocument(uid(doc));
      toast('Material archived');
      load();
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <>
      <div className="page-head" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <h1>Training materials</h1>
          <p>Upload PPT / DOC / PDF against a domain, then attach checklists and write-ups.</p>
        </div>
        <Button variant="cyan" onClick={() => setShowUpload(true)}>+ Upload material</Button>
      </div>

      <div className="chips">
        <button className={`chip ${!filter ? 'active' : ''}`} onClick={() => setFilter('')}>All</button>
        {domains.map((d) => (
          <button key={uid(d)} className={`chip ${filter === uid(d) ? 'active' : ''}`} onClick={() => setFilter(uid(d))}>
            {d.icon} {d.name}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingPage />
      ) : docs.length === 0 ? (
        <Empty>No materials yet. Click “Upload material”.</Empty>
      ) : (
        <div className="grid grid-auto">
          {docs.map((doc) => (
            <div key={uid(doc)} className="card card-hover" style={{ cursor: 'pointer' }} onClick={() => nav(`/document/${uid(doc)}`)}>
              <div className="row gap-12">
                <div style={{ fontSize: 26 }}>{fileIcon(doc.originalName)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{doc.title}</div>
                  <div className="muted" style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {doc.originalName}
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: 12, justifyContent: 'space-between' }}>
                <Badge kind="info">{doc.domain?.name || '—'}</Badge>
                <div className="row gap-8" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" onClick={() => download(doc)}>⬇ Download</Button>
                  <Button variant="danger" size="sm" onClick={() => remove(doc)}>Archive</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUpload && (
        <UploadModal
          domains={domains}
          onClose={() => setShowUpload(false)}
          onDone={() => {
            setShowUpload(false);
            load();
          }}
        />
      )}
    </>
  );
}

function mapDoc(doc) {
  return { id: uid(doc), originalName: doc.originalName };
}

function UploadModal({ domains, onClose, onDone }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [domainId, setDomainId] = useState(domains[0] ? uid(domains[0]) : '');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const { toast, toastError } = useToast();

  const submit = async () => {
    if (!title.trim() || !domainId || !file) {
      toastError('Title, domain and a file are required');
      return;
    }
    setBusy(true);
    try {
      await api.uploadDocument({ title: title.trim(), description, domainId, file });
      toast('Material uploaded');
      onDone();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title="Upload material"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="cyan" onClick={submit} disabled={busy}>{busy ? <Spinner sm /> : 'Upload'}</Button>
        </>
      }
    >
      <div className="field">
        <label>Domain</label>
        <select className="select" value={domainId} onChange={(e) => setDomainId(e.target.value)}>
          {domains.map((d) => (
            <option key={uid(d)} value={uid(d)}>{d.icon} {d.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. STA basics reference" />
      </div>
      <div className="field">
        <label>Description (optional)</label>
        <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this material about?" />
      </div>
      <div className="field">
        <label>File (PPT, DOC, PDF, XLS, images, zip)</label>
        <input
          className="input"
          type="file"
          style={{ paddingTop: 10 }}
          accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg,.zip"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
    </Modal>
  );
}
