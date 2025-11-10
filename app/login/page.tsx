import { auth } from "@/lib/auth";
import { createFeatureFlag } from "@/lib/flags";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "../loginForm";

export default async function Login() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }
  const registerEnabled = await createFeatureFlag("register")();

  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
      <LoginForm hasRegister={registerEnabled} />
    </main>
  );
}
