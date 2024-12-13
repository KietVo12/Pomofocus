import React, { useState } from "react";
import './TaskList.scss'
interface TaskListProps {
  tasks: string[];
  onAddTask: (task: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAddTask }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      onAddTask(taskInput);
      setTaskInput("");
    }
  };

  return (
    <div className="tasks">
      <h3>Tasks</h3>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>+</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
