import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";
import { NewsItem } from "../news-items";
import { map } from "lodash";

export default function NewsItemList({ items, editable }) {
  if (!items || items.length === 0) {
    return (
      <Typography variant="h6" align="center" color="textSecondary">
        No items available.
      </Typography>
    );
  }
  return (
    <Grid container width={500} direction="column" spacing={2}>
      {map(items, (item, index) => (
        <Grid
          item
          ms={12}
          md={4}
          justifyContent="flex-start"
          key={`news_item_${index}`}
        >
          <NewsItem item={item} editable={editable}>
            {" "}
          </NewsItem>
        </Grid>
      ))}
    </Grid>
  );
}
