import api from "@lib/api";
import { useMutation } from "react-query";

const Complaints = () => {
  const mutation = useMutation({
    mutationKey: "complaints",
    mutationFn: () => api.get("/user."),
  });
  return <div></div>;
};

export default Complaints;
