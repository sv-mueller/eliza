"use client";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RevokeOtherSessionsButton() {
  const router = useRouter();
  const [lastError, setLastError] = useState<string>();
  async function revokeOtherSessions() {
    const { error } = await authClient.revokeOtherSessions();
    if (error) {
      setLastError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <Button variant="destructive" onClick={revokeOtherSessions}>
        Revoke Other Sessions (inactive)
      </Button>
      {lastError && <FieldError>{lastError}</FieldError>}
    </>
  );
}
