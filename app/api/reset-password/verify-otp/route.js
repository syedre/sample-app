export async function POST(req) {
  try {
    const { otp } = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: data?.message,
        },
        { status: response.status || 500 }
      );
    }

    // Success
    return Response.json({
      success: true,
      message: data?.message,
      token: data?.token,
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

export async function PUT(req) {
  try {
    const { new_password, token } = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password, token }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          message: data?.message,
        },
        { status: response.status || 500 }
      );
    }

    // Success
    return Response.json({
      success: true,
      message: data?.message,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Unable to Update Password",
      },
      { status: 500 }
    );
  }
}
