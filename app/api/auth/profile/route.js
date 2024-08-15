import User from "@/backend/models/userModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDB } from "@/backend/configs/database";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    await connectToDB();

    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({
        status: 401,
        statusText: "User not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "Something went wrong getting profile" },
        { status: 400, statusText: "Something went wrong getting profile" }
      );
    }

    return NextResponse.json(
      { user: user },
      {
        status: 200,
        statusText: "Profile fetched successfully",
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to get profile, Please try again later..",
        error_message: error,
      },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    cookies().delete("auth_token");

    return NextResponse.json({
      status: 200,
      statusText: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to logout, Please try again later..",
        error_message: error,
      },
      { status: 500 }
    );
  }
};
