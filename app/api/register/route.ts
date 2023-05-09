import { prisma } from "@/lib/utils/prisma";
import { genSaltSync, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { Name, Email, Password, DateOfBirth } = (await req.json()) as {
      Name: string;
      Email: string;
      Password: string;
      DateOfBirth: Date;
    };
    const salt = await genSaltSync(12);
    const hashed_password = await hash(Password, salt);
  

    const user = await prisma.applicationUser.create({
      data: {
        UserName: Name,
        Email: Email,
        FirstName: "",
        LastName: "",
        MiddleName: "",
        MobileNumber: "",
        Gender: "",
        DateOfBirth: DateOfBirth,
        BloodGroup: "",
        Address1: "",
        Address2: "",
        City: "",
        State: "",
        PostalCode: null,
        Country: "",
        ApplicationUserMembership: {
            create: {
                Password:hashed_password,
                PasswordSalt:salt,
                SecurityQuestion:'',
                SecurityPassword:'',
            }
        }
      },
      include: {
        ApplicationUserMembership: true
      }
    });

    return NextResponse.json({
      user: {
        id: user.Id,
        name: user.UserName,
        email: user.Email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
