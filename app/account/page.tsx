import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AddPasskeyButton } from "./addPasskeyButton";
import { DeletePasskeyButton } from "./deletePasskeyButton copy";
import { SessionTable } from "./sessionTable";

export default async function AccountPage() {
  const headersList = await headers();

  const [session, passkeys, sessions] = await Promise.all([
    auth.api.getSession({
      headers: headersList,
    }),
    auth.api.listPasskeys({
      headers: headersList,
    }),
    auth.api.listSessions({
      headers: headersList,
    }),
  ]);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Account Page</CardTitle>
          <CardDescription>
            View your account settings, manage your sessions and passkeys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="id">Id</Label>
              <Input readOnly value={session?.user.id} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input readOnly value={session.user.email} />
            </div>
            <div className="grid gap-2">
              <Label>Passkeys</Label>
              <ul className="list-disc pl-4">
                {passkeys.map((pk) => (
                  <li key={pk.id}>
                    <div className="flex">
                      {pk.id} (Created at:{" "}
                      {new Date(pk.createdAt).toLocaleString()})
                      <DeletePasskeyButton passkeyId={pk.id} />
                    </div>
                  </li>
                ))}
              </ul>
              <AddPasskeyButton />
            </div>
            <SessionTable
              sessions={sessions.map((s) => ({
                isActive: s.token === session.session.token,
                ...s,
              }))}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
