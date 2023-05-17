import { prisma } from "@/app/utils/prisma";
import { NextResponse } from "next/server";
import { ErrorHandler } from "../../errorHandler";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const task = await prisma.tasks.findUnique({
        where: {
            Id: parseInt(id),
        },
    });

    if (!task) {
        let error_response = {
            status: "fail",
            message: "No Task with the Provided ID Found",
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    let json_response = {
        status: "success",
        data: {
            task,
        },
    };
    return NextResponse.json(json_response);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const Id = parseInt(params.id);
        let json = await request.json();

        const updated_task = await prisma.tasks.update({
            where: { Id },
            data: json,
        });

        let json_response = {
            status: "success",
            data: {
                task: updated_task,
            },
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
       return ErrorHandler(error, "Task");
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const Id = parseInt(params.id);
        await prisma.tasks.delete({
            where: { Id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
       return ErrorHandler(error, "Task");
    }
}
