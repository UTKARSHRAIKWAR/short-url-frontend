import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner"; //
import { useNavigate } from "react-router-dom";
import API from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showPass = () => setShow(!show);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill all the fields"); //Updated toast call
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      toast.success("Login Successful", {
        //pdated toast call
        description: "Logged in successfully!",
        duration: 5000,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      toast.error("An error occurred", {
        //Updated toast call
        description: error.response?.data?.message || "Something went wrong!",
        duration: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <h2 className="text-sm font-medium mb-1">Email</h2>
            <Input
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Password */}
          <div>
            <h2 className="text-sm font-medium mb-1">Password</h2>
            <div className="flex gap-2">
              <Input
                value={password}
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              <Button
                variant="ghost"
                type="button"
                onClick={showPass}
                className="px-3"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </div>
          </div>

          {/* Submit */}
          <Button
            variant="outline"
            type="submit"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
