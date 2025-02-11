import axios from "axios";
import React, { useEffect, useState } from "react";
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
    todo: "bg-blue-500",
    in_progress: "bg-yellow-500",
    done: "bg-green-500",
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
      <p className="text-sm text-gray-500 mt-1">Assigned to: {task?.user?.firstName} {task?.user?.LastName}</p>
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

const TaskBoard = ({ projectId }) => {
  const statuses = ["todo", "in_progress", "done"];
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/tasks/project/${projectId}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  const handleTaskDrop = async (idTask, newStatus) => {
    try {
      // Optimistic UI update
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.idTask === idTask ? { ...task, status: newStatus } : task
        )
      );

      // Update the task in the backend
      await axios.put(`http://localhost:9090/tasks/${idTask}/status`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating task status:", error);

      // Rollback UI update if API call fails
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.idTask === idTask ? { ...task, status: task.status } : task
        )
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau des tâches</h1>
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
