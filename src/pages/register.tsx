import { useState } from "react";
import Input from "../components/input/input";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center w-full">
      <form className="bg-transparent-1 w-fit my-12">
        <Input
          type={"email"}
          name={"register_email"}
          placeholder={"email"}
          label={"Email"}
          optional={false}
          callBack={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type={"text"}
          name={"register_password"}
          placeholder={"password"}
          label={"Password"}
          optional={false}
          callBack={(e: any) => {
            setPassword(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
// {
//   "name":"testTree",
//   "email":"test3@gmail.com",
//   "password":"test31234@",
//   "mobileNumber":"0778888888",
//   "role":"THEATER_EMPLOYEE"
// }
