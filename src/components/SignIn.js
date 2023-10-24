import React, { useEffect, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [signIn, setSignIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [eye, setEye] = useState(false);

  const navigate = useNavigate();

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const isEmailValid = /\S+@\S+\.\S+/.test(email); // Regular expression to validate email

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

  function handleSignIn() {
    if (!isEmailValid) {
      setEmailErr(true);
    } else if (password.length < 8) {
      setEmailErr(false);
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
      axios
        .post(`${base_url}/api/users/register`, {
          email,
          password,
          admin,
        })
        .then((res) => {
          setSignIn(false);
          setPassword("");
          successNotify("User Added");
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            errNotify("User alraedy exists"); //user already exists
            setSignIn(false);
            setPassword("");
          } else {
            console.log(err);
          }
        });
    }
  }

  function handleLogIn() {
    if (!isEmailValid) {
      setEmailErr(true);
    } else if (password.length < 8) {
      setEmailErr(false);
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
      axios
        .post(`${base_url}/api/users/login`, {
          email,
          password,
        })
        .then((res) => {
          successNotify("Looged In successfully");
          if (res.data && res.data.accessToken) {
            navigate("/all-tasks");
            localStorage.setItem("accessToken", res.data.accessToken); // Add the accessToken to localStorage
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            errNotify("User Not Found"); //user does not exist
            setSignIn(true);
            setPassword("");
          } else if (err.response && err.response.status === 401) {
            errNotify("Wrong Password"); //wrong password
          } else {
            console.log(err);
          }
        });
    }
  }

  return (
    <div className="sm:w-[500px] w-[90%] m-auto mt-[40px]">
      <div className="flex md:text-lg text-md  font-semibold text-orange-500 ">
        <button
          className={`md:w-[150px] w-[100px] p-3 ${!signIn ? " bg-white" : ""}`}
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
          onClick={() => {
            setAdmin(false);
            setSignIn(false);
          }}
        >
          Log In
        </button>
        <button
          className={`md:w-[150px] w-[100px] p-3 ${signIn ? " bg-white" : ""}`}
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>
      </div>
      <div
        className="p-4 bg-white"
        style={{
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          ...(signIn ? { borderTopLeftRadius: "20px" } : {}),
        }}
      >
        <div className="flex flex-col justify-center">
          {signIn && (
            <div className="">
              <div className="flex gap-4 sm:h-[50px] h-[45px]">
                <button
                  className={`flex-1 sm:text-xl text-md font-medium text-orange-500 hover:text-white hover:bg-orange-300 rounded-lg duration-100 ${
                    !admin ? "bg-orange-300 text-white" : ""
                  }`}
                  onClick={() => setAdmin(false)}
                >
                  Regular
                </button>
                <button
                  className={`flex-1 sm:text-xl text-md font-medium text-orange-500 hover:text-white hover:bg-orange-300 rounded-lg duration-100 ${
                    admin ? "bg-orange-300 text-white" : ""
                  }`}
                  onClick={() => setAdmin(true)}
                >
                  Admin
                </button>
              </div>
              <div className="bg-orange-300 h-[2px] m-4 w-full mx-auto"></div>
            </div>
          )}

          <section>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block sm:text-[18px] text-[16px] font-medium text-orange-500"
              >
                Email:
              </label>
              <input
                type="text"
                id="name"
                className="w-full border rounded-md py-2 px-2 font-[500] sm:text-[20px] text-[17px] text-gray-700 leading-tight focus:outline-none focus:border-orange-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {!emailErr ? null : (
                <p className="text-red-500 sm:text-[13px] text-[12px] mt-2">
                  Invalid email format (eg: abc@abc.abc)
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block sm:text-[18px] text-[16px] font-medium text-orange-500"
              >
                Password:
              </label>
              <div className="flex relative">
                <input
                  type={eye ? "text" : "password"}
                  id="name"
                  className="w-full border rounded-md py-2 pl-2 pr-12 font-[500] sm:text-[20px] text-[17px] text-gray-700 leading-tight focus:outline-none focus:border-orange-500"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <div
                  className="absolute right-0 m-2 sm:p-1 p-0 text-orange-500 bg-white text-[23px] cursor-pointer"
                  onClick={() => setEye(!eye)}
                >
                  {eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
              {!passwordErr ? null : (
                <p className="text-red-500 sm:text-[13px] text-[12px] mt-2">
                  Atleast 8 characters
                </p>
              )}
            </div>
          </section>
          <div className="bg-orange-300 h-[2px] m-4 w-full mx-auto"></div>

          {!signIn && (
            <button
              className="px-4 py-2 bg-red-400 sm:text-[16px] text-[14px] text-white font-semibold rounded-md hover:bg-red-500"
              onClick={handleLogIn}
            >
              Log In
            </button>
          )}
          {signIn && (
            <button
              className="px-4 py-2 bg-red-400 sm:text-[16px] text-[14px] text-white font-semibold rounded-md hover:bg-red-500"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
