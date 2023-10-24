import React, { useState } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { editTask } from "../redux/actions/taskReducersAction";

function EditModal({ setIsEditOpen, successNotify, errNotify }) {
  const allData = useSelector((state) => state.taskReducer);
  const id = useSelector((state) => state.selectToEditReducer.id);

  // Set the initial values of title based on the selected item
  const [title, setTitle] = useState(
    allData.find((item) => item._id === id).title
  );

  // Set the initial values of details based on the selected item
  const [details, setDetails] = useState(
    allData.find((item) => item._id === id).details
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length > 0 && details.length > 0) {
      editTask(dispatch, {
        _id: id,
        title,
        details,
      });
      successNotify("Task edited");
      setIsEditOpen(false);
    } else {
      errNotify("Fill the inputs");
    }
  };

  return (
    <main>
      <div className="fixed inset-0 flex justify-center items-center z-50 ">
        <div
          className="fixed inset-0 bg-gray-600 backdrop-blur-2xl opacity-40"
          onClick={() => setIsEditOpen(false)}
        ></div>
        <div className="bg-white sm:w-[80%] w-[95%] max-w-screen-md p-4 rounded-lg shadow-lg relative">
          <header>
            <h2 className="md:text-xl sm:text-lg text-md font-semibold mb-1">
              Edit Task
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
                  className="block sm:text-[18px] text-[16px] font-medium text-gray-700"
                >
                  Details:
                </label>
                <textarea
                  type="text"
                  id="name"
                  className="w-full border rounded-md py-2 px-2 font-[500] sm:text-[20px] text-[17px] text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                />
              </div>
            </section>

            <footer>
              <div className="text-right font-bold text-lg">
                <button
                  type="submit"
                  className="sm:px-4 px-3 sm:py-2 py-1 bg-blue-400 sm:text-[16px] text-[14px] text-white rounded-md hover:bg-blue-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-2 sm:px-4 px-3 sm:py-2 py-1 bg-red-400 sm:text-[16px] text-[14px] text-white rounded-md hover:bg-red-500"
                  onClick={(e) => setIsEditOpen(false)}
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

export default EditModal;
