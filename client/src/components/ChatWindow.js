import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import {
    Button,
    Box,
    Typography,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Card,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
export default function ChatWindow() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("message-from-server", (data) => {
            console.log(data);
            setChat((prev) => [
                ...prev,
                { message: data.message, received: true },
            ]);
        });
    }, [socket]);

    function handleForm(e) {
        e.preventDefault();
        socket.emit("send-message", { message });
        setChat((prev) => [...prev, { message: message, received: true }]);
        setMessage("");
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card
                sx={{
                    padding: 2,
                    marginTop: 10,
                    width: "60%",
                    backgroundColor: "grey",
                }}
            >
                <Box sx={{ marginBottom: 5, color: "white" }}>
                    {chat.map((data) => (
                        <Typography key={data.message}>
                            {data.message}
                        </Typography>
                    ))}
                </Box>
                <Box component="form" onSubmit={handleForm}>
                    <OutlinedInput
                        sx={{ color: "white", width: "100%" }}
                        type={message}
                        placeholder="Write your message"
                        onChange={(e) => setMessage(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    type="submit"
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button variant="text" type="submit">
                        Send!
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}
