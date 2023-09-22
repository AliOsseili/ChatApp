import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Room from "./pages/Room";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/chats",
                element: <Chats />,
            },
            {
                path: "/room/:roomId",
                element: <Room />,
            },
        ],
    },
]);

export default router;