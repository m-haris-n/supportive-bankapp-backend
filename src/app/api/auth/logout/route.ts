import { authMiddleware } from "@/app/middleware/authMiddleware";
import { NextRequest } from "next/server";

export const POST = authMiddleware(async (req: NextRequest) => {
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
});
