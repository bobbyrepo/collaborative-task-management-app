import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

import { addTask } from "../redux/actions/taskReducersAction";

function AddModal({ setIsAddOpen, successNotify, errNotify }) {
  const activeUser = useSelector((state) => state.userReducer);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length > 0 && details.length > 0) {
      axios
        .post(
          `${base_url}/api/tasks/save`,
          { user: activeUser.email, userId: activeUser.userId, title, details },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          addTask(dispatch, res.data.task);
          successNotify("Task Added");
        })
        .catch((err) => console.log(err));

      setIsAddOpen(false);
    } else {
      errNotify("Fill the input fields");
    }
  };

  return (
    <main>
      <div className="fixed inset-0 flex justify-center items-center z-50 ">
        <div
          className="fixed inset-0 bg-gray-600 backdrop-blur-2xl opacity-40"
          onClick={() => setIsAddOpen(false)}
        ></div>
        <div className="bg-white sm:w-[80%] w-[95%] max-w-screen-md p-4 rounded-lg shadow-lg relative">
          <header>
            <h2 className="md:text-xl sm:text-lg text-md font-semibold mb-1">
              Add Task
            </h2>
            <div className="bg-orange-300 h-[3px] mb-4"></div>
          </header>
          <form onSubmit={handleSubmit}>
            {/*-------- Add Task-------*/}
            <section>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block sm:text-[18px] text-[16px] font-medium text-gray-700"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border rounded-md py-2 px-2 font-[500] sm:text-[20px] text-[17px] text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="sm:mb-4 mb-1">
                <label
                  htmlFor="name"
                  className="blocksm:text-[18px] text-[16px] font-medium text-gray-700"
                >
                  Details:
                </label>
                <textarea
                  type="text"
                  id="name"
                  className="w-full min-h-[150px] max-h-[150px] border rounded-md py-2 px-2 font-[500] sm:text-[20px] text-[17px] text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                />
              </div>
            </section>

            <footer>
              <div className="text-right font-bold">
                <button
                  type="submit"
                  className="sm:px-4 px-3 sm:py-2 py-1 bg-blue-400 sm:text-[16px] text-[14px] text-white rounded-md hover:bg-blue-500"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="ml-2 sm:px-4 px-3 sm:py-2 py-1 bg-red-400 sm:text-[16px] text-[14px] text-white rounded-md hover:bg-red-500"
                  onClick={(e) => setIsAddOpen(false)}
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

export default AddModal;
