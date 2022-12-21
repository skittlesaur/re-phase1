import useUser from "@hooks/use-user";
import register from "../../../server/src/controllers/user/register";
import Register from "./register";
import { useState } from "react";
import Login from "./login";

const Authentication = () => {
  const [registered, setRegistered] = useState<boolean>(false);

  if (registered) {
    return (
      <div>
        <Register></Register>
        <h1>Already have an account?</h1>
        <button onClick={() => setRegistered(!registered)}>
          Login instead
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <Login></Login>
        <h1>Don't have an Account? </h1>
        <button onClick={() => setRegistered(!registered)}>
          Register now!
        </button>
      </div>
    );
  }
};

export default Authentication;
