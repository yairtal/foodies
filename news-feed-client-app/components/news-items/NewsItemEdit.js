import { useState, useEffect } from "react";
import { Modal, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import { fetchUsers } from "../../services/userService";
import { fetchItemDetails, updateItemUsers } from "../../services/itemService";

export default function NewsItemEdit({ isOpen, itemId, onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState(false);

  useEffect(() => {
    if (itemId && isOpen) {
      // Fetch the item details
      fetchItemDetails(itemId)
        .then((data) => {
          if (!data.allowedUsers || data.allowedUsers.length === 0) {
            setAllUsers(true);
          } else {
            setSelectedUsers(data.allowedUsers);
          }
        })
        .catch((error) => console.error(error));

      // Fetch all users
      fetchUsers()
        .then((data) => setUsers(data))
        .catch((error) => console.error(error));
    }
  }, [itemId, isOpen]);

  const handleSave = () => {
    updateItemUsers(itemId, allUsers ? [] : selectedUsers)
      .then(() => {
        onClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={allUsers}
              onChange={() => {
                setAllUsers(!allUsers);
                setSelectedUsers([]); // Unselect all users when allUsers is checked
              }}
            />
          }
          label="All customers"
        />
        {users.map((user) => (
          <FormControlLabel
            key={user._id}
            control={
              <Checkbox
                disabled={allUsers}
                checked={selectedUsers.includes(user._id)}
                onChange={() => {
                  if (selectedUsers.includes(user._id)) {
                    setSelectedUsers((prev) =>
                      prev.filter((id) => id !== user._id)
                    );
                  } else {
                    setSelectedUsers((prev) => [...prev, user._id]);
                  }
                }}
              />
            }
            label={user.phoneNumber}
          />
        ))}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button color="primary" onClick={onClose} sx={{ mr: 1 }}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
