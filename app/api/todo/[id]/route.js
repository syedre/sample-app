export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        { error: errorText || "Failed to delete todo" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Delete todo error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params; // ✅ required in Next.js 15
    const body = await req.json();
    const { name, description } = body;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/updatetodo/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description: description || " ",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        { error: errorText || "Failed to update todo" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Update todo error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
