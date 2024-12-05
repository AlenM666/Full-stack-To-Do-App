import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/task.ts";



export const api = remultExpress({
  //tasks POST iz curla http://localhost:3002/api/tasks
  entities: [Task],


  //za admin -> http://localhost:5173/api/admin/tasks
  admin: true,
});
