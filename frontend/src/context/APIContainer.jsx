import React, { useContext, createContext, useEffect, useState } from "react";

export const APIcontext = createContext();

export const APIprovider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const url = "http://localhost:3000/api/tasks";

  //trae la lista
  const findList = async () => {
    //busca la lista
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTaskList(data);
    } catch (error) {
      //si algo sale mal lo imprime
      console.log("algo malio sal:", error);
    }
  };

  //elimina tarea
  const removeTask = async (task) => {
    //intenta elminar
    try {
      const res = await fetch(url + "/" + task.id, {
        method: "DELETE",
      });

      //si lo elimina responde verdadero
      if (res.ok) {
        findList();
        return true;
      } else {
        //si no, responde falso
        console.log("error, tarea no encontrada", res.status);
        return false;
      }
    } catch (error) {
      //si hay otro error lo imprime aca
      console.log(error);
      return false;
    }
  };

  const createTask = async (newTask) => {
    //intentar mandar la tarea nueva
    try {
      const postTask = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if(!postTask.ok){
        console.log("fallo al crear tarea")
      }
    } catch (error) {
      //atajar errores
      console.log("algo fallo ", error);
    }

    findList();
  };

  const editTask = async (existingTask) => {
    //intentar mandar la tarea nueva
    try {
      const updateTask = await fetch(url + "/" + existingTask.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingTask),

      });
      
     
    } catch (error) {
      //atajar errores
      console.log("error al editar tarea ", error);
    }
    findList();
  };

  const finishTask = async ( existingTask) => {
    try{
      const completeTask = await fetch(`${url}/${existingTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingTask),
      });
      if(!completeTask.ok){
        console.log("fallo al completar tarea")
      }
    } catch(error){
      console.log("fallo al completar tarea", error)
    }
    findList()
  }

  //trae la lista cuando carga
  useEffect(() => {
    findList();
  }, []);
  return (
    <APIcontext value={{ taskList, removeTask, createTask, editTask,finishTask }}>
      {children}
    </APIcontext>
  );
};
