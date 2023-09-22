import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
export default function Room() {
    const params = useParams();
    const socket = io();
    useEffect(() => {
        socket.emit("join-room", { roomId: params.roomId });
        console.log(params);
    }, [params]);
    return (
        <Card sx={{ marginTop: 5, backgroundColor: "grey" }} raised>
            <Typography> Welcome to chat app!</Typography>
        </Card>
    );
}
