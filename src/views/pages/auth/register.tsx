import { useState } from "react"
import Input from "../../../components/input/input"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    if (!fName) {
      notifyWarning("First Name cannot be empty!")
    } else if (!lName) {
      notifyWarning("Last Name cannot be empty!")
    } else if (!email) {
      notifyWarning("Email cannot be empty!")
    } else if (!phone) {
      notifyWarning("Contact Number cannot be empty!")
    } else if (!password) {
      notifyWarning("Password cannot be empty!")
    } else if (!cPassword) {
      notifyWarning("Confirm Password cannot be empty!")
    } else if (password === !cPassword) {
      notifyWarning("Passwords do not match!")
    } else if (!isAgree) {
      notifyWarning("Please agree to the terms and conditions to proceed.")
    } else {
      setLoading(true)
      await createNewUser({
        firstName: fName,
        lastName: lName,
        email: email,
        mobile: phone,
        password: password
      })
        .then((res) => {
          if (res.success) {
            notifySuccess("You have successfully registered!")
            setFName("")
            setLName("")
            setEmail("")
            setPhone("")
            setPassword("")
            setCPassword("")
            setAgree(false)
            navigate("/login")
          } else if (res.status === 0) {
            notifyWarning("Invalid user data")
          } else {
            notifyError(
              "Connection refused: Unable to connect to the server. Please check your internet connection or try again later."
            )
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }
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
            setEmail(e.target.value)
          }}
        />
        <Input
          type={"text"}
          name={"register_password"}
          placeholder={"password"}
          label={"Password"}
          optional={false}
          callBack={(e: any) => {
            setPassword(e.target.value)
          }}
        />
      </form>
    </div>
  )
}
// {
//   "name":"testTree",
//   "email":"test3@gmail.com",
//   "password":"test31234@",
//   "mobileNumber":"0778888888",
//   "role":"THEATER_EMPLOYEE"
// }
