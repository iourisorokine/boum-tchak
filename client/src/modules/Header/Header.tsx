import React, { FC } from "react";
import { Link } from "react-router-dom";
import { HeaderLayout, HeaderTitle, MenuButton, Wrapper } from "../../ui-kit";
import { User } from "../../types";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const textLinkStyle = {
  textDecoration: "none",
  color: "black",
  padding: "0 8px",
};

export interface HeaderProps {
  user: User;
}

export const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <HeaderLayout>
      <Wrapper flexDirection="row" justifyContent="space-between">
        <Link style={linkStyle} to="/">
          <HeaderTitle>Boum-Tchak!</HeaderTitle>
        </Link>
        <div
          style={{ display: "flex", paddingRight: 20, alignItems: "center" }}
        >
          <Link style={linkStyle} to="/listen">
            <MenuButton>Listen</MenuButton>
          </Link>
          <Link style={linkStyle} to="/create">
            <MenuButton>Create</MenuButton>
          </Link>
          <Link style={linkStyle} to="/mix">
            <MenuButton>Mix</MenuButton>
          </Link>
          {user ? (
            <Link style={linkStyle} to="/profile">
              <MenuButton>Profile</MenuButton>
            </Link>
          ) : (
            <Link style={textLinkStyle} to="/login">
              Login
            </Link>
          )}
          <Link style={textLinkStyle} to="/help">
            Help
          </Link>
        </div>
      </Wrapper>
    </HeaderLayout>
  );
};
