import api from "@lib/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient, Mutation } from "react-query";
import { useEffect, useState } from "react";
import Loader from "@components/loader";

const Complaint = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = router.query;

  const query = useQuery({
    queryKey: "complaint",
    queryFn: () => api.get(`/user/complaint/${id}`).then((res) => res.data),
    enabled: !!id,
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
              if (!reply.customerId) {
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
