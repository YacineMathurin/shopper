"use client";

import { CContainer, CNavbar, CNavbarBrand } from "@coreui/react";
import { UserStatus } from "./user-status";
import { useContext } from "react";
import { AuthContext } from "@/application/contexts/account";
import styled, { css } from "styled-components";
import Link from "next/link";

export default function Navbar() {
  const context = useContext(AuthContext);

  return (
    <CNavbar colorScheme="light" className="bg-light" style={wrapperStyle}>
      <CContainer fluid>
        <Link href="/" style={logoContainerStyle}>
          <img
            src={"./images/Logo.png"}
            alt="Logo image"
            width="50"
            className="d-inline-block align-top relative mr-1"
          />
          <span> Shoppers</span>
        </Link>
        <UserStatus />
      </CContainer>
    </CNavbar>
  );
}

const wrapperStyle = {
  backgroundColor: "transparent ! important",
  boxShadow: "3px 2px 10px rgba(0, 0, 0, 0.3)",
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "unset",
};
