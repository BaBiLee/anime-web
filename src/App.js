import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import AnimeDetail from "./components/AnimeDetail/AnimeDetail";
import { Switch } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css"
import "./responsive.css"

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/anime/:category" element={<AnimeDetail />} />
        </Routes>
      </>
    </HashRouter>
  );
}

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/anime/:category" component={AnimeDetail} />
//       </Switch>
//     </Router>
//   );
// };

export default App;
