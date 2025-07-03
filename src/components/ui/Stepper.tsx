'use client'

import { useEffect, useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

type StepperProps = {
  value: number
  onChange: (value: number) => void
}

export default function Stepper({ value, onChange }: StepperProps) {
  const [localValue, setLocalValue] = useState(value.toString())
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalValue(value.toString())
  }, [value])

  const updateValue = (newVal: number) => {
    if (newVal >= 1) {
      onChange(newVal)
    }
  }

  const handleDecrement = () => {
    updateValue(value - 1)
  }

  const handleIncrement = () => {
    updateValue(value + 1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    setLocalValue(val)
    const numericVal = parseInt(val, 10)
    if (!isNaN(numericVal)) {
      onChange(numericVal)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const handleBlur = () => {
    if (localValue === '' || parseInt(localValue, 10) < 1) {
      setLocalValue('1')
      onChange(1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Botón - */}
      <button
  type="button"
  onClick={handleDecrement}
  disabled={value <= 1}
  className="w-8 h-8 flex items-center justify-center
    border border-primary/40 rounded-full text-primary
    hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed
    transition-colors"
  aria-label="Disminuir cantidad"
>
  <Minus className="w-4 h-4" />
</button>


      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={localValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-14 h-8 text-center border border-primary/30 rounded-full
          bg-background text-foreground text-xs font-medium
          focus:outline-none focus:ring-[1.5px] focus:ring-primary/30
          focus:border-primary/40 transition-colors duration-150"
      />

      {/* Botón + */}
      <button
  type="button"
  onClick={handleIncrement}
  className="w-8 h-8 flex items-center justify-center
    border border-primary/40 rounded-full text-primary
    hover:bg-primary/10 transition-colors"
  aria-label="Aumentar cantidad"
>
  <Plus className="w-4 h-4" />
</button>
    </div>
  )
}
