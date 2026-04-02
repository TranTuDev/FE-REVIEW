export const createSubmisson = async (formData: FormData) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/submissions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};

export const getSubmissions = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/submissions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const deleteSubmission = async (id: string) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5000/api/submissions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
