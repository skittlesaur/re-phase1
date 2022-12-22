import useComplaints from "@hooks/use-complaints";
import Loader from "@components/loader";

const AllChats = ({ user }: any) => {
  const { complaints, isLoading } = useComplaints(user.role);

  if (isLoading) return <Loader />;
  console.log(complaints);

  return <div>{complaints}</div>;
};

export default AllChats;
