import { AuthContext } from "@/application/contexts/account";
import { useUserStatus } from "@/application/contexts/hooks/online";
import { CButton } from "@coreui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";

export const UserStatus = () => {
  const context = useContext(AuthContext);
  const isOnline = useUserStatus();
  const router = useRouter();

  const handleAuthClick = () => router.push("/auth");
  const handleAddProductClick = () => router.push("/seller");

  return isOnline ? (
    <OnlineButtons>
      <CButton color="secondary" size="sm" onClick={handleAddProductClick}>
        Manage Products
      </CButton>
      <CButton color="secondary" size="sm" onClick={context?.logout}>
        Logout
      </CButton>
    </OnlineButtons>
  ) : (
    <CButton
      color="black"
      size="sm"
      onClick={handleAuthClick}
      style={linkStyle}
    >
      Login
    </CButton>
  );
};
const OnlineButtons = styled.div`
  display: flex;
  gap: 1em;
`;
const linkStyle = {
  textDecoration: "none",
  color: "unset",
};
