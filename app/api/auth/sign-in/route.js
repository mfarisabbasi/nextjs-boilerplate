import User from "@/backend/models/userModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDB } from "@/backend/configs/database";
import { generateToken } from "@/lib/utils";

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    await connectToDB();

    const userExist = await User.findOne({ email }).select(
      "-resetPasswordToken -resetPasswordExpires"
    );

    if (!userExist) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400, statusText: "Invalid email or password" }
      );
    }

    const correctPassword = await userExist.matchPassword(password);

    if (correctPassword) {
      const token = generateToken(userExist._id);
      cookies().set("auth_token", token, { secure: true });

      return NextResponse.json(
        { user: userExist },
        {
          status: 200,
          statusText: "Sign In Successful",
        }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400, statusText: "Invalid email or password" }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to sign in, Please try again later..",
        error_message: error,
      },
      { status: 500 }
    );
  }
};
