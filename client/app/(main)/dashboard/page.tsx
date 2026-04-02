"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/table";
import Modal from "@/components/ui/modal";
import Container from "@/components/layout/container";
import { getTasks, createTask, updateTask, deleteTask, } from "@/services/taskService";
import TaskForm, { TaskFormData } from "@/components/task/taskForm";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

type Task = {
  id: string;
  title: string;
  assignedTo: string;
  status: "Pending" | "Done";
  dueDate: string;
};

export default function DashboardPage() {
  const { token, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] =
    useState<"All" | "Pending" | "Done">("All");
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Fetch tasks failed", err);
      toast.error("Lấy task thất bại");
    }
  };


  useEffect(() => {
    if (!loading && token) {
      fetchTasks();
    }
  }, [loading, token]);


  const handleTaskSubmit = async (data: TaskFormData) => {
    console.log("submit data:", data);
    if (editingTask) {
      try {
        await updateTask(editingTask.id, data);
        await fetchTasks();

        setEditingTask(null);
        setOpen(false);

        toast.success("Cập nhật task thành công");
      } catch (error) {
        console.log("Update lỗi", error);
        toast.error("Update thất bại");
      }
      return;
    }

    const tempTask: Task = {
      id: Date.now().toString(),
      ...data,
    };

    setTasks((prev) => [tempTask, ...prev]);

    try {
      await createTask(data);
      await fetchTasks();

      setOpen(false);

      toast.success("Tạo task thành công");
    } catch (error) {
      setTasks((prev) =>
        prev.filter((task) => task.id !== tempTask.id)
      );

      console.log("Tạo lỗi", error);
      toast.error("Tạo task thất bại");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      await fetchTasks();

      toast.success("Xóa task thành công");
    } catch (err) {
      console.log("Delete failed", err);
      toast.error("Xóa thất bại");
    }
  };

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  return (
    <Container>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "All" | "Pending" | "Done")
          }
          className="border px-3 py-2 rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>

        <button
          onClick={() => {
            setEditingTask(null);
            setOpen(true);
          }}
          className="bg-amber-400 px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      <Table
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDeleteTask}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <TaskForm
          defaultValues={editingTask || undefined}
          onSubmit={handleTaskSubmit}
        />
      </Modal>
    </Container>
  );
}
