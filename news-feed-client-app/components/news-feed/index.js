import React, { useState } from "react";

import {
    Grid
} from "@mui/material";
import NewsItem from "../news-item";
import { map } from "lodash";

export default function NewsFeed({ items }) {
    return (
        <Grid container width={500} direction="column" spacing={2}>
            {map(items, (item, index) =>
            <Grid item ms={12} md={4} justifyContent="flex-start" key={`news_item_${index}`}>
                <NewsItem item={item}> </NewsItem>
            </Grid>)}
        </Grid>
    );

}