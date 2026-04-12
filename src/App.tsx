import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PracticeLayout from "./layouts/DashboardLayout/PracticeLayout";
import HistoryLayout from "./layouts/DashboardLayout/HistoryLayout";
import MyinfoLayout from "./layouts/DashboardLayout/MyinfoLayout";

function App() {
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
