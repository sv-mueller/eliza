"useClient";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginWithPasskeyButton() {
  const [lastError, setLastError] = useState<string>();
  const router = useRouter();
  async function loginWithPasskey() {
    const { error } = await authClient.signIn.passkey();
    if (error) {
      setLastError(error.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <>
      <Button onClick={loginWithPasskey} className="w-full">
        Login with Passkey
      </Button>
      {lastError && <FieldError>{lastError}</FieldError>}
    </>
  );
}
