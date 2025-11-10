import { createFeatureFlag } from "@/lib/flags";
import { notFound } from "next/navigation";
import RegisterForm from "./registerForm";

export default async function Login() {
  const registerEnabled = await createFeatureFlag("register")();
  if (!registerEnabled) {
    notFound();
  }

  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
      <RegisterForm />
    </main>
  );
}
