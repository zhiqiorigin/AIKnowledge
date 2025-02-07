import { useState } from 'react';
import styles from './TodoList.module.scss';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  // 添加任务
  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputText.trim(), completed: false }]);
      setInputText('');
    }
  };

  // 删除任务
  const deleteTodo = (id: number) => {
    const confirmDelete = window.confirm('你确定要删除这个任务吗？');
    if (confirmDelete) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // 更新任务完成状态
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 开始拖拽
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  // 允许放置
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  // 放置元素
  const handleDrop = (index: number) => {
    if (draggedItemIndex !== null && draggedItemIndex !== index) {
      const newTodos = [...todos];
      const [movedTodo] = newTodos.splice(draggedItemIndex, 1);
      newTodos.splice(index, 0, movedTodo);
      setTodos(newTodos);
    }
    setDraggedItemIndex(null);
  };

  // 双击编辑任务
  const handleDoubleClick = (id: number) => {
    const editableSpan = document.querySelector(`span[data-id="${id}"]`);
    if (editableSpan) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'editableInput';
      input.value = editableSpan.textContent || '';
      input.addEventListener('blur', () => saveEdit(id, input));
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveEdit(id, input);
        }
      });
      editableSpan.replaceWith(input);
      input.focus();
    }
  };

  // 保存编辑
  const saveEdit = (id: number, input: HTMLInputElement) => {
    const newText = input.value.trim();
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    const span = document.createElement('span');
    span.setAttribute('data-id', id.toString());
    span.textContent = newText;
    span.addEventListener('dblclick', () => handleDoubleClick(id));
    input.replaceWith(span);
  };

  return (
    <div className={styles.todoList}>
      <h1><i className="iconfont">&#xe6e9;</i>任务清单</h1>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入新任务..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>添加</button>
      </div>

      <ul className={styles.todos}>
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDoubleClick={() => handleDoubleClick(todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span data-id={todo.id}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}



