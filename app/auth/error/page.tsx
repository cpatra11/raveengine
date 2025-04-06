"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthErrorContent = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      switch (error) {
        case "Configuration":
          setErrorMessage("There is a problem with the server configuration.");
          break;
        case "AccessDenied":
          setErrorMessage("You do not have access to this resource.");
          break;
        case "Verification":
          setErrorMessage("The verification token has expired or is invalid.");
          break;
        case "OAuthSignin":
          setErrorMessage("Error in the OAuth sign in process.");
          break;
        default:
          setErrorMessage("An unknown authentication error occurred.");
          break;
      }
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">
            Authentication Error
          </h2>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-red-600">{errorMessage}</p>
          <Button asChild>
            <Link href="/sign-in">Back to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
