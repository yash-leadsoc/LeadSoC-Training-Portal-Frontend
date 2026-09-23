// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './auth/AuthContext';
// import { LoadingPage } from './components/ui';
// import Layout from './components/Layout';

// import Login from './pages/Login';
// import CohortDashboard from './pages/shared/CohortDashboard';
// import PeoplePage from './pages/shared/PeoplePage';
// import MaterialsPage from './pages/shared/MaterialsPage';
// import DocumentDetail from './pages/shared/DocumentDetail';
// import EmployeeDetail from './pages/shared/EmployeeDetail';
// import DomainsPage from './pages/admin/DomainsPage';
// import AccountPage from './pages/account/AccountPage';
// import EmployeeDomains from './pages/employee/EmployeeDomains';
// import DomainDetail from './pages/employee/DomainDetail';
// import DoChecklist from './pages/employee/DoChecklist';
// import DoWriteup from './pages/employee/DoWriteup';
// import MyProgress from './pages/employee/MyProgress';

// function AdminRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<CohortDashboard />} />
//       <Route path="/people" element={<PeoplePage />} />
//       <Route path="/materials" element={<MaterialsPage />} />
//       <Route path="/domains" element={<DomainsPage />} />
//       <Route path="/document/:id" element={<DocumentDetail />} />
//       <Route path="/employee/:id" element={<EmployeeDetail />} />
//       <Route path="/account" element={<AccountPage />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function ManagerRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<CohortDashboard />} />
//       <Route path="/people" element={<PeoplePage />} />
//       <Route path="/materials" element={<MaterialsPage />} />
//       <Route path="/document/:id" element={<DocumentDetail />} />
//       <Route path="/employee/:id" element={<EmployeeDetail />} />
//       <Route path="/account" element={<AccountPage />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function EmployeeRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<EmployeeDomains />} />
//       <Route path="/domain/:id" element={<DomainDetail />} />
//       <Route path="/checklist/:id" element={<DoChecklist />} />
//       <Route path="/writeup/:id" element={<DoWriteup />} />
//       <Route path="/progress" element={<MyProgress />} />
//       <Route path="/account" element={<AccountPage />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default function App() {
//   const { user, loading } = useAuth();

//   if (loading) return <LoadingPage />;
//   if (!user) return <Login />;

//   return (
//     <BrowserRouter>
//       <Layout>
//         {user.role === 'admin' && <AdminRoutes />}
//         {user.role === 'manager' && <ManagerRoutes />}
//         {user.role === 'employee' && <EmployeeRoutes />}
//       </Layout>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { LoadingPage } from './components/ui';
import Layout from './components/Layout';
import {useEffect} from 'react';

import Login from './pages/Login';
import CohortDashboard from './pages/shared/CohortDashboard';
import PeoplePage from './pages/shared/PeoplePage';
import MaterialsPage from './pages/shared/MaterialsPage';
import DocumentDetail from './pages/shared/DocumentDetail';
import EmployeeDetail from './pages/shared/EmployeeDetail';
import ChecklistView from './pages/shared/ChecklistView';
import DomainsPage from './pages/admin/DomainsPage';
import AccountPage from './pages/account/AccountPage';
import Community from './pages/shared/Community';
import EmployeeDomains from './pages/employee/EmployeeDomains';
import DomainDetail from './pages/employee/DomainDetail';
import DoChecklist from './pages/employee/DoChecklist';
import DoWriteup from './pages/employee/DoWriteup';
import MyProgress from './pages/employee/MyProgress';
import LogsPage from './pages/shared/LogsPage';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CohortDashboard />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/materials" element={<MaterialsPage />} />
      <Route path="/domains" element={<DomainsPage />} />
      <Route path="/document/:id" element={<DocumentDetail />} />
      <Route path="/employee/:id" element={<EmployeeDetail />} />
      <Route path="/employee/:id/domain/:domainId/checklist" element={<ChecklistView />} />
      <Route path="/community" element={<Community />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function ManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CohortDashboard />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/materials" element={<MaterialsPage />} />
      <Route path="/document/:id" element={<DocumentDetail />} />
      <Route path="/employee/:id" element={<EmployeeDetail />} />
      <Route path="/employee/:id/domain/:domainId/checklist" element={<ChecklistView />} />
      <Route path="/community" element={<Community />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeDomains />} />
      <Route path="/domain/:id" element={<DomainDetail />} />
      <Route path="/checklist/:id" element={<DoChecklist />} />
      <Route path="/writeup/:id" element={<DoWriteup />} />
      <Route path="/progress" element={<MyProgress />} />
      <Route path="/community" element={<Community />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const blockContext = (e) => e.preventDefault();
    const blockKeys = (e) => {
      const k = (e.key || '').toUpperCase();
      if (k === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(k)) ||
        (e.ctrlKey && k === 'U')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('keydown', blockKeys);
    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);


  if (loading) return <LoadingPage />;
  if (!user) return <Login />;

  return (
    <BrowserRouter>
      <Layout>
        {user.role === 'admin' && <AdminRoutes />}
        {user.role === 'manager' && <ManagerRoutes />}
        {user.role === 'employee' && <EmployeeRoutes />}
      </Layout>
    </BrowserRouter>
  );
}