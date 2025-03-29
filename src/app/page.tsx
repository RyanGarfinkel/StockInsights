"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Home: React.FC = () => {

    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
      
      if (!isLoading && user)
        router.push("/dashboard");

    }, [isLoading, router, user]);
    
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Stock Insights</CardTitle>
          <CardDescription>
            Get insights on stocks using the power of AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Button onClick={() => window.location.href = '/api/auth/login'}>
              Login
            </Button>
            <Button onClick={() => window.location.href = '/api/auth/login'}>
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default Home;