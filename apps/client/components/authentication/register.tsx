import api from '@lib/api'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import Loader from '@components/loader'

const Register = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationKey: 'register',
    mutationFn: ({
                   email,
                   password,
                   name,
                 }: {
      email: string;
      password: string;
      name: string;
    }) =>
      api
        .post('/user/register', {
          email: email,
          password: password,
          name: name,
        })
        .then((res) => res.data),
    retry: 0,
    onSuccess: async () => {
      await queryClient.invalidateQueries('user')
      router.push('/')
    },
    onError: (e: any) => {
      toast.error(e.response?.data.error)
    },
  })

  const submitHandler = (e: any) => {
    e.preventDefault()

    const email = e.target[0].value
    let name = e.target[1].value
    const password = e.target[2].value

    if (!name) name = ''

    if (!email) {
      return toast.error('please enter an email address')
    }

    if (!password) return toast.error('please insert a password')

    mutation.mutate({ email, password, name })
  }

  return (
    <div className="w-[20em]">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">
            Name
          </label>
          <input
            placeholder="Name"
            type="text"
            className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-black"
          />
        </div>
        <button
          disabled={mutation.isLoading}
          className="mt-4 bg-black h-10 text-white rounded-md px-2 py-1 font-medium border border-transparent hover:border-black hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:border-transparent transition-all duration-200 ease-in-out"
          type="submit"
        >
          {mutation.isLoading ? (
              <Loader full={false} />
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  )
}

export default Register
