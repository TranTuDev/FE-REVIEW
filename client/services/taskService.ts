import API_URL from "@/lib/api";

type TaskForm = {
  title: string;
  assignedTo: string;
  status: string;
  dueDate: string;
};

const getToken = () => localStorage.getItem("token");

export const getTasks = async () => {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
export const createTask = async (data: TaskForm) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.log("submit data:", data);
    throw new Error(result.message || "Create task failed");
  }

  return result;
};


export const updateTask = async (id: string, data: TaskForm) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteTask = async (id: string) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
