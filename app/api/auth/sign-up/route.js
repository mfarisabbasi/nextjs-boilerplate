import { NextResponse } from "next/server";
import { connectToDB } from "@/backend/configs/database";
import User from "@/backend/models/userModel";

export const POST = async (req) => {
  const { fullName, email, password } = await req.json();

  try {
    await connectToDB();

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: "Account with this email already exist" },
        { status: 400, statusText: "Account with this email already exist" }
      );
    } else {
      const newUser = new User({
        fullName,
        email,
        password,
      });

      await newUser.save();

      return NextResponse.json({
        status: 201,
        statusText: "Account created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to create new account, Please try again later..",
        error_message: error,
      },
      { status: 500 }
    );
  }
};
