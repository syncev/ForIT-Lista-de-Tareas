import React, { useState, useContext, createContext } from "react";
import TaskForm from "./TaskForm";

import Complete from "../assets/complete.png";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
// import {APIprovider} from "../context/APIContainer"
import { APIcontext } from "../context/APIContainer";
const TaskItem = ({ task }) => {
  const [edit, setEdit] = useState(false);

  //trae de contexto la funcion remover que hace llamada DELETE y la que hace PUT para completar tarea
  const { removeTask, finishTask } = useContext(APIcontext);


  //cambia el estado de editable de una tarea, la llamada  de la funcion que hace PUT se hace en el formulario de tarea
  const editHandle = () => {
    setEdit(!edit);
  };

  const completHandle = (task) => {
    task.completed = !task.completed;
    finishTask(task)
    
  };

  return (
    <>
      {/*si editar esta habilitado se muestra el formulario de edicion y le pasa la tarea, sino se muestra la tarea y el titulo fijo*/}
      {edit ? (
        <TaskForm task={task} editHandle={editHandle}  />
      ) : (
        <div className={`taskWrapper ${task.completed ? "taskCompleted" : ""}`} >
          <h3 className="taskTitle">{task.title}</h3>
          <p className="taskDescription">{task.description}</p>
        </div>
      )}

      <div className="btnsWrapper">
        <button onClick={() => completHandle(task)}>
          <img src={Complete} alt="" />
        </button>
        <button onClick={editHandle}>
          <img src={Edit} alt="" />
        </button>
        <button onClick={() => removeTask(task)}>
          <img src={Delete} alt="" />
        </button>
      </div>
    </>
  );
};

export default TaskItem;
