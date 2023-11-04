import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { NewsItemAdd, NewsItem } from "../news-items";
import { map } from "lodash";

export default function NewsItemList({
  items,
  editable,
  addable,
  onItemAdded,
}) {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const onAddSuccess = (itemData) => {
    handleCloseAddDialog();
    onItemAdded(itemData);
  };

  return (
    <>
      {addable && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          style={{ margin: "20px 0" }}
        >
          Add News Item
        </Button>
      )}

      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add a News Item</DialogTitle>
        <DialogContent>
          <NewsItemAdd onAddSuccess={onAddSuccess} />
        </DialogContent>
      </Dialog>

      <Grid container width={500} direction="column" spacing={2}>
        {items && items.length > 0 ? (
          map(items, (item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={`news_item_${index}`}
              justifyContent="flex-start"
            >
              <NewsItem item={item} editable={editable} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            No items available.
          </Typography>
        )}
      </Grid>
    </>
  );
}
