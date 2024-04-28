import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/login/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./main_layout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;