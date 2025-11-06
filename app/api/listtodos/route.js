export async function GET(req) {
  try {
    // Get the Authorization header from client request
    // const authHeader = req.headers.get("authorization");
    const authHeader = (await headers()).get("authorization");

    // Proxy the request to your backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listtodos`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch todos" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("List todos error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
