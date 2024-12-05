import { Entity, Fields } from "remult";


@Entity('tasks', {
  allowApiCrud: true,
})
export class Task {
  @Fields.cuid()
  id=''


  @Fields.string<Task>({
  validate: (task) => {
    if (task.title.length < 2) throw "Too Short"
    if (task.title.length > 25) throw "Too long"
  }
  })
  title = ''

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}

