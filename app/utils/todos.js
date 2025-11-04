export async function postTodo(name, description) {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/addtodo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create todo");
  }

  return response;
}

export async function updateTodo(id, name, description) {
  // const token = localStorage.getItem("token");
  const response = await fetch(`api/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  return response;
}

export async function listTodos() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/"; // redirect to login if not logged in
    return;
  }

  const response = await fetch("/api/listtodos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

// apis/todos.js
export async function deleteTodo(id) {
  const res = await fetch(`/api/todo/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to delete todo");
  }

  return res.json(); // return deleted todo data
}
