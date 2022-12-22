import api from "@lib/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient, Mutation } from "react-query";
import { useEffect, useState } from "react";
import Loader from "@components/loader";

const Complaint = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [data, setData] = useState({});

  const { id } = router.query;

  const query = useQuery({
    queryKey: "complaint",
    queryFn: () => api.get(`/user/complaint/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const complaint = query.data;
  const isLoading = query.isLoading;
  const isError = query.isError;

  if (isLoading) return <Loader />;

  if (isError) return toast.error("there was an error");

  if (complaint)
    return (
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
        <h1>
          replies:
          {complaint.replies.map((reply: any) => {
            if (!reply.customerId) {
              return <p>this is a customer: {reply.text}</p>;
            } else {
              return <p>this a customer sevice rep: {reply.text}</p>;
            }
          })}
        </h1>
        <br />
      </div>
    );
};

export default Complaint;
