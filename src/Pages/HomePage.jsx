import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          {/* CardTitle can be used for "Login / Sign Up" if you wish */}
          <CardTitle className="text-center text-2xl font-bold">
            Welcome test
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* The w-full here ensures it fills the Card's constrained width */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="signup">
              <SignUp />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
