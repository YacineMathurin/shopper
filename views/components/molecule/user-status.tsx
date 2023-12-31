import { AuthContext } from "@/application/contexts/account";
import { useUserStatus } from "@/application/contexts/hooks/online";
import { CButton } from "@coreui/react";
import Link from "next/link";
import { useContext } from "react";

export const UserStatus = () => {
  const context = useContext(AuthContext);
  const isOnline = useUserStatus();

  return isOnline ? (
    <>
      <CButton color="secondary" size="sm" onClick={context?.logout}>
        Logout
      </CButton>
    </>
  ) : (
    <Link href={"/auth"}>Sign in</Link>
  );
};
