import React from "react";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
    Button,
    Box,
    Typography,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Card,
    InputLabel,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
export default function ChatWindow() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const { socket } = useOutletContext();
    const { roomId } = useParams();

    useEffect(() => {
        if (!socket) return;

        socket.on("message-from-server", (data) => {
            console.log(data);
            setChat((prev) => [
                ...prev,
                { message: data.message, received: true },
            ]);
        });
        socket.on("typing-started-from-server", () => {
            setTyping(true);
        });

        socket.on("typing-stopped-from-server", () => {
            setTyping(false);
        });
    }, [socket]);

    function handleForm(e) {
        e.preventDefault();
        socket.emit("send-message", { message, roomId });
        setChat((prev) => [...prev, { message: message, received: false }]);
        setMessage("");
    }

    function handleInput(e) {
        setMessage(e.target.value);
        socket.emit("typing-started", { roomId });

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(
            setTimeout(() => {
                socket.emit("typing-stopped", { roomId });
            }, 1000)
        );
    }

    return (
        <Card
            sx={{
                padding: 2,
                marginTop: 10,
                width: "60%",
                backgroundColor: "darkgrey",
            }}
        >
            {roomId && <Typography>Room: {roomId}</Typography>}
            <Box sx={{ marginBottom: 5, color: "white" }}>
                {chat.map((data) => (
                    <Typography
                        sx={{
                            textAlign: data.received ? "left" : "right",
                        }}
                    >
                        {data.message}
                    </Typography>
                ))}
            </Box>
            <Box component="form" onSubmit={handleForm}>
                {typing && (
                    <InputLabel
                        sx={{ color: "white" }}
                        shrink
                        htmlFor="message-input"
                    >
                        typing...
                    </InputLabel>
                )}

                <OutlinedInput
                    sx={{
                        color: "white",
                        input: { textAlign: "right" },
                    }}
                    fullWidth
                    id="message-input"
                    type={message}
                    placeholder="Write your message"
                    onChange={handleInput}
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
    );
}
