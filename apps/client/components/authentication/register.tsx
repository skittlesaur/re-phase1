import api from "@lib/api";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const Register = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: "register",
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) =>
      api
        .post("/user/register", {
          email: email,
          password: password,
          name: name,
        })
        .then((res) => res.data),
    retry: 0,
    onSuccess: () => {
      Router.push("/");
    },
    onError: (e: any) => {
      toast.error(e.response?.data.error);
    },
  });

  const submitHandler = (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    let name = e.target[1].value;
    const password = e.target[2].value;
    const passwordCheck = e.target[3].value;

    if (!name) name = "";

    if (!email) {
      return toast.error("please enter an email address");
    }

    if (!password) return toast.error("please insert a password");

    if (password !== passwordCheck)
      return toast.error("passwords do not match");

    mutation.mutate({ email, password, name });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Email:
          <input type="email" placeholder="example@example.com"></input>
        </label>
        <br />
        <label>
          Name:
          <input type="text" placeholder="example"></input>
        </label>
        <br />
        <label>
          Password:
          <input type="password" minLength={8}></input>
        </label>
        <br />
        <label>
          Insert password again:
          <input type="password" minLength={8}></input>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
