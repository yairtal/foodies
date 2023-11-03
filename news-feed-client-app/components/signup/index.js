import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { signup } from "../../services/authService";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
} from "@mui/material";

export default function SignupLogin({ onClose }) {
  const { setHasToken } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignupLogin = async () => {
    try {
      const data = await signup(phoneNumber);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setHasToken(true);
        onClose();
      } else {
        console.error("No token received from server.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Signup/Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="phone"
          label="Phone Number"
          type="text"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignupLogin} color="primary">
          Signup/Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
