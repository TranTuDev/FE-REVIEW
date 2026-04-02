"use client";

import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2 p-4 border-t">
      <input value={text} onChange={(e) => setText(e.target.value)} className="border flex-1 p-2"/>

      <button  onClick={handleSubmit}   className="bg-blue-500 text-white px-4"  >
        Send
      </button>
    </div>
  );
}
