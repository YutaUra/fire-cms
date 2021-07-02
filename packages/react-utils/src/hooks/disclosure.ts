import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'

export const createDisclosure =
  (useSetValue: () => Dispatch<SetStateAction<boolean>>) =>
  (): {
    onClose: () => void
    onOpen: () => void
    onToggle: () => void
  } => {
    const setValue = useSetValue()
    const onClose = useCallback(() => {
      setValue(false)
    }, [setValue])
    const onOpen = useCallback(() => {
      setValue(true)
    }, [setValue])
    const onToggle = useCallback(() => {
      setValue((prev) => !prev)
    }, [setValue])
    return {
      onClose,
      onOpen,
      onToggle,
    }
  }
