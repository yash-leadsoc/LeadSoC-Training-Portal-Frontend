import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, uid } from '../../api/client';
import { Button, Badge, Modal, LoadingPage, Empty, Spinner } from '../../components/ui';
import { useToast } from '../../components/Toast';

const CATS = ['tool', 'concepts', 'practical', 'advanced'];

export default function DocumentDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [doc, setDoc] = useState(null);
  const [checklists, setChecklists] = useState([]);
  const [writeups, setWriteups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // 'checklist' | 'writeup'
  const { toast, toastError } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const [d, c, w] = await Promise.all([
        api.getDocument(id),
        api.checklistsForDocument(id),
        api.writeupsForDocument(id),
      ]);
      setDoc(d.document);
      setChecklists(c.checklists);
      setWriteups(w.writeups);
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
  if (!doc) return <Empty>Document not found.</Empty>;

  const download = async () => {
    try {
      await api.downloadDocument({ id: uid(doc), originalName: doc.originalName });
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <>
      <button className="btn link" onClick={() => nav('/materials')} style={{ marginBottom: 12 }}>← Back to materials</button>
      <div className="page-head">
        <h1>{doc.title}</h1>
        <p>{doc.domain?.name} · uploaded by {doc.uploadedBy?.name} ({doc.uploadedBy?.role})</p>
      </div>

      <div className="card pad-lg">
        <div className="row gap-12" style={{ alignItems: 'flex-start' }}>
          <div style={{ fontSize: 30 }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{doc.originalName}</div>
            {doc.description && <p className="muted" style={{ fontSize: 13, margin: '6px 0 0' }}>{doc.description}</p>}
          </div>
          <Button variant="ghost" onClick={download}>⬇ Download</Button>
        </div>
      </div>

      <div className="section-title" style={{ justifyContent: 'space-between' }}>
        <span>✅ Checklists ({checklists.length})</span>
        <Button variant="cyan" size="sm" onClick={() => setModal('checklist')}>+ Add checklist</Button>
      </div>
      {checklists.length === 0 ? (
        <Empty>No checklist yet. Create one for engineers to work through.</Empty>
      ) : (
        <div className="card" style={{ padding: '6px 20px' }}>
          {checklists.map((c) => (
            <div className="list-row" key={uid(c)}>
              <div style={{ flex: 1 }}>
                <div className="li-title">{c.title}</div>
                <div className="li-sub">{c.items.length} items</div>
              </div>
              <Button variant="danger" size="sm" onClick={async () => { await api.deleteChecklist(uid(c)); toast('Checklist removed'); load(); }}>Remove</Button>
            </div>
          ))}
        </div>
      )}

      <div className="section-title" style={{ justifyContent: 'space-between' }}>
        <span>✍️ Write-ups ({writeups.length})</span>
        <Button variant="cyan" size="sm" onClick={() => setModal('writeup')}>+ Add write-up</Button>
      </div>
      {writeups.length === 0 ? (
        <Empty>No write-up questions yet. Add questions engineers must answer.</Empty>
      ) : (
        <div className="card" style={{ padding: '6px 20px' }}>
          {writeups.map((w) => (
            <div className="list-row" key={uid(w)}>
              <div style={{ flex: 1 }}>
                <div className="li-title">{w.title}</div>
                <div className="li-sub">{w.questions.length} questions</div>
              </div>
              <Button variant="danger" size="sm" onClick={async () => { await api.deleteWriteup(uid(w)); toast('Write-up removed'); load(); }}>Remove</Button>
            </div>
          ))}
        </div>
      )}

      {modal === 'checklist' && (
        <ChecklistModal documentId={uid(doc)} onClose={() => setModal(null)} onDone={() => { setModal(null); load(); }} />
      )}
      {modal === 'writeup' && (
        <WriteupModal documentId={uid(doc)} onClose={() => setModal(null)} onDone={() => { setModal(null); load(); }} />
      )}
    </>
  );
}

function ChecklistModal({ documentId, onClose, onDone }) {
  const [title, setTitle] = useState('Tool & concept checklist');
  const [items, setItems] = useState([{ text: '', category: 'tool' }]);
  const [busy, setBusy] = useState(false);
  const { toast, toastError } = useToast();

  const update = (i, k, v) => setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const add = () => setItems((a) => [...a, { text: '', category: 'tool' }]);
  const remove = (i) => setItems((a) => a.filter((_, idx) => idx !== i));

  const submit = async () => {
    const clean = items.filter((it) => it.text.trim()).map((it) => ({ text: it.text.trim(), category: it.category }));
    if (!title.trim() || clean.length === 0) {
      toastError('Add a title and at least one item');
      return;
    }
    setBusy(true);
    try {
      await api.createChecklist(title.trim(), documentId, clean);
      toast('Checklist created');
      onDone();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title="New checklist"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="cyan" onClick={submit} disabled={busy}>{busy ? <Spinner sm /> : 'Create'}</Button>
        </>
      }
    >
      <div className="field">
        <label>Checklist title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>Items</label>
      {items.map((it, i) => (
        <div key={i} className="card" style={{ padding: 12, margin: '8px 0' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--cyan)' }}>Item {i + 1}</span>
            {items.length > 1 && (
              <button className="icon-btn" onClick={() => remove(i)} title="Remove">🗑️</button>
            )}
          </div>
          <textarea className="textarea" style={{ minHeight: 50 }} value={it.text} onChange={(e) => update(i, 'text', e.target.value)} placeholder="Checklist item text" />
          <div className="row gap-8" style={{ marginTop: 8 }}>
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>Category</span>
            <select className="select" style={{ height: 38, flex: 1 }} value={it.category} onChange={(e) => update(i, 'category', e.target.value)}>
              {CATS.map((c) => (
                <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <Button variant="ghost" block onClick={add} style={{ marginTop: 4 }}>+ Add item</Button>
    </Modal>
  );
}

function WriteupModal({ documentId, onClose, onDone }) {
  const [title, setTitle] = useState('Write-up questions');
  const [qs, setQs] = useState([{ text: '', section: 'General' }]);
  const [busy, setBusy] = useState(false);
  const { toast, toastError } = useToast();

  const update = (i, k, v) => setQs((arr) => arr.map((q, idx) => (idx === i ? { ...q, [k]: v } : q)));
  const add = () => setQs((a) => [...a, { text: '', section: 'General' }]);
  const remove = (i) => setQs((a) => a.filter((_, idx) => idx !== i));

  const submit = async () => {
    const clean = qs.filter((q) => q.text.trim()).map((q) => ({ text: q.text.trim(), section: q.section.trim() || 'General' }));
    if (!title.trim() || clean.length === 0) {
      toastError('Add a title and at least one question');
      return;
    }
    setBusy(true);
    try {
      await api.createWriteup(title.trim(), documentId, clean);
      toast('Write-up created');
      onDone();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title="New write-up"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="cyan" onClick={submit} disabled={busy}>{busy ? <Spinner sm /> : 'Create'}</Button>
        </>
      }
    >
      <div className="field">
        <label>Write-up title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>Questions</label>
      {qs.map((q, i) => (
        <div key={i} className="card" style={{ padding: 12, margin: '8px 0' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--cyan)' }}>Question {i + 1}</span>
            {qs.length > 1 && <button className="icon-btn" onClick={() => remove(i)} title="Remove">🗑️</button>}
          </div>
          <textarea className="textarea" style={{ minHeight: 50 }} value={q.text} onChange={(e) => update(i, 'text', e.target.value)} placeholder="Question text" />
          <div className="field" style={{ marginTop: 8, marginBottom: 0 }}>
            <input className="input" style={{ height: 38 }} value={q.section} onChange={(e) => update(i, 'section', e.target.value)} placeholder="Section (e.g. Tool understanding)" />
          </div>
        </div>
      ))}
      <Button variant="ghost" block onClick={add} style={{ marginTop: 4 }}>+ Add question</Button>
    </Modal>
  );
}
