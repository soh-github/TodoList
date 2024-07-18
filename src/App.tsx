import { useState, useRef } from "react";
import ListItems, { Todo } from "./components/ListItems";
import DoneItems from "./components/DoneItems";
import DeletedItems from "./components/DeletedItems";

export type handleItemFunc = (id: number) => void;
export type updateItemFunc = (id: number, name: string) => void;

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ActiveTab, setActiveTab] = useState<number>(0);
  const [MyTodos, setMyTodos] = useState<Todo[]>([
    {id:1, name: '英語', isDone: false, isDeleted: false},
    {id:2, name: '数学', isDone: false, isDeleted: false},
    {id:3, name: '国語', isDone: false, isDeleted: false},
    {id:4, name: '理科', isDone: false, isDeleted: false},
    {id:5, name: '社会', isDone: false, isDeleted: false},
    {id:6, name: '算数', isDone: true, isDeleted: false},
    {id:7, name: '道徳', isDone: true, isDeleted: false},
    {id:8, name: '倫理', isDone: true, isDeleted: true},
    {id:9, name: 'ドイツ語', isDone: false, isDeleted: true},
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

  const ShownList = () => {
    if (ActiveTab === 0) {
      return <ListItems todos={MyTodos} doneItem={DoneItem} deleteItem={DeleteItem} updateItem={UpdateItem}></ListItems>
    } else if (ActiveTab === 1) {
      return <DoneItems todos={MyTodos} doneItem={DoneItem} deleteItem={DeleteItem} updateItem={UpdateItem}></DoneItems>
    } else if (ActiveTab === 2) {
      return <DeletedItems todos={MyTodos} doneItem={DoneItem} deleteItem={DeleteItem} updateItem={UpdateItem}></DeletedItems>
    } 
  }

  return (
    <>
    <section className="border-b w-full px-2 py-1 font-bold text-lg text-gray-8">
      <div>My Todo App</div>
    </section>
    <section className="flex h-[calc(100vh-2em)] text-gray-8">
      <section className="w-1/3 border-r p-1">
        <ul>
          <li 
            className={`p-1 font-bold border-b border-white flex ${ActiveTab===0 ? "bg-gray-2" : ""}`} 
            onClick={() => setActiveTab(0)}
          >
            <div className="i-mdi-format-list-bulleted my-auto mr-1 "></div>
            Todo
          </li>
          <li 
            className={`p-1 font-bold border-b border-white flex ${ActiveTab===1 ? "bg-gray-2" : ""}`} 
            onClick={() => setActiveTab(1)}
          >
            <div className="i-mdi-check-circle-outline my-auto mr-1 "></div>
            Done
          </li>
          <li 
            className={`p-1 font-bold border-b border-white flex ${ActiveTab===2 ? "bg-gray-2" : ""}`} 
            onClick={() => setActiveTab(2)}
          >
            <div className="i-mdi-delete-outline my-auto mr-1 "></div>
            Deleted
          </li>
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
            <ShownList></ShownList>
          </div>
        </div>
      </section>
    </section>
    </>
  );
}

export default App;