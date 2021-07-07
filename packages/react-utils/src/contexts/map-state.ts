import type { Context, Dispatch, FC, SetStateAction } from 'react'
import { useCallback, useMemo } from 'react'
import { createUseStateContext } from './use-state'

const isFunctionalSetState = <T>(
  value: SetStateAction<T>,
): value is (prevState: T) => T => typeof value === 'function'

const getNewMap = <K, V>(
  map: Map<K, V>,
  key: K,
  newValue: V | undefined,
): Map<K, V> => {
  const otherValues = Array.from(map.entries()).filter(
    ([mapKey]) => mapKey !== key,
  )
  if (typeof newValue === 'undefined') {
    return new Map(otherValues)
  }
  return new Map([...otherValues, [key, newValue]])
}

export interface MapStateContext<V, K = string> {
  valueContext: Context<Map<K, V>>
  setValueContext: Context<Dispatch<SetStateAction<Map<K, V>>>>
  Provider: FC
  useSetValue: (key: K) => Dispatch<SetStateAction<V | undefined>>
  useResetValue: (key: K) => () => void
  useValue: (key: K) => V | undefined
}

export const createMapStateContext = <V, K = string>(): MapStateContext<
  V,
  K
> => {
  const {
    Provider,
    valueContext,
    setValueContext,
    useValue: useMapValue,
    useSetValue: useSetMapValue,
  } = createUseStateContext<Map<K, V>>(new Map())

  const useValue = (key: K): V | undefined => {
    const map = useMapValue()
    const value = useMemo(() => map.get(key), [map, key])
    return value
  }
  const useResetValue = (key: K): (() => void) => {
    const setMapValue = useSetMapValue()

    const resetValue = useCallback(() => {
      setMapValue((map) => getNewMap(map, key, undefined))
    }, [key, setMapValue])

    return resetValue
  }

  const useSetValue = (key: K): Dispatch<SetStateAction<V | undefined>> => {
    const setMapValue = useSetMapValue()

    const setValue = useCallback<Dispatch<SetStateAction<V | undefined>>>(
      (value) => {
        if (isFunctionalSetState(value)) {
          setMapValue((map) => getNewMap(map, key, value(map.get(key))))
        } else if (typeof value === 'undefined') {
          setMapValue((map) => getNewMap(map, key, undefined))
        } else {
          setMapValue((map) => getNewMap(map, key, value))
        }
      },
      [key, setMapValue],
    )

    return setValue
  }

  return {
    Provider,
    setValueContext,
    useResetValue,
    useSetValue,
    useValue,
    valueContext,
  }
}

export interface MapArrayStateContext<V, K = string> {
  valueContext: Context<Map<K, V[]>>
  setValueContext: Context<Dispatch<SetStateAction<Map<K, V[]>>>>
  Provider: FC
  useSetValue: (key: K) => Dispatch<SetStateAction<V[]>>
  useResetValue: (key: K) => () => void
  useValue: (key: K) => V[] | undefined
}

export const createMapArrayStateContext = <
  V,
  K = string,
>(): MapArrayStateContext<V, K> => {
  const { useSetValue, ...mapStateContext } = createMapStateContext<V[], K>()

  const useSetArrayValue = (key: K): Dispatch<SetStateAction<V[]>> => {
    const setValue = useSetValue(key)

    const setArrayValue = useCallback<Dispatch<SetStateAction<V[]>>>(
      (value) => {
        if (Array.isArray(value)) {
          setValue(value)
        } else {
          setValue((prev) => value(prev ?? []))
        }
      },
      [setValue],
    )

    return setArrayValue
  }

  return {
    ...mapStateContext,
    useSetValue: useSetArrayValue,
  }
}
