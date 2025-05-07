// // app/api/admin/login/route.ts
// import { NextResponse } from 'next/server'
// import bcrypt from 'bcryptjs'
// import { cookies } from 'next/headers'

// const ADMIN_USER = 'admin'
// const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10) // Normally stored securely

// export async function POST(request: Request) {
//   const body = await request.json()
//   const { username, password } = body

//   if (username !== ADMIN_USER) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
//   }

//   const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)

//   if (!isPasswordValid) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
//   }

//   // Set a cookie to simulate session (you can use JWT instead if needed)
//   cookies().set('admin-auth', 'true', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//     maxAge: 60 * 60 * 2, // 2 hours
//   })

//   return NextResponse.json({ success: true })
// }


import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// Accessing environment variables securely
const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Hash the password using bcrypt to store in your environment file for better security
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10)

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  // Check if the username matches
  if (username !== ADMIN_USER) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Compare the entered password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)

  // If password is invalid, return an error
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Set a secure cookie to simulate admin session
  cookies().set('admin-auth', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure the cookie is only set over HTTPS in production
    path: '/',
    maxAge: 60 * 60 * 2, // The session is valid for 2 hours
  })

  return NextResponse.json({ success: true })
}
