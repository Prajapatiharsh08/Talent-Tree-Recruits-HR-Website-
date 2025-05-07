import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"
export function middleware(req: NextRequest) {
    const token = req.cookies.get("admin_token")?.value

    if (!token) {                                       
        return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    try {
        jwt.verify(token, SECRET_KEY)
        return NextResponse.next()
    } catch {
        return NextResponse.redirect(new URL("/admin/login", req.url))
    }
}

export const config = {
    matcher: ["/admin/dashboard"],
}
