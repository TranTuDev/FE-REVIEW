type Task = {
  id: string;
  title: string;
  assignedTo: string;
  status: "Pending" | "Done";
  dueDate: string;
};

type TableProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function Table({
  tasks,
  onEdit,
  onDelete,
}: TableProps) {
  return (
    <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left px-4 py-3">Task Name</th>
          <th className="text-left px-4 py-3">Assigned</th>
          <th className="text-left px-4 py-3">Status</th>
          <th className="text-left px-4 py-3">Due Date</th>
          <th className="text-left px-4 py-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <tr key={task.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium">{task.title}</td>
              <td className="px-4 py-3">{task.assignedTo}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${task.status === "Done"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-3">{task.dueDate}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center py-4 text-gray-500">
              No tasks found
            </td>
          </tr>
        )}
      </tbody>

    </table>

  );
}
