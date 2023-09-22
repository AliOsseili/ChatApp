import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import React from "react";

export default function Header() {
    const roomId = uuidv4();
    return (
        <Card sx={{ marginTop: 5, backgroundColor: "grey" }} raised>
            <Link style={{ textDecoration: "none" }} to="/home">
                <Button sx={{ color: "white" }} variant="text">
                    Home
                </Button>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/chats">
                <Button sx={{ color: "white" }} variant="text">
                    Chats
                </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to={`/room/:${roomId}`}>
                <Button sx={{ color: "white" }} variant="text">
                    Room 1
                </Button>
            </Link>
        </Card>
    );
}
