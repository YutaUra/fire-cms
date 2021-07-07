import {
  createMapArrayStateContext,
  createMapStateContext,
  createUseStateContext,
} from '@fire-cms/react-utils'
import type { FC } from 'react'
import type {
  FireCmsContentContentModel,
  FireCmsContentEntryModel,
} from './schema'

const {
  Provider: FireCmsContentContentsProvider,
  useSetValue: useFireCmsContentSetContents,
  useValue: useFireCmsContentContents,
} = createUseStateContext<FireCmsContentContentModel[]>([])
const {
  Provider: FireCmsContentContentsIsLoadingProvider,
  useSetValue: useFireCmsContentSetContentsIsLoading,
  useValue: useFireCmsContentContentsIsLoading,
} = createUseStateContext<boolean>(false)
const {
  Provider: FireCmsContentContentsIsInitializedProvider,
  useSetValue: useFireCmsContentSetContentsIsInitialized,
  useValue: useFireCmsContentContentsIsInitialized,
} = createUseStateContext<boolean>(false)

const {
  Provider: FireCmsContentEntryMapProvider,
  useSetValue: useFireCmsContentSetEntries,
  useValue: useFireCmsContentEntries,
} = createMapArrayStateContext<FireCmsContentEntryModel>()
const {
  Provider: FireCmsContentEntryMapIsLoadingProvider,
  useSetValue: useFireCmsContentSetEntriesIsLoading,
  useValue: useFireCmsContentEntriesIsLoading,
} = createMapStateContext<boolean>()
const {
  Provider: FireCmsContentEntryMapIsInitializedProvider,
  useSetValue: useFireCmsContentSetEntriesIsInitialized,
  useValue: useFireCmsContentEntriesIsInitialized,
} = createMapStateContext<boolean>()

export const FireCmsContentCommonRoot: FC = ({ children }) => (
  <FireCmsContentEntryMapProvider>
    <FireCmsContentEntryMapIsLoadingProvider>
      <FireCmsContentEntryMapIsInitializedProvider>
        {children}
      </FireCmsContentEntryMapIsInitializedProvider>
    </FireCmsContentEntryMapIsLoadingProvider>
  </FireCmsContentEntryMapProvider>
)

export const FireCmsContentCmsProvider: FC = ({ children }) => (
  <FireCmsContentContentsProvider>
    <FireCmsContentContentsIsLoadingProvider>
      <FireCmsContentContentsIsInitializedProvider>
        {children}
      </FireCmsContentContentsIsInitializedProvider>
    </FireCmsContentContentsIsLoadingProvider>
  </FireCmsContentContentsProvider>
)

export {
  useFireCmsContentSetContents,
  useFireCmsContentContents,
  useFireCmsContentSetContentsIsLoading,
  useFireCmsContentContentsIsLoading,
  useFireCmsContentSetContentsIsInitialized,
  useFireCmsContentContentsIsInitialized,
  useFireCmsContentSetEntries,
  useFireCmsContentEntries,
  useFireCmsContentSetEntriesIsLoading,
  useFireCmsContentEntriesIsLoading,
  useFireCmsContentSetEntriesIsInitialized,
  useFireCmsContentEntriesIsInitialized,
}
