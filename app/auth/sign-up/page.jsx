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
import { SignupValidation } from "@/lib/validations/auth_validations";
import CustomFormField from "@/components/custom/inputs/CustomFormField";
import Link from "next/link";
import CustomButton from "@/components/custom/buttons/CustomButton";

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.status === 200) {
      toast({
        title: "Success",
        description: "Account created successfully",
        className: "bg-primary text-white",
      });

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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span className="text-primary underline">
              <Link href="/auth/sign-in">Sign in</Link>
            </span>
          </p>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <CustomFormField
                  form={form}
                  name="fullName"
                  type="fullName"
                  placeholder="Full Name"
                />
              </div>
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
                label="Sign up"
                loading={isLoading}
                wFull={true}
              />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default SignupPage;
