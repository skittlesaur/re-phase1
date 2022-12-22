import useUser from '@hooks/use-user'
import gradientAvatar from 'gradient-avatar'
import { useEffect, useState } from 'react'
import Loader from '@components/loader'
import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import toast from 'react-hot-toast'

const Profile = () => {
  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationKey: 'updateUser',
    mutationFn: ({ email, name, oldPassword, newPassword }: any) => api.put('/user', {
      email,
      name,
      oldPassword,
      newPassword,
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries('user')
      toast.success('Profile updated successfully')
    },
  })
  const { user, isLoading } = useUser()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    if (!user || isLoading) return
    setName(user.name)
    setEmail(user.email)
  }, [user, isLoading])

  if (isLoading) return <Loader />

  const handleUpdate = () => {
    if (oldPassword && !newPassword)
      return toast.error('Please enter new password')

    if (newPassword.length < 8)
      return toast.error('Password must be at least 8 characters long')

    updateMutation.mutate({
      email,
      name,
      oldPassword,
      newPassword,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <h1 className="text-2xl">
          Profile
        </h1>
        <div className="grow h-1 overflow-hidden bg-gray-300 rounded-full ml-4">
          <div
            dangerouslySetInnerHTML={{
              __html: gradientAvatar(user.id),
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 max-w-[20em]">
        <div className="flex flex-col gap-2">
          <span className="text-sm">
            Name
          </span>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">
            Email
          </span>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">
            Change Password
          </span>
          <input
            type="password"
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white rounded-md px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
          type="button"
          disabled={(
            name === user.name
            && email === user.email
            && oldPassword === ''
            && newPassword === ''
          ) || updateMutation.isLoading}
          onClick={handleUpdate}
        >
          {updateMutation.isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  )
}

export default Profile