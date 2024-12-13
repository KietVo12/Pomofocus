import React, { useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import './App.css'
const PomodoroApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("Pomodoro");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const addTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  return (
    <div
      className="pomodoro-app"
   
    >
      <Header />
      <Timer currentTab={currentTab} onTabChange={handleTabChange} />
      <TaskList tasks={tasks} onAddTask={addTask} />
    </div>
  );
};

export default PomodoroApp;
