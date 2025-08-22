import axios from 'axios'
import type { Todo } from '@/types/todo'

const api = axios.create({
  baseURL: '/api', // 后面用 Vite proxy
  timeout: 8000,
})

export const todoApi = {
  getAll: () => api.get<Todo[]>('/todos'),
  create: (data: Omit<Todo, 'id'>) => api.post<Todo>('/todos', data),
  update: (id: number, data: Partial<Todo>) =>
    api.patch<Todo>(`/todos/${id}`, data),
  delete: (id: number) => api.delete(`/todos/${id}`),
}
