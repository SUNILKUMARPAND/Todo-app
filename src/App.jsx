import { useState } from 'react';

export default function App(){
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  function handleSubmit(e){
     e.preventDefault();
     if(isEditing) {
        setTodos(todos.map((todo, index) => index === currentTodo ? input : todo));
        setIsEditing(false);
     } else if (input.trim()) {
        setTodos([...todos, input]);
     } else {
        setInput(""); 
     }
  };
  function handleEditTodo(index) {
     setInput(todos[index]);
     setCurrentTodo(index);
     setIsEditing(true);
  };
  function handleDeleteTodo(index) {
    setTodos(todos.filter((e, i) => i !== index));
    if(isEditing && index === currentTodo) {
        setInput("");
        setIsEditing(false);
    }
  };
  return (
    <div className="App">
      <h2>Todo App</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setInput(e.target.value)}
          placeholder='Enter Todo' value={input} />
        <button type="submit">{isEditing ? "UpdateTodo" : "AddTodo"}</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}
             <button onClick={() => handleEditTodo(index)}>Edit</button>
             <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}