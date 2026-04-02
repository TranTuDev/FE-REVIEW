export async function getChatHistory(roomId: string) {
  const res = await fetch(`http://localhost:5001/api/chat/${roomId}`);

  if (!res.ok) {
    throw new Error("Load history failed");
  }

  return res.json();
}
