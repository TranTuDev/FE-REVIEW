type User = {
  id: string;
  name: string;
};

type Props = {
  users: User[];
  onSelect: (user: User) => void;
};

export default function ChatList({ users, onSelect }: Props) {
  return (
    <div className="w-1/4 border-r p-4">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}
