import { Card, Typography } from "@mui/material";
import React from "react";

export default function Home() {
    return (
        <Card sx={{ marginTop: 5, backgroundColor: "grey" }} raised>
            <Typography> Welcome to chat app!</Typography>
        </Card>
    );
}
