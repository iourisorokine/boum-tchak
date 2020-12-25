import React from "react";
import { Link } from "react-router-dom";
import { HeaderLayout, HeaderTitle, MenuButton, Wrapper } from "../../ui-kit";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const textLinkStyle = {
  textDecoration: "none",
  color: "black",
  padding: "0 8px",
};

export const Header = (props) => {
  return (
    <HeaderLayout>
      <Wrapper flexDirection="row" justifyContent="space-between">
        <Link style={linkStyle} to="/">
          <HeaderTitle>Boum-Tchak!</HeaderTitle>
        </Link>
        <div
          style={{ display: "flex", paddingRight: 20, alignItems: "center" }}>
          <Link style={linkStyle} to="/listen">
            <MenuButton>Listen</MenuButton>
          </Link>
          <Link style={linkStyle} to="/create">
            <MenuButton>Create</MenuButton>
          </Link>
          <Link style={linkStyle} to="/mix">
            <MenuButton>Mix</MenuButton>
          </Link>
          {props.user ? (
            <Link style={linkStyle} to="/profile">
              <MenuButton>Profile</MenuButton>
            </Link>
          ) : (
            <React.Fragment>
              <Link style={linkStyle} to="/signup">
                <MenuButton>Signup</MenuButton>
              </Link>
              <Link style={textLinkStyle} to="/login">
                Login
              </Link>
            </React.Fragment>
          )}
          <Link style={textLinkStyle} to="/help">
            Help
          </Link>
        </div>
      </Wrapper>
    </HeaderLayout>
  );
};
