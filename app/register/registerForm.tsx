"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { registerFormSchema } from "@/zod/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export default function RegisterForm() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState<string>();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    setLoading(true);
    await signUp.email({
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      image: image ? await convertImageToBase64(image) : undefined,
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

  async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = registerFormSchema.safeParse({ image: file });
    if (result.success) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      const imageErrorMessage = result.error.issues.find(
        (i) => i.path[0] === "image",
      )?.message;
      if (imageErrorMessage) {
        form.setError("image", { message: imageErrorMessage });
      }
    }
  }

  return (
    <Card className="w-2/3 max-w-md">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 py-6">
          <FieldGroup>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="first-name">First name</FieldLabel>
                  <Input
                    {...field}
                    id="first-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Max"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                  <Input
                    {...field}
                    id="last-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Robinson"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="m.robinson@example.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  <FieldLabel htmlFor="password">New password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">New password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">
                    Profile Image (optional)
                  </FieldLabel>
                  {imagePreview && (
                    <div className="relative m-auto h-16 max-w-16 overflow-hidden rounded-sm">
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="flex w-full items-center gap-2">
                    <Input
                      {...field}
                      value={undefined}
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    {imagePreview && (
                      <X
                        className="cursor-pointer"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      />
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field orientation="vertical">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
            {lastError && <FieldError errors={[{ message: lastError }]} />}
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
