import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: data?.message },
        { status: response.status }
      );
    }
    const cookieStore = await cookies();

    cookieStore.set("token", data.token);

    return Response.json(data);
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
