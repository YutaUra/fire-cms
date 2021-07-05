import { useFireCmsAuthUser } from '@fire-cms/auth'
import { DashboardBodyContent } from '@fire-cms/components'
import {
  useCreateFileDownloadUrl,
  useCreateStorageRef,
  useFireCmsStorageUpload,
} from '@fire-cms/firebase-storage'
import { toast } from '@fire-cms/toast'
import {
  useFireCmsUserProfile,
  useFireCmsUserProfileMyPublicProfile,
  useFireCmsUserProfileSetMyPublicProfile,
} from '@fire-cms/user-profile'
import type { VFC } from 'react'
import { useCallback } from 'react'
import type { UserProfileFormField } from '../forms/UserProfileForm'
import { UserProfileForm } from '../forms/UserProfileForm'

export const UserSettingsMain: VFC = () => {
  const profile = useFireCmsUserProfileMyPublicProfile()
  const setProfile = useFireCmsUserProfileSetMyPublicProfile()
  const user = useFireCmsAuthUser()
  const createStorageRef = useCreateStorageRef()
  const createFileDownloadUrl = useCreateFileDownloadUrl()
  const { uploadBytes } = useFireCmsStorageUpload()

  const { setMyPublicUserProfile } = useFireCmsUserProfile()

  const getPhotoUrl = useCallback(
    async (photo: File | string | null) => {
      if (!user) return null
      if (photo === null || typeof photo === 'string') return photo
      const path = `public_profile/${user.uid}`
      await uploadBytes(createStorageRef(path), photo)
      return createFileDownloadUrl(path)
    },
    [createFileDownloadUrl, createStorageRef, uploadBytes, user],
  )

  const handleSubmit = useCallback(
    async (data: UserProfileFormField) => {
      if (!user) return
      try {
        const newProfile = await setMyPublicUserProfile(user.uid, {
          id: user.uid,
          name: data.name,
          photo: await getPhotoUrl(data.photo),
        })
        setProfile(newProfile)
        toast.success('プロフィールを更新できました')
      } catch (err: unknown) {
        console.error(err)
        toast.error('プロフィールを更新できませんでした')
      }
    },
    [getPhotoUrl, setMyPublicUserProfile, setProfile, user],
  )

  if (!profile) return null

  return (
    <DashboardBodyContent>
      <UserProfileForm
        defaultValues={{
          name: profile.name,
          photo: profile.photo,
        }}
        onSubmit={handleSubmit}
      />
    </DashboardBodyContent>
  )
}
