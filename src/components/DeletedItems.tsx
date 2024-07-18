import { Todo } from "./ListItems";
import { handleItemFunc, updateItemFunc } from "../App";

const DeletedItems = ({
  todos,
  doneItem,
  deleteItem,
  updateItem
} : {
  todos: Todo[],
  doneItem: handleItemFunc,
  deleteItem: handleItemFunc,
  updateItem: updateItemFunc
}) => {
  return (
    <ul>
      {todos.map((todo) => {
        return todo.isDeleted && (
          <li className={`mb-0.5 flex gap-1 px-1 border-b ${todo.isDone ? "bg-gray-1" : "bg-white"}`} key={todo.id}>
            <button className={`my-auto text-gray-8 ${todo.isDone ? "i-mdi-check-circle-outline":"i-mdi-circle-outline"}`} onClick={()=>doneItem(todo.id)}></button>
            <input type="text" value={todo.name} className={`flex-grow-1 ${todo.isDone ? "bg-gray-1" : "bg-white"}`} onChange={(e) => updateItem(todo.id, e.target.value)}></input>
            <button className="my-auto i-mdi-undo-variant" onClick={() => deleteItem(todo.id)}></button>
          </li>)
      })}
    </ul>
  )
}

export default DeletedItems;