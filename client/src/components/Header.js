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
    async function fetchRooms() {
        const res = await fetch("http://localhost:4000/rooms");
        const { rooms } = await res.json();
        setRooms(rooms);
        console.log(rooms);
    }

    useEffect(() => {
        if (!socket) return;

        socket.on("new-room-created", ({ roomId }) => {
            fetchRooms();
        });
    }, [socket]);

    useEffect(() => {
        fetchRooms();
    }, []);
    return (
        <Card sx={{ marginTop: 5, backgroundColor: "grey" }} raised>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Link style={{ textDecoration: "none" }} to="/home">
                        <Button sx={{ color: "white" }} variant="text">
                            Home
                        </Button>
                    </Link>

                    {rooms.map((room) => (
                        <Link
                            key={room.id}
                            style={{ textDecoration: "none" }}
                            to={`/room/:${room.roomId}`}
                        >
                            <Button sx={{ color: "white" }} variant="text">
                                {room.name}
                            </Button>
                        </Link>
                    ))}
                </Box>
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
