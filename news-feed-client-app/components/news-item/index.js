import React, { useState } from "react";
import { styled } from '@mui/system';

import {
    Card,
    CardContent,
    Typography,
    Button
} from "@mui/material";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});


export default function NewsItem({ item }) {
    return (
        <Card sx={{ width: "100%" }}>
            <CardContent>
                <Img src={item.image} />
                <Typography variant="h5" component="div" color="text.primary" paddingTop={2}>
                    {item.title}
                </Typography>
                <Typography variant="p" color="text.secondary">
                    {item.text}
                </Typography>
                {item.link &&
                    <Typography variant="h5" component="div" justifyContent="right" display="flex">
                        <Button style={{minWidth: "100px"}} variant="contained" href={item.link.path}>{item.link.text}</Button>
                    </Typography>
                }
            </CardContent>
        </Card>
    );
}