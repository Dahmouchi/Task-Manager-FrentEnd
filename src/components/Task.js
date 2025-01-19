import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskCard = ({ task, handleDrop }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { idTask: task.idTask },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const statusColor = {
    TODO: "bg-blue-500",
    IN_PROGRESS: "bg-yellow-500",
    DONE: "bg-green-500",
  };
  return (
    <div
      ref={dragRef}
      className={`border rounded-lg p-4 shadow-md bg-white cursor-pointer transition-transform ${
        isDragging ? "opacity-50 scale-95" : ""
      }`}
    >
       <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <span
          className={`text-sm px-2 py-1 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-full text-white ${
            statusColor[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <p className="text-sm text-gray-500 mt-1">Assigned to: {task.user}</p>
    </div>
  );
};

const Column = ({ status, tasks, onTaskDrop }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onTaskDrop(item.idTask, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className={`flex-1 p-4 border rounded-lg bg-gray-100 ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <h2 className="text-xl font-bold text-gray-700 mb-4">{status}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.idTask} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([
    {
      idTask: 1,
      title: "Complete project setup",
      description: "Initialize repository and project structure",
      status: "TODO",
      user: "John Doe",
    },
    {
      idTask: 2,
      title: "Design UI",
      description: "Create wireframes and design prototypes",
      status: "IN_PROGRESS",
      user: "Jane Smith",
    },
    {
      idTask: 3,
      title: "Implement backend",
      description: "Develop APIs for task management",
      status: "DONE",
      user: "Alice Johnson",
    },
  ]);

  const statuses = ["TODO", "IN_PROGRESS", "DONE"];

  const handleTaskDrop = (idTask, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.idTask === idTask ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Task Board</h1>
        <div className="flex space-x-4">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              onTaskDrop={handleTaskDrop}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
