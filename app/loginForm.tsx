"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { loginFormSchema } from "@/zod/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [lastError, setLastError] = useState<string>();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setLoading(true);
    await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          setLastError(ctx.error.message);
          setLoading(false);
        },
        onSuccess: async () => {
          router.push("/dashboard");
        },
      },
    });
  }

  return (
    <Card className="w-2/3 max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2 py-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="m.robinson@example.com"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="password"
                    autoComplete="password"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="mt-6 w-full">
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p> Login </p>
            )}
          </Button>
          {lastError && <FieldError errors={[{ message: lastError }]} />}
        </form>
      </CardContent>
    </Card>
  );
}
