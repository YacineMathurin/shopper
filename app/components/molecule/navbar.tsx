"use client";

import { CContainer, CNavbar, CNavbarBrand } from "@coreui/react";
import { UserStatus } from "./user-status";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/account";

export default function Navbar() {
  const context = useContext(AuthContext);

  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand href="#">
          <img
            src={"gold_icon_shoppers.png"}
            alt=""
            width="22"
            height="24"
            className="d-inline-block align-top relative mr-1"
            style={{ top: ".1em" }}
          />
          <span>Shoppers</span>
        </CNavbarBrand>
        <UserStatus />
      </CContainer>
    </CNavbar>
  );
}
