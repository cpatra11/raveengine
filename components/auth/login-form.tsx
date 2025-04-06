"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState, Suspense } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { login } from "@/lib/actions/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const LoginFormContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await login(values);

      if (response?.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      setSuccess("Login successful! Redirecting...");

      // Instead of trying multiple redirect approaches, use a simple one that works
      setTimeout(() => {
        // Force a hard navigation to the dashboard
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error: any) {
      setError(error?.message || "Something went wrong");
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="xl:w-1/4 md:w-1/2 w-full px-10 sm:px-0">
      <CardWrapper
        headerLabel="Welcome back"
        title="Sign In"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        type="email"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your password"
                        type="password"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href="/reset-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              variant={loading ? "outline" : "default"}
            >
              {loading ? "Please wait..." : "Sign In"}
            </Button>
          </form>
        </Form>

        {/* Or divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Auth */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Google
        </Button>
      </CardWrapper>
    </div>
  );
};

const LoginForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
};

export default LoginForm;
