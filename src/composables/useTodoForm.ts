import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  text: yup.string().required('请输入内容').max(10, '最多100字'),
})

export function useTodoForm() {
  const { handleSubmit, resetForm } = useForm({ validationSchema: schema })
  const { value: text, errorMessage } = useField<string>('text')

  return { text, errorMessage, handleSubmit, resetForm }
}
