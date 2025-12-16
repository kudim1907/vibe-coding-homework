import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Circle, ListTodo } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ListTodo className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Todo List</h1>
          </div>
          <p className="text-gray-400">Stay organized, get things done</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-6 border border-gray-700">
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                filter === 'active'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                filter === 'completed'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <Circle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                {filter === 'completed' ? 'No completed tasks yet' :
                 filter === 'active' ? 'No active tasks' :
                 'No tasks yet. Add one to get started!'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 border border-gray-700 hover:border-gray-600 transition-all group shadow-lg"
              >
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-500 hover:border-blue-400'
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                <span
                  className={`flex-1 text-lg transition-all ${
                    todo.completed
                      ? 'text-gray-500 line-through'
                      : 'text-white'
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 text-gray-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 text-center text-gray-500 text-sm">
            {completedCount > 0 && (
              <p>
                {completedCount} of {todos.length} tasks completed
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
