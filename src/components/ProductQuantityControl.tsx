import { Icon } from '@iconify/react'
import { twMerge } from 'tailwind-merge'

interface ProductQuantityControlProps {
  value: number
  onChange?: (val: number) => void
  size?: 'default' | 'small'
}

export default function ProductQuantityControl({
  value,
  onChange,
  size = 'default'
}: ProductQuantityControlProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      <div
        className={twMerge(
          'rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition',
          size === 'small' ? 'w-6 h-6' : 'w-9 h-9'
        )}
        onClick={() => onChange?.(value - 1 <= 0 ? 1 : value - 1)}
      >
        <Icon icon="mdi:minus" />
      </div>
      <span className="w-16 text-center">{value}</span>
      <div
        className={twMerge(
          'rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition',
          size === 'small' ? 'w-6 h-6' : 'w-9 h-9'
        )}
        onClick={() => onChange?.(value + 1)}
      >
        <Icon icon="mdi:plus" />
      </div>
    </div>
  )
}
