import React from "react";
import { Link } from "react-router-dom";
import { HeaderLayout, HeaderTitle, ButtonMenu } from "../../ui-kit";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export const Header = () => {
  return (
    <HeaderLayout>
      <HeaderTitle>Bum-Tchak!</HeaderTitle>
      <Link style={linkStyle} to="/listen">
        <ButtonMenu>Listen</ButtonMenu>
      </Link>
      <Link style={linkStyle} to="/">
        <ButtonMenu>Create</ButtonMenu>
      </Link>
      <Link style={linkStyle} to="/signup">
        <ButtonMenu>Signup</ButtonMenu>
      </Link>
      <Link style={linkStyle} to="/login">
        Login
      </Link>
    </HeaderLayout>
  );
};
