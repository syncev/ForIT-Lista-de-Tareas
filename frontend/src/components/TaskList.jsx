import React, { use, useState, useEffect, useContext } from "react";
import "../style/TaskList.scss";
import { APIcontext } from "../context/APIContainer";

import TaskItem from "./TaskItem";

const TaskList = ({}) => {
  //trae de contexto la funcion que hace GET de la lista
  const { taskList } = useContext(APIcontext);

  return (
    <div className="taskListWrapper">
      <h2 className="taskListTitle">Tasks List</h2>
      <ul>
        {/* itera la lista renderizando cada tarea y pasandole la tarea al componente hijo */}
        {taskList.map((task) => {
          return (
            <li key={task.id} className="taskContainer">
              <TaskItem task={task} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
