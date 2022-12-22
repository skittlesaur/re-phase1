import api from '@lib/api'
import Router, { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

const Login = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationKey: 'login',
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api
        .post('/user/login', {
          email: email,
          password: password,
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
    const password = e.target[1].value

    if (!email) {
      return toast.error('please enter an email address')
    }

    if (!password) return toast.error('please insert a password')

    mutation.mutate({ email, password })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Email:
          <input type="email" placeholder="example@example.com"></input>
        </label>
        <br />
        <label>
          Password:
          <input type="password" minLength={8}></input>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
