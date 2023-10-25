import React, { useState } from "react";
import axios from "axios";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { removeTask } from "../redux/actions/taskReducersAction";

function DeleteModal({ setIsDeleteOpen, deleteId, socket, activeUser }) {
  const dispatch = useDispatch();

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(`${base_url}/api/tasks/remove?id=${deleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    removeTask(dispatch, {
      id: deleteId,
    });
    socket.emit("send-notification", `${activeUser.email} deleted task`);
    setIsDeleteOpen(false);
  };

  return (
    <main>
      <div className="fixed inset-0 flex justify-center items-center z-50 ">
        <div
          className="fixed inset-0 bg-gray-600 backdrop-blur-2xl opacity-40"
          onClick={() => setIsDeleteOpen(false)}
        ></div>
        <div className="bg-white sm:w-[80%] w-[95%] max-w-screen-md p-4 rounded-lg shadow-lg relative">
          <header>
            <h2 className="md:text-xl sm:text-lg text-md font-semibold mb-1">
              Required Action
            </h2>
            <div className="bg-orange-300 h-[3px] mb-4"></div>
          </header>
          <form onSubmit={handleSubmit}>
            <section>
              <div className="mt-3 sm:ml-4 sm:mt-0 text-left">
                <div className="my-2">
                  <p className="md:text-[17px] text-[15px] font-semibold text-red-500">
                    Are you sure you want to delete this Task?
                  </p>
                </div>
              </div>
            </section>
            <footer>
              <div className="text-right font-bold text-lg">
                <button
                  type="submit"
                  className="sm:px-4 px-3 sm:py-2 py-1 bg-blue-400 sm:text-[16px] text-[14px] text-white rounded-md hover:bg-blue-500"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="ml-2 sm:px-4 px-3 sm:py-2 py-1 bg-red-400 sm:text-[16px] text-[14px] text-white rounded-md hover:bg-red-500"
                  onClick={(e) => {
                    setIsDeleteOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </main>
  );
}

export default DeleteModal;
