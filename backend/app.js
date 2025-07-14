const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

let tasks = [
 
];

class Task {
  constructor(id, title, description) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.completed = false),
      (this.createdAt = new Date());
  }

  completeTask() {
    this.completed = !this.completed;
  }

  updateTask(title, description, completed) {
    (this.title = title), (this.description = description), (this.completed = completed);
  }
}

//obtener lista
app.get("/api/tasks", (req, res) => {
  //devuelve la lista de tareas
  res.send(tasks);
});

//crear tareas nuevas
app.post("/api/tasks", (req, res) => {
  const reqData = req.body;
  if(!reqData.title){
    return res.status(400).send("El titulo de tarea no puede estar vacio");
  }

  //creo un id en base al ultimo id de la lista
  let latestId
  if(tasks.length === 0 ){
    latestId = 0
  } else{
    latestId = tasks[tasks.length - 1].id;
    latestId++
  }

  //creo la nueva tarea como instancia de la clase
  const newTask = new Task(latestId , reqData.title, reqData.description);

  //la pusheo al rray de tareas
  tasks.push(newTask);

  //retorno 201 porque la taea fue creada con exito
  res.status(201).send("Tarea creada correctamente");
});

//actualizar tareas creadas
app.put("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const reqData = req.body;
  const title = reqData.title;
  const description = reqData.description;
  const completed = reqData.completed;

  //buscar la tarea por id
  const foundTask = tasks.find((task) => task.id === taskId);

  //si la ID no es encontrada se devuelve el error 404
  if (!foundTask || !title) {
    return res.status(404).json({
        error: "tarea no encontrada o titulo de tarea vacio",
    });
  }

  // if(foundTask.completed != reqData.completed){

  //   foundTask.completeTask()

  //   // return res.status(204).send("Tarea completada")
  // }

  //Si todo va bien, se actualiza la tarea correspondiendte con los valores del body
  foundTask.updateTask(title, description, completed);

  //use 204 porque es realizado con exito pero no hay contenido para devolver al cliente
  res.status(204).send("Tarea actualizada correctamente");


   
});

//borrar tareas
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const tasksInitialLength = tasks.length;

  //filtra la lista para eliminar la tarea con el ID mandado
  tasks = tasks.filter((task) => task.id !== taskId);

  //si la ID es correcto y se borro la tarea, la lista deberia ser mas chica que la original asi que se retorna 204, si no se borro nada se retorna 404
  if (tasks.length < tasksInitialLength) {
    return res.status(204).send("Tarea eliminada correctamente");
  } else {
    return res.status(404).send("No se encontro tarea con ese ID");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
