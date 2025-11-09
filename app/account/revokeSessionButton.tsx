"use client";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type RevokeSessionButtonProps = {
  token: string;
};
export function RevokeSessionButton({ token }: RevokeSessionButtonProps) {
  const router = useRouter();
  const [lastError, setLastError] = useState<string>();
  async function revokeSession(token: string) {
    const { error } = await authClient.revokeSession({
      token,
    });
    if (error) {
      setLastError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <Button variant="destructive" onClick={() => revokeSession(token)}>
        Revoke
      </Button>
      {lastError && <FieldError>{lastError}</FieldError>}
    </>
  );
}
