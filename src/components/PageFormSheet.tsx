import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import PageForm, { PageFormProps } from '@/src/components/PageForm'

interface PageFormSheetProps extends PageFormProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  sheetType?: 1 | 2
  buttonText?: string
  sheetTypeText?: [string, string]
  onButtonClick?: () => void
}

export default function PageFormSheet(props: PageFormSheetProps) {
  const {
    open,
    onOpenChange,
    sheetType,
    sheetTypeText = ['新增', '编辑'],
    buttonText = '新增',
    onSubmit,
    form,
    configList,
    onCancel,
    onButtonClick
  } = props

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onOpenChange?.(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {sheetTypeText ? sheetTypeText[sheetType ? sheetType - 1 : 0] : ''}
          </SheetTitle>
        </SheetHeader>
        <div>
          <PageForm
            onSubmit={onSubmit}
            form={form}
            configList={configList}
            onCancel={handleCancel}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
