"use client";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RevokeAllSessionsButton() {
  const router = useRouter();
  const [lastError, setLastError] = useState<string>();
  async function revokeAllSessions() {
    const { error } = await authClient.revokeSessions();
    if (error) {
      setLastError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <Button variant="destructive" onClick={revokeAllSessions}>
        Revoke All Sessions
      </Button>
      {lastError && <FieldError>{lastError}</FieldError>}
    </>
  );
}
