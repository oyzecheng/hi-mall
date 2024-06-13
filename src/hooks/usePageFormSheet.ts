import { useState } from 'react'

export default function usePageFormSheet() {
  const [open, setOpen] = useState(false)
  const [sheetType, setSheetType] = useState<1 | 2>(1)
  const [record, setRecord] = useState<any>(null)

  return {
    open,
    sheetType,
    record,
    onOpenChange: setOpen,
    onChangeSheetType: setSheetType,
    onOpenByOne: () => {
      setSheetType(1)
      setOpen(true)
    },
    onOpenByTwo: (record?: any) => {
      setRecord(record)
      setSheetType(2)
      setOpen(true)
    }
  }
}
