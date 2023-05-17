import { NextResponse } from "next/server";

export function ErrorHandler(error: any, entityName: string = "Item"): NextResponse{

    if (error.code === "P2002") {
        let error_response = {
          status: "fail",
          message: `${entityName} already exists`,
        };
        return new NextResponse(JSON.stringify(error_response), {
          status: 409,
          headers: { "Content-Type": "application/json" },
        });
      }

    if (error.code === "P2025") {
        let error_response = {
            status: "fail",
            message: `No ${entityName} with the Provided ID Found`,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    let error_response = {
        status: "error",
        message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
}