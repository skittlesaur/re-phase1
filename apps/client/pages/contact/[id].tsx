import api from "@lib/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient, Mutation } from "react-query";
import Loader from "@components/loader";
import useUser from "@hooks/use-user";

const Complaint = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { id } = router.query;

  const query = useQuery({
    queryKey: "complaint",
    queryFn: () => api.get(`/user/complaint/${id}`).then((res) => res.data),
    enabled: !!id && !!user,
    onError: (e: any) => console.log(e.message),
  });

  const mutation = useMutation({
    mutationKey: "reply",
    mutationFn: ({
      text,
      complaintId,
    }: {
      text: string;
      complaintId: string;
    }) =>
      api
        .post("/user/reply", { text: text, complaintId: complaintId })
        .then((res) => res.data),
    retry: 0,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["complaint"] }),
    onError: (e: any) => {
      toast.error("something went wrong");
    },
  });

  const mutation2 = useMutation({
    mutationKey: "update",
    mutationFn: ({
      status,
      complaintId,
    }: {
      status: Boolean;
      complaintId: string;
    }) =>
      api
        .put("/user/customer-service/status", {
          status: status,
          complaintId: complaintId,
        })
        .then((res) => res.data),
    retry: 0,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["update"] }),
    onError: () => {
      toast.error("An error from update status has taken place");
    },
  });

  const complaint = query.data;
  const complaintId = id as string;
  const isLoading = query.isLoading;
  const isError = query.isError;

  const submitHandler = (e: any) => {
    e.preventDefault();
    const text = e.target[0].value;

    if (!text) return toast.error("Complaint message is required");

    mutation.mutate({ text, complaintId });
  };

  const clickHandler = (status: boolean, complaintId: string) => {
    mutation2.mutate({ status, complaintId });

    console.log(`${status} + ${complaintId}`);
  };

  if (isLoading) return <Loader />;

  if (isError) return toast.error("there was an error");

  if (complaint)
    return (
      <div>
        <div>
          <h1>Title: {complaint.title}</h1>
          <br />
          <h1>Text: {complaint.text}</h1>
          <br />
          <h1>Date: {complaint.date}</h1>
          <br />

          <h1>Status: {complaint.status ? "Solved" : "Unsolved"}</h1>
          <br />
          {user.role === "CUSTOMER_SERVICE" && (
            <button
              onClick={() =>
                clickHandler(complaint.status as boolean, complaintId)
              }
            >
              change status
            </button>
          )}
          <br />

          {complaint.author.user.name && (
            <h1>Name: {complaint.author.user.name}</h1>
          )}
          <br />
          <h1>Email: {complaint.author.user.email}</h1>
          <br />
        </div>
        <div>
          <h1>
            replies:
            {complaint.replies.map((reply: any) => {
              if (reply.customerId) {
                return (
                  <p>
                    this is a customer: {reply.text}
                    {reply.date}
                  </p>
                );
              } else {
                return (
                  <p>
                    this a customer sevice rep: {reply.text}
                    {reply.date}
                  </p>
                );
              }
            })}
          </h1>
          <br />
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="..."></input>
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    );
};

export default Complaint;
