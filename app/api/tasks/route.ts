import { prisma } from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ErrorHandler } from "../errorHandler";


export async function GET(request: NextRequest) {
    const page_str = request.nextUrl.searchParams.get("page");
    const limit_str = request.nextUrl.searchParams.get("limit");
  
    const page = page_str ? parseInt(page_str, 10) : 1;
    const limit = limit_str ? parseInt(limit_str, 100) : 100;
    const skip = (page - 1) * limit;
  
    const tasks = await prisma.tasks.findMany({
      skip,
      take: limit,
    });
  
    let json_response = {
      status: "success",
      results: tasks.length,
      tasks,
    };
    return NextResponse.json(tasks);
  }
  
  export async function POST(request: Request) {
    try {
      const json = await request.json();
      const task = await prisma.tasks.create({
        data: json,
      });
  
      let json_response = {
        status: "success",
        data: {
            task,
        },
      };
      return new NextResponse(JSON.stringify(json_response), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      return ErrorHandler(error, "Task")
    }
  }
  