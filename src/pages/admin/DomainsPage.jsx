import { useEffect, useState } from 'react';
import { api, uid } from '../../api/client';
import { Button, Modal, LoadingPage, Empty, Spinner } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function DomainsPage() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const { toastError } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.listDomains();
      setDomains(r.domains);
    } catch (e) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="page-head" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <h1>Domains</h1>
          <p>Domains group the training materials engineers work through.</p>
        </div>
        <Button variant="cyan" onClick={() => setShow(true)}>+ Add domain</Button>
      </div>

      {loading ? (
        <LoadingPage />
      ) : domains.length === 0 ? (
        <Empty>No domains yet.</Empty>
      ) : (
        <div className="grid grid-3">
          {domains.map((d) => (
            <div key={uid(d)} className="card card-hover">
              <div style={{ fontSize: 30 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16, marginTop: 8 }}>{d.name}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>{d.description}</div>
            </div>
          ))}
        </div>
      )}

      {show && <DomainModal onClose={() => setShow(false)} onDone={() => { setShow(false); load(); }} />}
    </>
  );
}

function DomainModal({ onClose, onDone }) {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('📘');
  const [busy, setBusy] = useState(false);
  const { toast, toastError } = useToast();

  const submit = async () => {
    if (!key.trim() || !name.trim()) {
      toastError('Key and name are required');
      return;
    }
    setBusy(true);
    try {
      await api.createDomain(key.trim().toLowerCase(), name.trim(), description.trim(), icon.trim() || '📘');
      toast('Domain created');
      onDone();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title="New domain"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="cyan" onClick={submit} disabled={busy}>{busy ? <Spinner sm /> : 'Create'}</Button>
        </>
      }
    >
      <div className="field"><label>Key (short, e.g. dft)</label><input className="input" value={key} onChange={(e) => setKey(e.target.value)} /></div>
      <div className="field"><label>Name (e.g. DFT)</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
      <div className="field"><label>Description</label><input className="input" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
      <div className="field"><label>Icon (emoji)</label><input className="input" value={icon} onChange={(e) => setIcon(e.target.value)} /></div>
    </Modal>
  );
}
