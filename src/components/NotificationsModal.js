import React, { useState } from "react";
import axios from "axios";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

function NotificationsModal({ setIsNotificationOpen, setNewNotification }) {
  const base_url = process.env.REACT_APP_BACKEND_URL;

  const notifications = useSelector((state) => state.notificationReducer);

  setNewNotification(false);

  return (
    <main>
      <div className="fixed inset-0 flex justify-center items-center z-50 ">
        <div
          className="fixed inset-0 bg-gray-600 backdrop-blur-2xl opacity-40"
          onClick={() => setIsNotificationOpen(false)}
        ></div>
        <div className="bg-white sm:w-[80%] w-[95%] max-w-screen-md p-4 rounded-lg shadow-lg relative">
          <header>
            <div className="flex items-center justify-between mb-2">
              <h2 className="md:text-xl sm:text-lg text-md font-semibold mb-1">
                Notifications
              </h2>
              <button
                className="sm:px-4 px-3 sm:py-2 py-1 bg-red-400 sm:text-[16px] text-[14px] text-white rounded-md hover:bg-red-500"
                onClick={(e) => setIsNotificationOpen(false)}
              >
                Cancel
              </button>
            </div>
            <div className="bg-orange-300 h-[3px] mb-4"></div>
          </header>
          <form>
            <section>
              <div className="mt-3 sm:ml-4 sm:mt-0 text-left">
                {notifications.map((item) => (
                  <div key={item} className="">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </form>
        </div>
      </div>
    </main>
  );
}

export default NotificationsModal;
