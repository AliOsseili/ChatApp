import BaseController from "./BaseController.js";
import Rooms from "../../models/Rooms.js";
export default class RoomController extends BaseController {
    joinRoom = ({ roomId }) => {
        this.socket.join(roomId);
    };

    newRoomCreated = ({ roomId }) => {
        const room = new Rooms({
            name: "Test",
            roomId: roomId,
        });
        room.save();
        this.socket.broadcast.emit("new-room-created", { roomId });
    };
}
