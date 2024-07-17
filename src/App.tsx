import { useState, useRef } from "react";

interface Todo {
  id: number,
  name: string,
  isDone: boolean
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, name: "pythonレポート", isDone: false },
    { id: 2, name: "数学レポート", isDone: false },
    { id: 3, name: "ゼミ周辺分野調査", isDone: false },
    { id: 4, name: "実践知財管理レポート", isDone: false },
    { id: 5, name: "科学ジャーナリズムレポート", isDone: false },
  ]);

  const addTodo = () => {
    if (!inputRef.current) return;
    const newTodo = {
      id: todos[todos.length - 1].id + 1,
      name: inputRef.current.value,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.isDone = true;
        }
        return todo;
      })
    );
  };

  return (
    <div className="text-center">
      <h1 className="font-bold">
        Hello UnoCSS
        <i className="i-mdi-heart inline-block text-pink-6"></i>
      </h1>
      <section className="w-lg py-8 mx-auto bg-blue">
        <input type="text" ref={inputRef} />
        <button
          className="text-white i-mdi-add border-white"
          onClick={addTodo}
        />
      </section>
      <section className="w-lg mx-auto">
        <ul className="text-left">
          {todos.map((todo) => {
            return (
              !todo.isDone && (
                <li key={todo.id} className="border-b">
                  <button
                    className="i-mdi-check-box-outline mr-1"
                    onClick={() => deleteTodo(todo.id)}
                  ></button>
                  {todo.name}
                </li>
              )
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;