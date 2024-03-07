import { AuthContext } from "@/application/contexts/account";
import { useUserStatus } from "@/application/contexts/hooks/online";
import { CButton } from "@coreui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const UserStatus = () => {
  const context = useContext(AuthContext);
  const isOnline = useUserStatus();
  const router = useRouter();

  const handleClick = () => router.push("/auth");

  return isOnline ? (
    <>
      <CButton color="secondary" size="sm" onClick={context?.logout}>
        Logout
      </CButton>
    </>
  ) : (
    <CButton color="black" size="sm" onClick={handleClick} style={linkStyle}>
      Login
    </CButton>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "unset",
};
