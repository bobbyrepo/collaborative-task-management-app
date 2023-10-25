import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import AllTasks from "./components/AllTasks";

import { io } from "socket.io-client";
import { addNotification } from "./redux/actions/notificationReducerAction";

function App() {
  // const socketData = useSelector((state) => state.socketReducer);

  const dispatch = useDispatch();

  const socket = io.connect("http://localhost:8000");

  useEffect(() => {
    socket.on("new-notification", (res) => {
      // console.log("Received new notification:", res);
      addNotification(dispatch, res);
    });
  }, []);

  return (
    <div className="mx-auto min-h-[100vh] bg-neutral-100">
      <BrowserRouter>
        <div className="fixed w-full top-0 left-0 z-50 bg-white">
          <Navbar />
        </div>
        <div className="sm:pt-[100px] pt-[70px]">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/all-tasks" element={<AllTasks socket={socket} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
