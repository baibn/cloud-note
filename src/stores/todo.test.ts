import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from './todo'

beforeEach(() => setActivePinia(createPinia()))

describe('TodoStore', () => {
  it('adds todo', () => {
    const store = useTodoStore()
    store.add('test')
    expect(store.list).toHaveLength(1)
    expect(store.list[0].text).toBe('test')
  })
})
