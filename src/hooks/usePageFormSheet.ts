import { useState } from 'react'

export default function usePageFormSheet() {
  const [open, setOpen] = useState(false)
  const [sheetType, setSheetType] = useState<1 | 2>(1)

  return {
    open,
    sheetType,
    onOpenChange: setOpen,
    onChangeSheetType: setSheetType,
    onOpenByOne: () => {
      setSheetType(1)
      setOpen(true)
    },
    onOpenByTwo: () => {
      setSheetType(2)
      setOpen(true)
    }
  }
}