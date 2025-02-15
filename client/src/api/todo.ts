import http from '@/utils/http';
import { TodoType } from '@/types/todo';

// API接口路径配置
const api = {
    create: '/todos',
    list: '/todos/list',
    update: (id: number) => `/todos/${id}`,
    delete: (id: number) => `/todos/${id}`,
};

/**
 * @description: 创建待办事项
 * @param {TodoType} data 待办事项数据
 * @return 创建的待办事项
 */
export function createTodoAPI(data: TodoType) {
    return http.post<TodoType>(api.create, data);
}

/**
 * @description: 获取所有待办事项列表
 * @return 待办事项列表
 */
export function getTodoListAPI() {
    return http.get<TodoType[]>(api.list);
}

/**
 * @description: 更新待办事项
 * @param {number} id 待办事项ID
 * @param {Partial<TodoType>} data 更新的数据
 * @return 更新后的待办事项
 */
export function updateTodoAPI(id: number, data: Partial<TodoType>) {
    return http.patch<TodoType>(api.update(id), data);
}

/**
 * @description: 删除待办事项
 * @param {number} id 待办事项ID
 */
export function deleteTodoAPI(id: number) {
    return http.remove(api.delete(id));
}