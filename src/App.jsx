import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await axios.get("http://localhost:1337/api/todos");
      setTodoList(response.data.data);
      console.log(response.data.data);
    };
    fetchTodo();
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await axios.post("http://localhost:1337/api/todos", {
        data: {
          description: todo,
        },
      });
      console.log(response.data);
      setTodoList([...todoList, response.data.data]);
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/api/todos/${id}`
      );
      console.log(response.data);
  
      // Remove the deleted todo from the state
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdate = () => {
    
  }
  
  return (
    <>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.attributes.description}{" "}
              <button >Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
