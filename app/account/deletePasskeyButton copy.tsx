"use client";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type DeletePasskeyButtonProps = {
  passkeyId: string;
};
export function DeletePasskeyButton({ passkeyId }: DeletePasskeyButtonProps) {
  const [lastError, setLastError] = useState<string>();
  const router = useRouter();
  async function deletePasskey(id: string) {
    const { error } = await authClient.passkey.deletePasskey({ id });
    if (error) {
      setLastError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <Button variant="destructive" onClick={() => deletePasskey(passkeyId)}>
        Delete
      </Button>
      {lastError && <FieldError>{lastError}</FieldError>}
    </>
  );
}
