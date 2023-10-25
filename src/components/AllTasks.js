import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSquareOutline } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import user from "../assets/user (1).png";

import { editTask } from "../redux/actions/taskReducersAction";

// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setUser } from "../redux/actions/userReducerAction";
import { setTasks } from "../redux/actions/taskReducersAction";
import { selectToEdit } from "../redux/actions/selectToEditReducerAction";

function AllTasks() {
  const data = useSelector((state) => state.taskReducer);
  const activeUser = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const [activeAdmin, setActiveAdmin] = useState(false);
  const [activeUserId, setActiveUserId] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false); //to toggle Add Modal
  const [isEditOpen, setIsEditOpen] = useState(false); //to toggle edit Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); //to toggle edit Modal
  const [deleteId, setDeleteId] = useState("false"); //to toggle edit Modal
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    if (activeUser && activeUser.admin) {
      setActiveAdmin(true);
    }
  }, [activeUser]);

  //----------- notification -------------
  const successNotify = (val) => {
    toast.success(val, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const errNotify = (val) => {
    toast.error(val, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    function fetchTasks() {
      axios
        .get(`${base_url}/api/tasks/get-all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          setTasks(dispatch, res.data.allTasks);
          setActiveUserId(res.data.userId);
        })
        .catch((err) => {
          navigate("/");
          console.log(err);
        });
    }
    fetchTasks();
  }, [activeUser]);

  useEffect(() => {
    axios
      .get(`${base_url}/api/users?userId=${activeUserId}`)
      .then((res) => {
        // console.log(res.data.data);
        setUser(dispatch, res.data.data);
      })
      .catch((err) => console.log(err));
  }, [activeUserId]);

  return (
    <div className="xl:w-[70%] lg:w-[75%] sm:w-[90%] w-[95%] min-h-[100vh] pb-[200px] mx-auto flex flex-col gap-2">
      {/*------ add modal component ------*/}
      {isAddOpen && (
        <AddModal
          setIsAddOpen={setIsAddOpen}
          successNotify={successNotify}
          errNotify={errNotify}
        />
      )}
      {/*------ edit modal component ------*/}
      {isEditOpen && (
        <EditModal
          setIsEditOpen={setIsEditOpen}
          successNotify={successNotify}
          errNotify={errNotify}
        />
      )}
      {/*------ Delete modal component ------*/}
      {isDeleteOpen && (
        <DeleteModal setIsDeleteOpen={setIsDeleteOpen} deleteId={deleteId} />
      )}
      <div className="flex justify-end sm:mb-5 mb-2">
        <button
          className="flex items-center sm:gap-1 gap-0 px-3 py-1 sm:text-xl text-md font-medium border-2 border-orange-300 hover:text-white hover:bg-orange-300 rounded-xl duration-100"
          onClick={() => setIsAddOpen(true)}
        >
          <span>
            <IoMdAdd />
          </span>
          Add
        </button>
        {/*--------- Add Task Modal ---------*/}
      </div>
      {data.map((item) => (
        <div
          key={item._id}
          className={`relative sm:mt-[5px] font-[500] rounded-xl cursor-pointer ${
            activeUserId == item.userId ? "bg-orange-200" : "bg-white"
          }`}
        >
          <div
            className="p-1 px-4"
            onClick={() => {
              if (selectedTask == item._id) {
                setSelectedTask("");
              } else {
                setSelectedTask(item._id);
              }
            }}
          >
            <div className="w-full">
              <div className="flex flex-col w-[70%]">
                {/* <img src={user} className="w-8" alt="" /> */}
                <h1 className="sm:text-sm text-[12px] text-orange-500">
                  {item.user}
                </h1>
                <h1
                  className={`sm:text-[17px] text-[16px] w-[100%] text-ellipsis overflow-hidden ${
                    selectedTask == item._id
                      ? "break-words"
                      : "overflow-hidden "
                  }
                ${item.resolved ? "line-through" : ""}
                `}
                >
                  {item.title}
                </h1>
              </div>
            </div>
            <div className="">
              <h1
                className={`sm:w-[90%] w-[100%]  break-words sm:text-[16px] text-[15px] font-normal ${
                  selectedTask == item._id ? "" : "line-clamp-1 "
                }  ${item.resolved ? "line-through" : ""}`}
              >
                {item.details}
              </h1>
            </div>
          </div>

          {/*------ button to edit check and delete --------*/}
          {(activeAdmin || activeUserId == item.userId) && (
            <div className="absolute top-2 right-2 flex sm:gap-2 gap-1 items-center sm:text-2xl text-xl text-gray-700">
              {item.resolved && (
                <FiCheckSquare
                  onClick={() => {
                    editTask(dispatch, {
                      _id: item._id,
                      resolved: false,
                    });
                  }}
                />
              )}
              {!item.resolved && (
                <IoSquareOutline
                  onClick={() => {
                    editTask(dispatch, {
                      _id: item._id,
                      resolved: true,
                    });
                  }}
                />
              )}

              {!item.resolved && (
                <BiEdit
                  className="hover:text-orange-400 hover:pb-[2px] duration-100"
                  onClick={() => {
                    setIsEditOpen(true);
                    selectToEdit(dispatch, {
                      id: item._id,
                    });
                  }}
                />
              )}
              <RiDeleteBin6Line
                className="hover:text-orange-400 hover:pb-[2px] duration-100"
                onClick={() => {
                  setIsDeleteOpen(true);
                  setDeleteId(item._id);
                }}
              />
            </div>
          )}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default AllTasks;
