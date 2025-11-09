import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "../loginForm";

export default async function Login() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
}
