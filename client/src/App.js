import { useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
function App() {
    useEffect(() => {
        const socket = io("http://localhost:4000");
    }, []);
    return (
        <div>
            Hello socket{" "}
            <Button varian t="text">
                Text
            </Button>
        </div>
    );
}

export default App;
