export async function POST(req) {
  try {
    const { email } = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.success === false) {
      return Response.json(
        {
          success: false,
          message: data?.message || "Failed to send email.",
        },
        { status: response.status || 500 }
      );
    }

    // Success
    return Response.json({
      success: true,
      message: data?.message || "Email sent successfully!",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal server error while sending email.",
      },
      { status: 500 }
    );
  }
}
