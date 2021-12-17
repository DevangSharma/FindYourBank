import "./App.css";
import AllBanks from "./Routes/AllBanks";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AllBanks />
    </div>
  );
}

export default App;
