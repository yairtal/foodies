import { useState } from "react";
import {
  Alert,
  Button,
  TextField,
  Container,
  Typography,
  Snackbar,
} from "@mui/material";
import { addItem } from "../../services/itemService";
export default function NewsItemAdd() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    link: {
      text: "",
      path: "",
    },
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "linkText" || name === "path") {
      const key = name === "linkText" ? "text" : name;
      setFormData((prevState) => ({
        ...prevState,
        link: {
          ...prevState.link,
          [key]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addItem(formData);
      setOpenSuccessSnackbar(true);
    } catch (error) {
      console.error(error);
      setOpenErrorSnackbar(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add a New Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="text"
          label="Text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="image"
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="linkText"
          label="Link Text"
          name="linkText"
          value={formData.link.text}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="linkPath"
          label="Link Path"
          name="path"
          value={formData.link.path}
          onChange={handleInputChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Add Item
        </Button>
      </form>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert onClose={() => setOpenSuccessSnackbar(false)} severity="success">
          Item added successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          Error adding item. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
}
