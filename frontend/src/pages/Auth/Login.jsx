import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Inputs/Input"
import { validateEmail } from "../../utils/helper"

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter a password")
      return
    }

    setError("")

    // Login API Call
    try {
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className="w-full max-w-md p-7 flex flex-col justify-center bg-white  rounded-xl">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="abhishek@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button className="btn-primary" type="submit">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account ?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer "
            onClick={() => {
              setCurrentPage("signup")
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
