const API_URL = import.meta.env.VITE_API_URL || 'https://leadsoc-training-portal.onrender.com/api';

let token = localStorage.getItem('ls_token') || null;

export function setToken(t) {
  token = t;
  if (t) localStorage.setItem('ls_token', t);
  else localStorage.removeItem('ls_token');
}
export function getToken() {
  return token;
}

function headers(json = true) {
  const h = {};
  if (json) h['Content-Type'] = 'application/json';
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

async function handle(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = {};
  }
  if (!res.ok) {
    const msg = body?.message || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return body;
}

const get = (p) => fetch(`${API_URL}${p}`, { headers: headers() }).then(handle);
const post = (p, b) =>
  fetch(`${API_URL}${p}`, { method: 'POST', headers: headers(), body: JSON.stringify(b) }).then(handle);
const put = (p, b) =>
  fetch(`${API_URL}${p}`, { method: 'PUT', headers: headers(), body: JSON.stringify(b) }).then(handle);
const patch = (p, b) =>
  fetch(`${API_URL}${p}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(b) }).then(handle);
const del = (p) => fetch(`${API_URL}${p}`, { method: 'DELETE', headers: headers() }).then(handle);

export const api = {
  // auth
  login: (identifier, password) => post('/auth/login', { identifier, password }),
  me: () => get('/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    post('/auth/change-password', { currentPassword, newPassword }),

  // users
  createManager: (name, email, password) => post('/users/managers', { name, email, password }),
  createEmployee: (name, email, password, managerId) =>
    post('/users/employees', { name, email, password, managerId }),
  listUsers: (role) => get(`/users${role ? `?role=${role}` : ''}`),
  listManagers: () => get('/users/managers'),
  getUser: (id) => get(`/users/${id}`),
  setUserActive: (id, active) => patch(`/users/${id}/active`, { active }),

  // domains
  listDomains: () => get('/domains'),
  createDomain: (key, name, description, icon) => post('/domains', { key, name, description, icon }),

  // documents
  listDocuments: (domainId) => get(`/documents${domainId ? `?domainId=${domainId}` : ''}`),
  getDocument: (id) => get(`/documents/${id}`),
  deleteDocument: (id) => del(`/documents/${id}`),
  markReviewed: (id) => post(`/documents/${id}/review`, { reviewed: true }),
  uploadDocument: async ({ title, description, domainId, file }) => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description || '');
    fd.append('domainId', domainId);
    fd.append('file', file);
    const res = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    return handle(res);
  },
  downloadDocument: async (doc) => {
    const res = await fetch(`${API_URL}/documents/${doc.id}/download`, { headers: headers(false) });
    if (!res.ok) throw new Error(`Download failed (${res.status})`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.originalName || 'material';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },

  // checklists
  createChecklist: (title, documentId, items) => post('/checklists', { title, documentId, items }),
  checklistsForDocument: (documentId) => get(`/checklists/by-document/${documentId}`),
  deleteChecklist: (id) => del(`/checklists/${id}`),
  myChecklistResponse: (id) => get(`/checklists/${id}/my-response`),
  saveChecklistResponse: (id, responses) => put(`/checklists/${id}/my-response`, { responses }),

  // writeups
  createWriteup: (title, documentId, questions) => post('/writeups', { title, documentId, questions }),
  writeupsForDocument: (documentId) => get(`/writeups/by-document/${documentId}`),
  deleteWriteup: (id) => del(`/writeups/${id}`),
  myWriteupAnswer: (id) => get(`/writeups/${id}/my-answer`),
  saveWriteupAnswer: (id, answers) => put(`/writeups/${id}/my-answer`, { answers }),

  // tracking
  myProgress: () => get('/tracking/me'),
  employeeProgress: (id) => get(`/tracking/employee/${id}`),
  cohort: () => get('/tracking/cohort'),
};

// normalize the various id fields the backend returns
export function uid(o) {
  return (o && (o.id || o._id)) ? (o.id || o._id).toString() : '';
}
