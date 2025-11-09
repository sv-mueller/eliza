"use client";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddPasskeyButton() {
  const [lastError, setLastError] = useState<string>();
  const router = useRouter();
  async function addPasskey() {
    const res = await authClient.passkey.addPasskey();
    if (res?.error) {
      setLastError(res.error.message);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <Button onClick={() => addPasskey()}>Add Passkey</Button>
      {lastError && <FieldError>{lastError}</FieldError>}
    </>
  );
}
