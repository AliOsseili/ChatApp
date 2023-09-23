import { Box, Button, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";

export default function Header({ socket }) {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    function createNewRoom() {
        const roomId = uuidv4();
        navigate(`/room/:${roomId}`);
        socket.emit("new-room-created", { roomId });
        setRooms([...rooms, roomId]);
    }

    useEffect(() => {
        if (!socket) return;

        socket.on("new-room-created", ({ roomId }) => {
            setRooms([...rooms, roomId]);
        });
    }, [socket]);
    return (
        <Card sx={{ marginTop: 5, backgroundColor: "grey" }} raised>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Link style={{ textDecoration: "none" }} to="/home">
                        <Button sx={{ color: "white" }} variant="text">
                            Home
                        </Button>
                    </Link>
                </Box>
                {rooms.map((room) => (
                    <Link
                        style={{ textDecoration: "none" }}
                        to={`/room/:${room}`}
                    >
                        <Button sx={{ color: "white" }} variant="text">
                            {room}
                        </Button>
                    </Link>
                ))}

                <Button
                    sx={{ color: "white" }}
                    variant="text"
                    onClick={createNewRoom}
                >
                    New Room
                </Button>
            </Box>
        </Card>
    );
}
