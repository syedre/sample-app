import { cookies } from "next/headers";

export async function serverTodos() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listtodos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
