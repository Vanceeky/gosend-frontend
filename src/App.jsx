import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './app/login/page.jsx';
import AdminDashboardPage from './app/dashboard/page.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Catch dynamic login URL */}
        <Route path="/v1/admin/:account_url/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />

      </Routes>
    </Router>
  );
}

export default App;
