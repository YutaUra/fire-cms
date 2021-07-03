import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'

export interface Disclosure {
  onFalse: () => void
  onToggle: () => void
  onTrue: () => void
}

export const useDisclosure = (
  setValue: Dispatch<SetStateAction<boolean>>,
): Disclosure => {
  const onTrue = useCallback(() => {
    setValue(true)
  }, [setValue])
  const onFalse = useCallback(() => {
    setValue(false)
  }, [setValue])
  const onToggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [setValue])

  return {
    onFalse,
    onToggle,
    onTrue,
  }
}

export const createDisclosure =
  (useSetValue: () => Dispatch<SetStateAction<boolean>>) => (): Disclosure => {
    const setValue = useSetValue()
    const disclosure = useDisclosure(setValue)
    return disclosure
  }
