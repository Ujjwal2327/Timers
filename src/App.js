import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Clock from "./Pages/Clock";
import Timer from "./Pages/Timer";
import Pomodoro from "./Pages/Pomodoro";
import Stopwatch from "./Pages/Stopwatch";

function App() {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Clock/>}/>
        <Route path="/timer" element={<Timer/>}/>
        <Route path="/pomodoro" element={<Pomodoro/>}/>
        <Route path="/stopwatch" element={<Stopwatch/>}/>
      </Routes>
    </div>
  );
}

export default App;
