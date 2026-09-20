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
  const [allDomains, setAllDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [savingDomains, setSavingDomains] = useState(false);




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

  useEffect(() => {
    (async () => {
      try {
        const result = await api.listDomains();
        setAllDomains(result);
      } catch (e) {
        toastError(e);
      }
    })();
  }, []);

  if (loading) return <LoadingPage />;
  if (!data) return <Empty>Engineer not found.</Empty>;

  const { user, progress, summary } = data;

  const domains = Object.values(progress || {});

  const assignedDomainIds = (user.assignedDomains || []).map((domain) =>
    typeof domain === 'string'
      ? domain
      : domain._id || domain.id
  );

  const openDomainModal = () => {
    setSelectedDomains(assignedDomainIds);
    setShowDomainModal(true);
  };

  const toggleDomain = (domainId) => {
    setSelectedDomains((current) => {
      if (current.includes(domainId)) {
        return current.filter((id) => id !== domainId);
      }

      return [...current, domainId];
    });
  };

  const saveDomains = async () => {
    try {
      setSavingDomains(true);

      await api.assignUserDomains(id, selectedDomains);

      // Update local employee data immediately
      setData((current) => ({
        ...current,
        user: {
          ...current.user,
          assignedDomains: selectedDomains,
        },
      }));

      setShowDomainModal(false);
    } catch (e) {
      toastError(e);
    } finally {
      setSavingDomains(false);
    }
  };

  return (
    <>
      <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>← Back</button>
      <div
        className="page-head"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div>
          <h1>{user.name}</h1>
          <p>
            {user.email} · {user.employeeCode}
          </p>
        </div>

        <button
          className="btn"
          onClick={openDomainModal}
        >
          Assign Domains
        </button>
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
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: 500,
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: 24,
            }}
          >
            <div
              className="row"
              style={{
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>
                  Assign Domains
                </h2>

                <p className="muted">
                  Select domains for {user.name}
                </p>
              </div>

              <button
                className="btn link"
                onClick={() => setShowDomainModal(false)}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {allDomains.length === 0 ? (
                <p className="muted">
                  No domains available.
                </p>
              ) : (
                allDomains.map((domain) => {
                  const domainId = domain._id || domain.id;

                  const isSelected =
                    selectedDomains.includes(domainId);

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
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          toggleDomain(domainId)
                        }
                      />

                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                          }}
                        >
                          {domain.name}
                        </div>

                        {domain.description && (
                          <div
                            className="muted"
                            style={{
                              fontSize: 12,
                              marginTop: 3,
                            }}
                          >
                            {domain.description}
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })
              )}
            </div>

            <div
              className="row"
              style={{
                justifyContent: 'flex-end',
                gap: 10,
                marginTop: 20,
              }}
            >
              <button
                className="btn"
                onClick={() =>
                  setShowDomainModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="btn primary"
                onClick={saveDomains}
                disabled={savingDomains}
              >
                {savingDomains
                  ? 'Saving...'
                  : 'Save Domains'}
              </button>
            </div>
          </div>
        </div>
      )}



    </>
  );
}
