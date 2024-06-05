import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ControllerRenderProps, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

export interface PageFormItem {
  name: string,
  label?: string
  description?: string
  control?: (field: ControllerRenderProps) => React.ReactNode
}

interface PageFormProps {
  form: ReturnType<typeof useForm<any>>
  configList: PageFormItem[]
  onSubmit: SubmitHandler<any>
  onCancel?: () => void
}

export default function PageForm({ form, onSubmit, configList, onCancel }: PageFormProps) {
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onCancel?.()
  }

  return (
    <Form {...form}>
      <ScrollArea className="h-[calc(100vh-75px)] pr-4">
        <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4 mt-4 mx-1">
          {
            configList.map(config => (
              <FormField
                key={ config.name }
                control={ form.control }
                name={ config.name }
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>{ config.label }</FormLabel>
                    <FormControl>
                      { config.control?.(field) }
                    </FormControl>
                    <FormDescription>
                      { config.description }
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                ) }
              />
            ))
          }
          <Button type="submit">Submit</Button>
          <Button variant="secondary" className="ml-4" onClick={handleCancel}>Cancel</Button>
        </form>
      </ScrollArea>
    </Form>
  )
}