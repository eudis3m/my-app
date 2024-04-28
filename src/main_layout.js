import NavBar from "./pages/nav_bar/nav_bar";
import ViewTransactions from "./pages/view_transactions/view_transactions";
import UserPage from "./pages/create_user/create_user";
import { BrowserRouter as Router, Rou, Route, Routes } from "react-router-dom";

function MainLayout() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/account/:index" element={<UserPage />} />
        <Route
          exact
          path="/transactions/:index"
          element={<ViewTransactions />}
        />
      </Routes>
    </div>
  );
}

export default MainLayout;