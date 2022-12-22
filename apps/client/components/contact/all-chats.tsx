import useComplaints from "@hooks/use-complaints";
import Loader from "@components/loader";
import { Mutation, useMutation } from "react-query";
import api from "@lib/api";

const AllChats = ({ user }: any) => {
  const { complaints, isLoading } = useComplaints(user.role);

  const mutation = useMutation({
    mutationKey: "complain",
    mutationFn: ({ title, text }: { title: string; text: string }) =>
      api
        .post("/user/costumer/writeComplaint", { title: title, text: text })
        .then((res) => res.data),
    retry: 0,
    onSuccess: () => console.log("success!"),
    onError: () => console.log("yikes!"),
  });

  if (isLoading) return <Loader />;
  console.log(complaints);

  const submitHandler = (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[0].value;
    mutation.mutate({ title, text });
  };

  return (
    <div>
      {[complaints]}
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
