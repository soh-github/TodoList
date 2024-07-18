import { useState, useRef } from "react";
import ListItems, { Todo } from "./components/ListItems";

export type handleItemFunc = (id: number) => void;
export type updateItemFunc = (id: number, name: string) => void;

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ActiveTab, setActiveTab] = useState<number>(0);
  const [MyTodos, setMyTodos] = useState<Todo[]>([
    {id:1, name: '数学', isDone: false, isDeleted: false},
    {id:2, name: '英語', isDone: false, isDeleted: false},
    {id:3, name: '国語', isDone: false, isDeleted: false},
    {id:4, name: '理科', isDone: false, isDeleted: false},
  ])

  const AddTodo = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    const newTodo = {
      id: MyTodos[MyTodos.length-1].id+1,
      name: inputRef.current.value,
      isDone: false,
      isDeleted: false
    };
    setMyTodos([...MyTodos, newTodo]);
    inputRef.current.value = '';
  }

  const DoneItem = (id: number) => {
    setMyTodos((prev) => {
      const update = prev.map(todo => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      })
      return update
    })
  }

  const DeleteItem = (id: number) => {
    setMyTodos((prev) => {
      const update = prev.map(todo => {
        return todo.id === id ? { ...todo, isDeleted: !todo.isDeleted } : todo
      })
      return update
    })
  }

  const UpdateItem = (id: number, name: string) => {
    setMyTodos((prev) => {
      const update = prev.map(todo => {
        return todo.id === id ? { ...todo, name: name } : todo
      })
      return update
    })
  }

  return (
    <>
    <section className="border-b w-full p-1 font-bold text-lg text-gray-8">
      <div>My Todo App</div>
    </section>
    <section className="flex h-3xl text-gray-8">
      <section className="w-1/3 border-r p-1">
        <ul>
          <li 
            className={`p-1 font-bold border-b border-white  + ${ActiveTab===0 ? "bg-gray-2" : ""}`} 
            onClick={() => setActiveTab(0)}
          >Todo</li>
          <li 
            className={`p-1 font-bold border-b border-white  + ${ActiveTab===1 ? "bg-gray-2" : ""}`} 
            onClick={() => setActiveTab(1)}
          >Done</li>
          <li 
            className={`p-1 font-bold border-b border-white  + ${ActiveTab===2 ? "bg-gray-2" : ""}`} 
            onClick={() => setActiveTab(2)}
          >Deleted</li>
        </ul>
      </section>
      <section className="w-2/3">
        <div className="p-1 flex">
          <input ref={inputRef} type="text" className="w-1/2 p-1 border" placeholder="Add New Todo"/>
          <button className="ml-1 my-auto i-mdi-add-box text-gray-8" onClick={()=>AddTodo()}></button>
        </div>
        <div className="mx-3">
          <h2 className="text-lg font-bold border-b border-gray-8">List</h2>
          <div className="w-full">
            <ListItems todos={MyTodos} doneItem={DoneItem} deleteItem={DeleteItem} updateItem={UpdateItem}></ListItems>
          </div>
        </div>
      </section>
    </section>
    </>
  );
}

export default App;