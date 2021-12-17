import "./App.css";
import AllBanks from "./Routes/AllBanks";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Favourites from "./Routes/Favourites";
import BankDetails from "./Routes/BankDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route exact path="/" element={<AllBanks />} />
          <Route path="/all-banks" element={<AllBanks />} />
          <Route path="/bank-details/:id" element={<BankDetails />} />
          <Route index element={<AllBanks />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
