import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PracticeLayout from "./layouts/DashboardLayout/PracticeLayout";
import HistoryLayout from "./layouts/DashboardLayout/HistoryLayout";
import MyinfoLayout from "./layouts/DashboardLayout/MyinfoLayout";
import AnalyticsLayout from "./layouts/DashboardLayout/AnalyticsLayout";
import { useContext, useEffect } from "react";
import { AuthContext } from "./services/AuthContext";

function App() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  console.log(accessToken);
  useEffect(() => {
    const _accessToken = localStorage.getItem("accesstoken");
    if (_accessToken) {
      setAccessToken(_accessToken);
    } else {
      setAccessToken(null);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard>
              <DashboardLayout />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/practice"
          element={
            <Dashboard>
              <PracticeLayout />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <Dashboard>
              <AnalyticsLayout />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/history"
          element={
            <Dashboard>
              <HistoryLayout />
            </Dashboard>
          }
        />
        <Route
          path="/dashboard/myinfo"
          element={
            <Dashboard>
              <MyinfoLayout />
            </Dashboard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
