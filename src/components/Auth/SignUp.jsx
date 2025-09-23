import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showPass = () => setShow(!show);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields"); //Updated toast call
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match"); //Updated toast call
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await API.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
        },
        config
      );
      toast.success("Registration Successful", {
        //Updated toast call
        description: "Your account has been created successfully!",
        duration: 5000,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      toast.error("An error occurred", {
        //
        description: error.response?.data?.message || "Something went wrong!",
        duration: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <h2 className="text-sm font-medium mb-1">Name</h2>
            <Input
              value={name}
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

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
            <Input
              value={password}
              type={show ? "text" : "password"}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <h2 className="text-sm font-medium mb-1">Confirm Password</h2>
            <div className="flex gap-2">
              <Input
                value={confirmPassword}
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            variant="destructive"
            type="submit"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
