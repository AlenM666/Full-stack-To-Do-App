import { useEffect, useState } from 'react'
import { remult} from 'remult'
import { Task } from './shared/task.ts'
import './App.css'

const taskRepo = remult.repo(Task);

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const addTask = async (e: FormEvent) => {
    e.preventDefault()
    try {
      // const newTask = await taskRepo.insert({ title: newTaskTitle })
      // setTasks([...tasks, newTask])
      await taskRepo.insert({title: newTaskTitle})
      setNewTaskTitle("")
    } catch (error: unknown) {
      alert((error as { message: string }).message)
    }
  }

  useEffect(() => {
    return taskRepo.liveQuery({limit: 20,
      orderBy: { createdAt: "asc" }
    }).subscribe(info => setTasks(info.applyChanges))
    // taskRepo.find().then(setTasks)
  }, [])
  return (
    <div>
      <h1>Todos</h1>
      <main>
        {/* za dodajanje novih taskov */}
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={e => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>

        {tasks.map((task) => {
          const setTask = (value: Task) => setTasks(tasks => tasks.map(t => (t === task ? value : t)))
          const setCompleted = async (completed: boolean) => await taskRepo.save({ ...task, completed })
            // setTask(await taskRepo.save({ ...task, completed }))
            
          const setTitle = (title: string) => setTask({ ...task, title })

          const saveTask = async () => {
            try {
              // setTask(await taskRepo.save(task))
              await taskRepo.save(task)
            } catch (error: unknown) {
              alert((error as { message: string }).message)
            }
          }

          const deleteTask = async () => {
            try{
              await taskRepo.delete(task)
              // setTasks(tasks.filter(t => t !== task))
            }catch (error: unknown){
              alert((error as {message: string}).message)

            }
          }


          return (
            <div key={task.id}>
              <input type="checkbox" checked={task.completed} onChange={e => setCompleted(e.target.checked)} />
              <input value={task.title} onChange={e => setTitle(e.target.value)} />
              <button onClick={saveTask}>Save</button>
              <button onClick={deleteTask}>Delete</button>

            </div>
          )
        })}
      </main>
    </div>
  )
  
}

export default App
