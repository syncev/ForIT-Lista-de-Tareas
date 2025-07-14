import React, { use, useState, useContext } from "react";

import { APIcontext } from "../context/APIContainer";

const TaskForm = ({ task = "", editHandle }) => {
  const [title, setTaskTitle] = useState(task.title || "");
  const [description, setTaskDescription] = useState(task.description || "");

  const { createTask } = useContext(APIcontext);
  const { editTask } = useContext(APIcontext);
  const handleSubmit = (event) => {
    event.preventDefault();
    //si no hay tarea, crear una nueva con estados actuales, llamar a la funcion que hace el POST y limpiar estados
    if (!task) {
      const newTask = {
        title,
        description,
      };
      createTask(newTask);
      setTaskTitle("");
      setTaskDescription("");

      //si hay tarea llamar a la funcion que hace el PUT y luego togglear boton de edicion
    } else {
      const existingTask = {
        id: task.id,
        title,
        description,
      };
      editTask(existingTask);
      editHandle();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="taskFormWrapper">
        <input
          className="titleInput"
          placeholder="Titulo de la tarea"
          id="title"
          value={title}
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
        />
        <textarea
          className="descriptionInput"
          type="text"
          placeholder="Descripcion de la tarea"
          id="description"
          value={description}
          onChange={(e) => {
            setTaskDescription(e.target.value);
          }}
        />
        {/*dependiendo si hay tarea o no se muestran botones de edicion o de agregar*/}
        {task ? (
          <div>
            <button type="submit">Guardar</button>
            <button onClick={editHandle}>Cancelar</button>
          </div>
        ) : (
          <div>
            <button type="submit">Agregar Tarea</button>
          </div>
        )}
      </form>
    </>
  );
};

export default TaskForm;
