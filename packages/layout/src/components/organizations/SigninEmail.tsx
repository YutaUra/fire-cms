import { useFirebaseAuth } from '@fire-cms/auth'
import { toast } from '@fire-cms/toast'
import { FirebaseError } from '@firebase/util'
import {
  browserLocalPersistence,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useCallback } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import type { SigninFormField } from '../forms/SigninForm'
import { SigninForm } from '../forms/SigninForm'

export const SigninEmail = (): JSX.Element => {
  const auth = useFirebaseAuth()

  const handleSubmit = useCallback<SubmitHandler<SigninFormField>>(
    async (data) => {
      try {
        await setPersistence(
          auth,
          data.rememberMe ? browserLocalPersistence : inMemoryPersistence,
        )
        await signInWithEmailAndPassword(auth, data.email, data.password)
        toast('ログイン成功', { type: 'success' })
      } catch (err: unknown) {
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case 'auth/configuration-not-found':
              toast(
                'ログイン失敗（FirebaseのAuthの設定が不適切かもしれません）',
                { type: 'error' },
              )
              break
            case 'auth/operation-not-allowed':
              toast(
                'ログイン失敗（メールアドレスとパスワードでの認証が設定されていません）',
                { type: 'error' },
              )
              break
            default:
              console.error(JSON.stringify(err))
              toast('ログイン失敗')
          }
        } else {
          toast('ログイン失敗')
          console.error(JSON.stringify(err))
        }
      }
    },
    [auth],
  )

  return <SigninForm onSubmit={handleSubmit} />
}
