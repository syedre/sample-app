export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Proxy the request to your backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: data?.message },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
