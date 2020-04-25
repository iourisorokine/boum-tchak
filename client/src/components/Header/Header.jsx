import React from "react";
import { Link } from "react-router-dom";
import { HeaderLayout, HeaderTitle, ButtonMenu, Wrapper } from "../../ui-kit";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export const Header = (props) => {
  return (
    <HeaderLayout>
      <Wrapper flexDirection="row" justifyContent="space-between">
        <HeaderTitle>Bum-Tchak!</HeaderTitle>
        <div style={{ display: "flex", paddingRight: 20 }}>
          <Link style={linkStyle} to="/listen">
            <ButtonMenu>Listen</ButtonMenu>
          </Link>
          <Link style={linkStyle} to="/">
            <ButtonMenu>Create</ButtonMenu>
          </Link>
          {props.user ? (
            <Link style={linkStyle} to="/profile">
              <ButtonMenu>Profile</ButtonMenu>
            </Link>
          ) : (
            <React.Fragment>
              <Link style={linkStyle} to="/signup">
                <ButtonMenu>Signup</ButtonMenu>
              </Link>
              <Link style={linkStyle} to="/login">
                Login
              </Link>
            </React.Fragment>
          )}
        </div>
      </Wrapper>
    </HeaderLayout>
  );
};
