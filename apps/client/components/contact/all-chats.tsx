import useComplaints from '@hooks/use-complaints'
import Loader from '@components/loader'
import { Mutation, useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AllChats = ({ user }: any) => {
  const { complaints, isLoading } = useComplaints(user.role)
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationKey: 'complain',
    mutationFn: ({ title, text }: { title: string; text: string }) =>
      api
        .post('/user/customer/writeComplaint', { title: title, text: text })
        .then((res) => res.data),
    retry: 0,
    onSuccess: async (res) => {
      if (res.id)
        await router.push(`/contact/${res.id}`)
      await queryClient.invalidateQueries('complain')
      toast.success('Complaint sent successfully')
    },
    onError: (e: any) => {
      toast.error('something went wrong')
    },
  })

  if (isLoading) return <Loader />

  const submitHandler = (e: any) => {
    e.preventDefault()
    const title = e.target[0].value
    const text = e.target[1].value

    if (!title) return toast.error('Complaint title is required')
    if (!text) return toast.error('Complaint message is required')

    mutation.mutate({ title, text })
  }

  const formatDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="flex flex-col gap-10">
      {user.role === 'CUSTOMER' && (
        <form
          className="w-full items-center gap-4 grid grid-cols-[1fr_1fr_0.5fr]"
          onSubmit={submitHandler}
        >
          <input
            name="title"
            type="text"
            placeholder="Complaint title"
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            name="body"
            type="text"
            placeholder="Complaint message"
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            disabled={mutation.isLoading}
            type="submit"
            className="uppercase border border-black disabled:bg-gray-800 h-10 text-black rounded-md px-4 py-2 text-sm hover:text-white hover:bg-black transition-all duration-200 ease-in-out"
          >
            {mutation.isLoading ? <Loader full={false} /> : 'Submit Complaint'}
          </button>
        </form>
      )}
      <div className="flex flex-col gap-4">
        {complaints?.map((complaint: any) => {
          return (
            <Link
              className="rounded-lg border border-gray-200 hover:border-gray-400 p-4 flex items-center justify-between gap-2 hover:shadow-lg cursor-pointer transition-all duration-200 ease-in-out group"
              href={`/contact/${complaint.id}`}
            >
              <div>
                <h1 className="text-lg font-medium">{complaint.title}</h1>
                <p className="text-gray-600 text-sm">
                  {formatDate(complaint.date)}
                </p>
              </div>
              <div
                className={`uppercase tracking-widest text-sm px-4 py-2 rounded-md font-medium w-32 text-center border group-hover:opacity-60 transition-all duration-200 ease-in-out ${
                  complaint.status
                    ? 'bg-green-200 border-green-400'
                    : 'bg-red-200 border-red-400'
                }`}
              >
                {complaint.status ? 'Solved' : 'Unsolved'}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AllChats
