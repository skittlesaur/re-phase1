import useComplaints from "@hooks/use-complaints";
import Loader from "@components/loader";
import { Mutation, useMutation, useQueryClient } from "react-query";
import api from "@lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

const AllChats = ({ user }: any) => {
  const { complaints, isLoading } = useComplaints(user.role);
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: "complain",
    mutationFn: ({ title, text }: { title: string; text: string }) =>
      api
        .post("/user/customer/writeComplaint", { title: title, text: text })
        .then((res) => res.data),
    retry: 0,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["complaints"] }),
    onError: (e: any) => {
      toast.error("something went wrong");
    },
  });

  if (isLoading) return <Loader />;

  const submitHandler = (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[1].value;
    mutation.mutate({ title, text });
  };

  return (
    <div>
      {complaints.map((complaint: any) => {
        return (
          <Link href={`/contact/${complaint.id}`}>
            <div>
              <h1>{complaint.title}</h1>
              <br />
              <h1>Date issued: {complaint.date}</h1>
              <br />
              <h1>
                Status:{" "}
                {complaint.status === false ? "not solved" : "solved ;)"}
              </h1>
            </div>
          </Link>
        );
      })}

      {user.role === "CUSTOMER" && (
        <form onSubmit={submitHandler}>
          <input
            name="title"
            type="text"
            placeholder="add title to your complaint"
          ></input>
          <input
            name="body"
            type="text"
            placeholder="add new complaint"
          ></input>
          <button type="submit">submit complaint</button>
        </form>
      )}
    </div>
  );
};

export default AllChats;
