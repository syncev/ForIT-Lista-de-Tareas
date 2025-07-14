import { createContext, useState, useEffect } from "react";
import "./App.scss";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { APIprovider } from "./context/APIContainer";

function App() {
  // const [taskList, setTaskList] = useState([]);
  // const url = "http://localhost:3000/api/tasks";

  // //trae la lista
  // const findList = async () => {
  //   //busca la lista
  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setTaskList(data);
  //   } catch (error) {
  //     //si algo sale mal lo imprime
  //     console.log("algo malio sal:", error);
  //   }
  // };

  // //elimina tarea
  // const removeTask = async (task) => {
  //   //intenta elminar
  //   try {
  //     const res = await fetch(url + "/" + task.id, {
  //       method: "DELETE",
  //     });

  //     //si lo elimina responde verdadero
  //     if (res.ok) {
  //       console.log("tarea eliminada");
  //       findList();
  //       return true;
  //     } else {
  //       //si no, responde falso
  //       console.log("error, tarea no encontrada", res.status);
  //       return false;
  //     }
  //   } catch (error) {
  //     //si hay otro error lo imprime aca
  //     console.log(error);
  //     return false;
  //   }
  // };

  // const createTask = async (newTask) => {
  //   //intentar mandar la tarea nueva
  //   try {
  //     const postTask = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newTask),
  //     });
  //   } catch (error) {
  //     //atajar errores
  //     console.log("algo fallo ", error);
  //   }

  //   findList();
  // };

  // const editTask = async (existingTask) => {
  //   //intentar mandar la tarea nueva
  //   console.log(existingTask);
  //   try {
  //     const updateTask = await fetch(url + "/" + existingTask.id, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(existingTask),
  //     });
  //   } catch (error) {
  //     //atajar errores
  //     console.log("algo fallo ", error);
  //   }
  //   findList();
  // };

  // //trae la lista cuando carga
  // useEffect(() => {
  //   findList();
  // }, []);

  return (
    <>
      <APIprovider>
        <div className="AppContainer">
        <TaskForm />
        <TaskList />

        </div>
      </APIprovider>
    </>
  );
}

export default App;
