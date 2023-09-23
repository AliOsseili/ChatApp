import "./App.css";
import { Container, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);
    return (
        <Container>
            <Header socket={socket}></Header>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Outlet context={{ socket }} />
            </Box>
        </Container>
    );
}

export default App;
