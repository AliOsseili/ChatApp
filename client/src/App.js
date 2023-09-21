import { useEffect, useState } from "react";
import "./App.css";
import { Button, TextField, Box } from "@mui/material";
import { io } from "socket.io-client";

function App() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("message-from-server", (data) => {
            console.log(data);
        });
    }, [socket]);

    function handleForm(e) {
        e.preventDefault();
        socket.emit("send-message", { message });
        setMessage("");
    }

    return (
        <div>
            <Box component="form" onSubmit={handleForm}>
                <TextField
                    label="Write your message"
                    variant="standard"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="text" type="submit">
                    Send!
                </Button>
            </Box>
        </div>
    );
}

export default App;
