import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, uid } from '../../api/client';
import { Button, Badge, LoadingPage, Empty, Spinner } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function DoChecklist() {
  const { id } = useParams();
  const nav = useNavigate();
  const [checklist, setChecklist] = useState(null);
  const [resp, setResp] = useState({}); // itemId -> {tried, understood, proficiency}
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, toastError } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await api.myChecklistResponse(id);
        const cl = data.checklist;
        const map = {};
        (data.response?.responses || []).forEach((r) => {
          map[r.item.toString()] = { tried: r.tried, understood: r.understood, proficiency: r.proficiency };
        });
        cl.items.forEach((it) => {
          const iid = uid(it);
          if (!map[iid]) map[iid] = { tried: false, understood: false, proficiency: 0 };
        });
        setChecklist(cl);
        setResp(map);
      } catch (e) {
        toastError(e);
      } finally {
        setLoading(false);
      }
    })(); // eslint-disable-next-line
  }, [id]);

  if (loading) return <LoadingPage />;
  if (!checklist) return <Empty>Checklist not found.</Empty>;

  const set = (iid, k, v) => setResp((r) => ({ ...r, [iid]: { ...r[iid], [k]: v } }));
  const understood = Object.values(resp).filter((r) => r.understood).length;

  const save = async () => {
    setSaving(true);
    try {
      const payload = checklist.items.map((it) => {
        const iid = uid(it);
        return { item: iid, ...resp[iid] };
      });
      await api.saveChecklistResponse(id, payload);
      toast('Progress saved');
    } catch (e) {
      toastError(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>← Back</button>
      <div className="page-head" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <h1>{checklist.title}</h1>
          <p>{understood} / {checklist.items.length} understood</p>
        </div>
        <Button variant="cyan" onClick={save} disabled={saving}>{saving ? <Spinner sm /> : 'Save progress'}</Button>
      </div>

      <div className="stack" style={{ gap: 10 }}>
        {checklist.items.map((it, i) => {
          const iid = uid(it);
          const r = resp[iid];
          return (
            <div key={iid} className="card">
              <div className="row gap-8" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--cyan)' }}>#{i + 1}</span>
                <Badge kind="neutral">{it.category?.toUpperCase()}</Badge>
              </div>
              <div style={{ fontSize: 14 }}>{it.text}</div>
              <div className="row gap-16" style={{ marginTop: 10, flexWrap: 'wrap' }}>
                <label className="row gap-8" style={{ fontSize: 13.5, cursor: 'pointer' }}>
                  <input type="checkbox" checked={r.tried} onChange={(e) => set(iid, 'tried', e.target.checked)} /> Tried
                </label>
                <label className="row gap-8" style={{ fontSize: 13.5, cursor: 'pointer' }}>
                  <input type="checkbox" checked={r.understood} onChange={(e) => set(iid, 'understood', e.target.checked)} /> Understood
                </label>
                <label className="row gap-8" style={{ fontSize: 13.5 }}>
                  Proficiency
                  <select className="select" style={{ height: 34, width: 70 }} value={r.proficiency} onChange={(e) => set(iid, 'proficiency', Number(e.target.value))}>
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n === 0 ? '–' : n}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 16 }}>
        <Button variant="cyan" block onClick={save} disabled={saving}>{saving ? <Spinner sm /> : 'Save progress'}</Button>
      </div>
    </>
  );
}
