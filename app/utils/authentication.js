export async function signup(name, email, password) {
  const response = await fetch("api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response;
}

export async function login(email, password) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response;
}

export async function reset(email) {
  const response = await fetch("/api/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response;
}

export async function verifyOtp(otp) {
  const response = await fetch("/api/reset-password/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otp }),
  });
  return response;
}

export async function confirmPassword(new_password, token) {
  const response = await fetch("/api/reset-password/verify-otp", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_password, token }),
  });
  return response;
}
