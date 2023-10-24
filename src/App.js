import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import AllTasks from "./components/AllTasks";

function App() {
  return (
    <div className="mx-auto min-h-[100vh] bg-neutral-100">
      <BrowserRouter>
        <div className="fixed w-full top-0 left-0 z-50 bg-white">
          <Navbar />
        </div>
        <div className="sm:pt-[100px] pt-[70px]">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/all-tasks" element={<AllTasks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
