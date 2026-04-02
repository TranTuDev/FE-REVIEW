"use client";

import { useEffect, useRef, useState } from "react";
import ChatList from "@/components/chat/chatList";
import ChatBox from "@/components/chat/chatBox";
import MessageInput from "@/components/chat/messageInput";
import { socket } from "@/services/socketService";
import { getChatHistory } from "@/services/chatService";
import { getUsers } from "@/services/userService";

type User = {
    id: string;
    name: string;
};

type Message = {
    sender: string;
    text: string;
};

export default function ChatPage() {
    const currentUser = localStorage.getItem("userId") || "user1";

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const bottomRef = useRef<HTMLDivElement>(null);

    const roomId = selectedUser
        ? [currentUser, selectedUser.id].sort().join("_")
        : "";

    useEffect(() => {
        const loadUsers = async () => {
            const data = await getUsers();
            setUsers(data.filter((u: User) => u.id !== currentUser));
        };

        loadUsers();
    }, []);

    useEffect(() => {
        if (!roomId) return;

        setMessages([]);

        const loadMessages = async () => {
            const history = await getChatHistory(roomId);
            setMessages(history);
        };

        loadMessages();

        socket.emit("joinRoom", { roomId });

        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [roomId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const handleSend = (message: string) => {
        if (!roomId || !message.trim()) return;

        socket.emit("sendMessage", {
            roomId,
            sender: currentUser,
            message,
        });
    };

    return (
        <div className="flex h-screen">
            <ChatList users={users} onSelect={setSelectedUser} />

            <div className="flex flex-col flex-1">
                <ChatBox messages={messages} bottomRef={bottomRef} />
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    );
}
