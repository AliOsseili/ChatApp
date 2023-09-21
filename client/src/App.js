import "./App.css";
import { Container } from "@mui/material";

import ChatWindow from "./components/ChatWindow";

function App() {
    return (
        <div>
            <Container>
                <ChatWindow></ChatWindow>
            </Container>
        </div>
    );
}

export default App;
