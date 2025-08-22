<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore()
const newText = ref('')

onMounted(store.load)

async function onAdd() {
  if (!newText.value.trim()) return
  await store.add(newText.value.trim())
  newText.value = ''
}
</script>

<template>
  <el-input
    v-model="newText"
    placeholder="输入回车添加"
    @keyup.enter="onAdd"
    style="width: 300px"
  />
  <el-button type="primary" @click="onAdd">添加</el-button>

  <el-table
    :data="store.list"
    v-loading="store.loading"
    style="margin-top: 16px"
  >
    <el-table-column label="完成" width="60">
      <template #default="{ row }">
        <el-checkbox :model-value="row.done" @change="store.toggle(row.id)" />
      </template>
    </el-table-column>
    <el-table-column prop="text" label="内容" />
    <el-table-column label="操作" width="80">
      <template #default="{ row }">
        <el-button type="danger" size="small" @click="store.remove(row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
