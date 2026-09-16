import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, uid } from '../../api/client';
import { Button, Badge, LoadingPage, Empty, Spinner } from '../../components/ui';
import { useToast } from '../../components/Toast';

export default function DoWriteup() {
  const { id } = useParams();
  const nav = useNavigate();
  const [writeup, setWriteup] = useState(null);
  const [answers, setAnswers] = useState({}); // qId -> text
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, toastError } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await api.myWriteupAnswer(id);
        const w = data.writeup;
        const map = {};
        (data.answer?.answers || []).forEach((a) => (map[a.question.toString()] = a.answer || ''));
        w.questions.forEach((q) => {
          const qid = uid(q);
          if (map[qid] == null) map[qid] = '';
        });
        setWriteup(w);
        setAnswers(map);
      } catch (e) {
        toastError(e);
      } finally {
        setLoading(false);
      }
    })(); // eslint-disable-next-line
  }, [id]);

  if (loading) return <LoadingPage />;
  if (!writeup) return <Empty>Write-up not found.</Empty>;

  const answered = Object.values(answers).filter((a) => a.trim()).length;

  // group by section
  const sections = {};
  writeup.questions.forEach((q) => {
    (sections[q.section] = sections[q.section] || []).push(q);
  });

  const save = async () => {
    setSaving(true);
    try {
      const payload = writeup.questions.map((q) => ({ question: uid(q), answer: answers[uid(q)] || '' }));
      await api.saveWriteupAnswer(id, payload);
      toast('Answers saved');
    } catch (e) {
      toastError(e);
    } finally {
      setSaving(false);
    }
  };

  let n = 0;
  return (
    <>
      <button className="btn link" onClick={() => nav(-1)} style={{ marginBottom: 12 }}>← Back</button>
      <div className="page-head" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <h1>{writeup.title}</h1>
          <p>{answered} / {writeup.questions.length} answered</p>
        </div>
        <Button variant="cyan" onClick={save} disabled={saving}>{saving ? <Spinner sm /> : 'Save answers'}</Button>
      </div>

      {Object.entries(sections).map(([section, qs]) => (
        <div key={section}>
          <div className="section-title">{section}</div>
          <div className="stack" style={{ gap: 10 }}>
            {qs.map((q) => {
              n += 1;
              const qid = uid(q);
              const has = (answers[qid] || '').trim().length > 0;
              return (
                <div key={qid} className="card" style={{ borderLeft: `3px solid ${has ? 'var(--cyan)' : 'var(--border)'}` }}>
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--cyan)' }}>Question {n}</span>
                    <Badge kind={has ? 'success' : 'neutral'}>{has ? 'Answered' : 'Pending'}</Badge>
                  </div>
                  <div style={{ fontSize: 14, marginBottom: 8 }}>{q.text}</div>
                  <textarea
                    className="textarea"
                    value={answers[qid]}
                    onChange={(e) => setAnswers((a) => ({ ...a, [qid]: e.target.value }))}
                    placeholder="Type your answer here…"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 16 }}>
        <Button variant="cyan" block onClick={save} disabled={saving}>{saving ? <Spinner sm /> : 'Save answers'}</Button>
      </div>
    </>
  );
}
