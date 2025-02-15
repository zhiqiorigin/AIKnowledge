import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TodoList.module.scss';
import { TodoType } from '@/types/todo';
import { createTodoAPI, getTodoListAPI, updateTodoAPI, deleteTodoAPI } from '@/api/todo';

export default function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [inputText, setInputText] = useState('');
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 检查登录状态
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTodos();
  }, [navigate]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodoListAPI();
      // 确保返回的数据是数组且每个项都有必要的属性
      setTodos(Array.isArray(response) ? response : []);
    } catch (error: any) {
      console.error('获取任务列表失败:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  // 添加加载状态的处理
  if (loading) {
    return <div>加载中...</div>;
  }

  // 添加任务
  const addTodo = async () => {
    if (!inputText.trim()) {
      return;
    }

    try {
      const todoData = {
        title: inputText.trim(),
        content: inputText.trim(),
        completed: false
      };
      
      const response = await createTodoAPI(todoData);
      setTodos([...todos, response.data]); // 使用 response.data 访问实际的 todo 数据
      setInputText(''); // 清空输入
    } catch (error) {
      console.error('添加任务失败:', error);
    }
  };

  // 删除任务
  const deleteTodo = async (id: number) => {
    const confirmDelete = window.confirm('你确定要删除这个任务吗？');
    if (confirmDelete) {
      try {
        await deleteTodoAPI(id);
        setTodos(todos.filter(todo => todo.todo_id !== id));
      } catch (error) {
        console.error('删除任务失败:', error);
      }
    }
  };

  // 更新任务完成状态
  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.todo_id === id);
      if (todo) {
        const response = await updateTodoAPI(id, { completed: !todo.completed });
        setTodos(todos.map(todo =>
          todo.todo_id === id ? response.data : todo
        ));
      }
    } catch (error) {
      console.error('更新任务状态失败:', error);
    }
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
  const saveEdit = async (id: number, input: HTMLInputElement) => {
    const newText = input.value.trim();
    try {
      const response = await updateTodoAPI(id, { 
        title: newText,
        content: newText 
      });
      
      // 检查响应数据
      if (response && response.data) {
        setTodos(todos.map(todo =>
          todo.todo_id === id ? response.data : todo
        ));
      }

      // 无论响应如何，都更新 UI
      const span = document.createElement('span');
      span.setAttribute('data-id', id.toString());
      span.textContent = newText;
      span.addEventListener('dblclick', () => handleDoubleClick(id));
      input.replaceWith(span);
    } catch (error) {
      console.error('更新任务文本失败:', error);
      // 发生错误时也要恢复 UI
      const span = document.createElement('span');
      span.setAttribute('data-id', id.toString());
      span.textContent = newText;
      span.addEventListener('dblclick', () => handleDoubleClick(id));
      input.replaceWith(span);
    }
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

      {loading ? (
        <div>加载中...</div>
      ) : !todos || todos.length === 0 ? (
        <div>暂无待办事项</div>
      ) : (
        <ul className={styles.todos}>
          {todos.filter(Boolean).map((todo, index) => (
            <li
              key={todo.todo_id}
              className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              onDoubleClick={() => handleDoubleClick(todo.todo_id!)}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.todo_id!)}
              />
              <span data-id={todo.todo_id!}>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.todo_id!)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



