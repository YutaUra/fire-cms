import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'

export type getIndex<T> = (prev: T[]) => number

export interface UseArray<T> {
  appendElm: (value: T) => void
  deleteElm: (getIndex: getIndex<T>) => void
  deleteElmByIndex: (idx: number) => void
  insertElm: (value: T, getIndex: getIndex<T>) => void
  insertElmByIndex: (value: T, idx: number) => void
  prependElm: (value: T) => void
  set: (value: T[]) => void
  updateElm: (value: T, getIndex: getIndex<T>) => void
  updateElmByIndex: (value: T, idx: number) => void
}

export const useArray = <T>(
  setValue: Dispatch<SetStateAction<T[]>>,
): UseArray<T> => {
  const set = useCallback<UseArray<T>['set']>(
    (value) => {
      setValue(value)
    },
    [setValue],
  )
  const appendElm = useCallback<UseArray<T>['appendElm']>(
    (value) => {
      setValue((prev) => [...prev, value])
    },
    [setValue],
  )

  const prependElm = useCallback<UseArray<T>['prependElm']>(
    (value) => {
      setValue((prev) => [value, ...prev])
    },
    [setValue],
  )

  const insertElm = useCallback<UseArray<T>['insertElm']>(
    (value, getIdx) => {
      setValue((prev) => {
        const idx = getIdx(prev)
        return [...prev.slice(0, idx), value, ...prev.slice(idx)]
      })
    },
    [setValue],
  )

  const insertElmByIndex = useCallback<UseArray<T>['insertElmByIndex']>(
    (value, idx) => {
      setValue((prev) => [...prev.slice(0, idx), value, ...prev.slice(idx)])
    },
    [setValue],
  )

  const updateElm = useCallback<UseArray<T>['updateElm']>(
    (value, getIdx) => {
      setValue((prev) => {
        const idx = getIdx(prev)
        return [...prev.slice(0, idx), value, ...prev.slice(idx + 1)]
      })
    },
    [setValue],
  )

  const updateElmByIndex = useCallback<UseArray<T>['updateElmByIndex']>(
    (value, idx) => {
      setValue((prev) => [...prev.slice(0, idx), value, ...prev.slice(idx + 1)])
    },
    [setValue],
  )

  const deleteElm = useCallback<UseArray<T>['deleteElm']>(
    (getIdx) => {
      setValue((prev) => {
        const idx = getIdx(prev)
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
      })
    },
    [setValue],
  )

  const deleteElmByIndex = useCallback<UseArray<T>['deleteElmByIndex']>(
    (idx) => {
      setValue((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)])
    },
    [setValue],
  )

  return {
    appendElm,
    deleteElm,
    deleteElmByIndex,
    insertElm,
    insertElmByIndex,
    prependElm,
    set,
    updateElm,
    updateElmByIndex,
  }
}
