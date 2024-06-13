import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function usePageForm<T extends z.AnyZodObject>(formSchema: T) {
  const defaultValues = Object.fromEntries(
    Object.entries(formSchema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()]
      return [key, '']
    })
  ) as any
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })
  return {
    form,
    formReset(values?: any) {
      form.reset(values || defaultValues)
    }
  }
}
