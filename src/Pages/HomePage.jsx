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
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="mb-1 w-full">
              <TabsTrigger className="w-1/2" value="login">
                Login
              </TabsTrigger>
              <TabsTrigger className="w-1/2" value="signup">
                SignUp
              </TabsTrigger>
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
