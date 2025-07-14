import { createContext, useState, useEffect } from "react";
import "./App.scss";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { APIprovider } from "./context/APIContainer";

function App() {

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
