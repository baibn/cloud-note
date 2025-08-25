<script setup lang="ts">
import { useTodoForm } from '@/composables/useTodoForm'
import { useTodoStore } from '@/stores/todo'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

/* ---------- 数据 & 表单 ---------- */
const store = useTodoStore()
const { text, errorMessage, handleSubmit, resetForm } = useTodoForm()

/* ---------- 弹窗控制 ---------- */
const dialogVisible = ref(false)
const editingId = ref<number | null>(null)

/* ---------- 生命周期 ---------- */
onMounted(store.load)

/* ---------- 新建 / 编辑 ---------- */
function openNew() {
  editingId.value = null
  resetForm()
  dialogVisible.value = true
}

function openEdit(todo: { id: number; text: string }) {
  editingId.value = todo.id
  text.value = todo.text
  dialogVisible.value = true
}

const onSubmit = handleSubmit(async (values) => {
  if (editingId.value) {
    await store.update(editingId.value, values.text)
    ElMessage.success('已保存')
  } else {
    await store.add(values.text)
    ElMessage.success('已添加')
  }
  dialogVisible.value = false
})
</script>

<template>
  <el-button type="primary" @click="openNew">新建笔记</el-button>

  <el-table
    :data="store.list"
    v-loading="store.loading"
    style="width: 100%; margin-top: 16px"
  >
    <el-table-column prop="text" label="内容" />
    <el-table-column label="完成" width="80">
      <template #default="{ row }">
        <el-checkbox :model-value="row.done" @change="store.toggle(row.id)" />
      </template>
    </el-table-column>
    <el-table-column label="操作" width="160">
      <template #default="{ row }">
        <el-button size="small" @click="openEdit(row)">编辑</el-button>
        <el-button type="danger" size="small" @click="store.remove(row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="editingId ? '编辑笔记' : '新建笔记'"
    width="30%"
  >
    <el-form @submit.prevent="onSubmit">
      <el-form-item :error="errorMessage">
        <el-input v-model="text" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.el-button + .el-button {
  margin-left: 8px;
}
</style>
