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
      <ButtonMenu>
        <Link style={linkStyle} to="/listen">
          Listen
        </Link>
      </ButtonMenu>
      <ButtonMenu>
        <Link style={linkStyle} to="/">
          Create
        </Link>
      </ButtonMenu>
      <Link style={linkStyle} to="/login">
        <ButtonMenu>Login</ButtonMenu>
      </Link>
    </HeaderLayout>
  );
};
