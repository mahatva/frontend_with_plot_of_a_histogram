import { Route,Routes } from "react-router-dom";
import Graph from "./components/Graph";
import Homepage from "./components/Homepage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" Component={Homepage} /> 
      <Route path="/graph" Component={Graph} />
    </Routes> 
    </>
  );
}

export default App;
