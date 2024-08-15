"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { LoginValidation } from "@/lib/validations/auth_validations";
import CustomFormField from "@/components/custom/inputs/CustomFormField";
import Link from "next/link";
import userStore from "@/stores/userStore";
import CustomButton from "@/components/custom/buttons/CustomButton";

const SigninPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setUser = userStore((state) => state.setUser);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      toast({
        title: "Success",
        description: "Logged in successfully",
        className: "bg-primary text-white",
      });
      setUser(data.user);
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: data.error,
        className: "bg-red-400 text-white",
      });
    }
    setIsLoading(false);
  }

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <span className="text-primary underline">
              <Link href="/auth/sign-up">Sign up</Link>
            </span>
          </p>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <CustomFormField
                  form={form}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <CustomFormField
                  form={form}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <CustomButton
                type="button"
                label="Sign in"
                loading={isLoading}
                wFull={true}
              />
            </CardFooter>
            <div className="pb-2">
              <Link href="/auth/forgot-password">
                <p className="text-sm text-center text-gray-500 underline">
                  Forgot Password?
                </p>
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default SigninPage;
