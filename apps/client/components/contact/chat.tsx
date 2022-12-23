import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useUser from '@hooks/use-user'
import api from '@lib/api'
import toast from 'react-hot-toast'
import Loader from '@components/loader'
import SEO from 'ui/seo'
import { useEffect, useRef, useState } from 'react'

const Chat = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useUser()
  const { id } = router.query
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [reply, setReply] = useState('')

  const { data: complaint, isLoading, isError } = useQuery({
    queryKey: 'complaint',
    queryFn: () => api.get(`/user/complaint/${id}`).then((res) => res.data),
    enabled: !!id && !!user,
    onError: (e: any) => console.log(e.message),
  })

  const replyMutation = useMutation({
    mutationKey: 'reply',
    mutationFn: ({
                   text,
                   complaintId,
                 }: {
      text: string;
      complaintId: string;
    }) =>
      api.post('/user/reply', { text: text, complaintId: complaintId }),
    retry: 0,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: 'complaint' })
      queryClient.invalidateQueries({ queryKey: 'complaints' })
      setReply('')
      toast.success('Reply sent successfully')
    },
    onError: (e: any) => {
      toast.error('something went wrong')
    },
  })

  const updateStatusMutation = useMutation({
    mutationKey: 'update',
    mutationFn: ({
                   status,
                   complaintId,
                 }: {
      status: Boolean;
      complaintId: string;
    }) =>
      api
        .put('/user/customer-service/status', {
          status: status,
          complaintId: complaintId,
        })
        .then((res) => res.data),
    retry: 0,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: 'complaint' })
      toast.success('Status updated successfully')
    },
    onError: () => {
      toast.error('An error from update status has taken place')
    },
  })

  const submitHandler = (e: any) => {
    e.preventDefault()
    if (!reply) return toast.error('Complaint message is required')
    replyMutation.mutate({ text: reply, complaintId: complaint.id })
  }

  const handleStatusChange = (status: boolean, complaintId: string) => {
    updateStatusMutation.mutate({ status, complaintId })
  }

  useEffect(() => {
    if (complaint)
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [complaint])

  if (!complaint || isLoading) return <Loader />

  if (isError) {
    router.push('/contact')
    return <Loader />
  }

  const formatTime = (date: string) => {
    const d = new Date(date)

    const timeStr = d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })

    return timeStr
  }

  return (
    <div>
      <SEO title={`Complaint: ${complaint.title}`} />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">{complaint.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 uppercase">
              {complaint.status ? 'Solved' : 'Unsolved'}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-[70vh] max-h-[70vh] flex flex-col gap-4 px-4 border border-gray-200 rounded-lg">
            <div className="scrollbar-hide grow overflow-y-auto flex flex-col gap-4 py-4">
              <div className={`flex gap-5 items-center ${complaint.author.user.id === user.id ? 'flex-row-reverse' : 'flex-row'}`}>
                <p className={`bubble ${complaint.author.user.id === user.id ? 'mine' : 'yours'}`}>
                  {complaint.text}
                </p>
                <p className="text-xs text-gray-400">
                  {formatTime(complaint.date)}
                </p>
              </div>
              {complaint.replies.map((reply: any, idx: number) => {
                const isMine = user.role === 'CUSTOMER' ? (
                  !!reply.customerId
                ) : reply.customerServiceId

                return (
                  (
                    <div
                      ref={lastMessageRef}
                      key={reply.id}
                      className={`flex gap-5 items-center ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <p className={`bubble ${isMine ? 'mine' : 'yours'}`}>
                        {reply.text}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatTime(reply.date)}
                      </p>
                    </div>
                  )
                )
              })}
            </div>
            <div className="py-4">
              <form onSubmit={submitHandler}>
                <div className="flex items-center gap-2">
                  <input
                    disabled={complaint.status}
                    type="text"
                    className="w-full border border-gray-200 rounded-lg p-2 grow disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200"
                    placeholder="Reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    disabled={complaint.status || replyMutation.isLoading}
                    type="submit"
                    className="h-11 w-24 border border-gray-400 text-gray-900 rounded-lg py-2 px-4 hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200"
                  >
                    {replyMutation.isLoading ? (
                      <Loader full={false} />
                    ) : (
                      'Send'
                    )}
                  </button>
                  {user.role === 'CUSTOMER_SERVICE' && (
                    <button
                      type="button"
                      disabled={updateStatusMutation.isLoading}
                      onClick={() => handleStatusChange(!complaint.status, complaint.id)}
                      className={`h-11 w-24 border ${complaint.status ? 'border-green-400 hover:bg-green-700' : 'border-red-400 hover:bg-red-700'} text-gray-900 rounded-lg py-2 px-4 hover:text-white transition duration-200 ease-in-out`}
                    >
                      {updateStatusMutation.isLoading ? (
                        <Loader full={false} />
                      ) : (
                        !complaint.status ? 'Close' : 'Open'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat