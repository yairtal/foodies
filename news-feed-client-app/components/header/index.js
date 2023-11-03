import React, { useState, useEffect } from "react";
import { Button, AppBar, Toolbar, Dialog } from "@mui/material";
import { styled } from "@mui/system";
import { useUser } from "../../contexts/UserContext";
import SignupLogin from "../signup";

const StyledAppBar = styled(AppBar)({
  width: "100%",
  height: "50px",
  borderTop: "1px solid #eaeaea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
});

function Header() {
  const { hasToken, setHasToken } = useUser();
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setHasToken(false);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        {hasToken ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button onClick={() => setOpenModal(true)}>Signup/Login</Button>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
              <SignupLogin onClose={() => setOpenModal(false)} />
            </Dialog>
          </>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Header;
