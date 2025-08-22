import { defineStore } from 'pinia'
import { todoApi } from '@/api/todo'
import type { Todo } from '@/types/todo'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const list = ref<Todo[]>([])
  const loading = ref(false)

  const load = async () => {
    loading.value = true
    const { data } = await todoApi.getAll()
    list.value = data
    loading.value = false
  }

  const add = async (text: string) => {
    const { data } = await todoApi.create({ text, done: false })
    list.value.unshift(data)
  }

  const toggle = async (id: number) => {
    const todo = list.value.find((t) => t.id === id)!
    await todoApi.update(id, { done: !todo.done })
    todo.done = !todo.done
  }

  const remove = async (id: number) => {
    await todoApi.delete(id)
    list.value = list.value.filter((t) => t.id !== id)
  }

  return { list, loading, load, add, toggle, remove }
})
