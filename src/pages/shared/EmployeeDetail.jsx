import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { Kpi, Badge, ProgressRow, LoadingPage, Empty, pctColors } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function EmployeeDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toastError } = useToast();

  useEffect(() => {
    (async () => {
      try {
        setData(await api.employeeProgress(id));
      } catch (e) {
        toastError(e);
      } finally {
        setLoading(false);
      }
    })(); // eslint-disable-next-line
  }, [id]);

  if (loading) return <LoadingPage />;
  if (!data) return <Empty>Engineer not found.</Empty>;

  const { user, progress, summary } = data;
  const domains = Object.values(progress);

  return (
    <>
      <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>← Back</button>
      <div className="page-head">
        <h1>{user.name}</h1>
        <p>{user.email} · {user.employeeCode}</p>
      </div>

      <div className="grid grid-4">
        <Kpi icon="📅" value={summary.daysEnrolled} label={`Days enrolled · ${summary.pace}`} />
        <Kpi icon="✅" value={`${summary.avgCompletion}%`} label="Avg completion (active)" />
        <Kpi icon="🗂️" value={`${summary.domainsStarted} / ${summary.totalDomains}`} label="Domains started" />
        <Kpi icon="⭐" value={summary.strongestDomain} label="Strongest domain" />
      </div>

      <div className="section-title">Per-domain breakdown</div>
      <div className="grid grid-2">
        {domains.map((d) => {
          const c = pctColors(d.overall);
          return (
            <div key={d.name} className="card pad-lg" style={{ opacity: d.started ? 1 : 0.6 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{d.name}</span>
                <span className="badge" style={{ background: c.bg, color: c.fg }}>
                  {d.overall == null ? 'Not started' : `${d.overall}%`}
                </span>
              </div>
              <ProgressRow label="Tool" value={d.tool} />
              <ProgressRow label="Concepts" value={d.concepts} />
              <ProgressRow label="Practical" value={d.practical} />
              <ProgressRow label="Advanced" value={d.advanced} />
              <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
                Materials reviewed: {d.materials.reviewed} / {d.materials.total}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
