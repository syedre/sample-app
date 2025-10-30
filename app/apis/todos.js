export async function postTodo(name, description) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  return response;
}

export async function updateTodo(id, name, description) {
  // const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/updatetodo/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    }
  );
  return response;
}

export async function listTodos() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/"; // redirect to login if not logged in
    return;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listtodos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
