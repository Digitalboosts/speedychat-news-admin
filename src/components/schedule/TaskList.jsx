import React from "react";
import Scheduler from "./Scheduler";

const TaskList = () => {
  const tasks = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" },
  ];

  const handleScheduleComplete = (taskId) => {
    console.log(`Task ${taskId} completed!`);
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{task.name}</h3>
          <Scheduler taskId={task.id} onScheduleComplete={handleScheduleComplete} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
