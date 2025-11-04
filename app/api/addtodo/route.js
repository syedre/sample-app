export async function POST(req) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    const { name, description } = body; // token comes from client

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        { error: errorText || "Failed to create todo" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error posting todo:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
