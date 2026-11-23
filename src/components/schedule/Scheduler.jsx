import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendNotification } from "../../redux/allApiCall/action";

const Scheduler = ({ onScheduleComplete, taskId, content}) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [buttonText, setButtonText] = useState("Schedule Task");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()

  // Load persisted state on mount
  useEffect(() => {
    const savedTime = localStorage.getItem(`scheduledTime-${taskId}`);
    if (savedTime) {
      const now = new Date();
      const scheduledTime = new Date(savedTime);
      const remainingTime = Math.max((scheduledTime - now) / 1000, 0); // In seconds

      if (remainingTime > 0) {
        setCountdown(remainingTime);
        setSelectedTime(savedTime);
        setButtonText("Time Remaining");
      }
    }
  }, [taskId]);

  // Schedule the task
  const scheduleMessage = () => {
    const now = new Date();
    const scheduledTime = new Date(selectedTime);

    const timeDifference = scheduledTime - now;

    if (timeDifference <= 0) {
      alert("Please select a future time!");
      return;
    }

    setButtonText("Time Remaining");
    setIsModalOpen(false); // Close the modal

    // Save to localStorage
    localStorage.setItem(`scheduledTime-${taskId}`, selectedTime);

    // Start countdown
    setCountdown(timeDifference / 1000);

    // Execute task after countdown
    setTimeout(async() => {
      // console.log(`Hello World from Task ${taskId}`);
      // console.log("content", content)
      const data = {
        "title" : content.summary_dict.title,
        "message" : content.summary_dict.summary.split(" ").slice(0, 9).join(" ") + "...",
        "image" : content.featured_image,
        "articleId": content._id
        // "articleId": "66fe3541b6d066cda2e3a1c6"
      }
      
      const res = await dispatch(sendNotification(data))
      console.log("notification res", res)
      setButtonText("Task Completed!");
      setCountdown(null); // Reset countdown
      localStorage.removeItem(`scheduledTime-${taskId}`); // Clear saved state
      onScheduleComplete(taskId); // Notify parent
    }, timeDifference);
  };

  // Update countdown every second
  useEffect(() => {
    if (countdown === null) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, [countdown]);

  // Format time remaining in HH:MM:SS
  const formatCountdown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Open/close modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);


  

  return (
    <div style={{ margin: "10px 0" }}>
      <button
        onClick={() => {
          if (countdown === null) toggleModal();
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: countdown === null ? "blue" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {countdown !== null
          ? `${formatCountdown(countdown)}`
          : buttonText}
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <h3>Select Date and Time</h3>
          <input
            type="datetime-local"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={{ margin: "10px 0", padding: "5px" }}
          />
          <div>
            <button
              onClick={scheduleMessage}
              style={{
                padding: "5px 10px",
                marginRight: "10px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Schedule
            </button>
            <button
              onClick={toggleModal}
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
