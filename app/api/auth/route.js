import { NextResponse } from 'next/server.js'
import argon2 from 'argon2'
import prisma from '../../../prisma/client.ts'
import generateToken from '../../../utils/generateToken.ts'

export async function POST(req) {
  const url = new URL(req.url)
  const query = url.searchParams.get('endpoint')

  if (query === 'REGISTER') {
    const user = await req.json()

    try {
      const existingUser = await prisma.user.findFirst({
        where: { username: user.username }
      })

      if (existingUser)
        return NextResponse.json(
          { message: 'Invalid credentials', sliceName: 'authApi' },
          { status: 404 }
        )

      const hashedPassword = await argon2.hash(user.password)

      const createdUser = await prisma.user.create({
        data: {
          username: user.username,
          password: hashedPassword,
          isAdmin: true
        }
      })

      const token = generateToken(
        { username: createdUser.username, isAdmin: true },
        '1d'
      )

      req.user = {
        id: createdUser.id,
        username: createdUser.username,
        token
      }

      return NextResponse.json(
        { accountWasCreated: true, token, isAdmin: createdUser.isAdmin },
        { status: 201 }
      )
    } catch (err) {
      return NextResponse.json({
        message: err.message,
        name: err.name,
        sliceName: 'authApi'
      })
    }
  }

  if (query === 'LOGIN') {
    try {
      const user = await req.json()
      const existingUser = await prisma.user.findFirst({
        where: { username: user.username }
      })

      if (!existingUser) {
        return NextResponse.json(
          { message: 'Invalid credentials', sliceName: 'authApi' },
          { status: 404 }
        )
      }

      const isPasswordValid = await argon2.verify(
        existingUser.password,
        user.password
      )

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Invalid credentials', sliceName: 'authApi' },
          { status: 401 }
        )
      }

      const token = generateToken(
        {
          username: existingUser.username,
          isAdmin: existingUser.isAdmin,
          id: existingUser.id
        },
        '1d'
      )

      req.user = {
        id: existingUser.id,
        username: existingUser.username,
        token,
        isAdmin: existingUser.isAdmin
      }

      return NextResponse.json(
        { isAuthenticated: true, token, isAdmin: existingUser.isAdmin },
        { status: 200 }
      )
    } catch (err) {
      return NextResponse.json(
        {
          message: err.message,
          name: err.name
        },
        { status: 500 }
      )
    }
  }

  if (query === 'VERIFY_REGISTER_CODE') {
    try {
      const { code } = await req.json()

      const codeToMatch = process.env.NEXT_PUBLIC_REGISTER_CODE

      if (code !== codeToMatch) {
        return NextResponse.json(
          { message: 'Invalid Code', codeValidated: false },
          { status: 404 }
        )
      }

      return NextResponse.json({ codeValidated: true }, { status: 200 })
    } catch (err) {
      return NextResponse.json(
        {
          message: err.message,
          name: err.name
        },
        { status: 500 }
      )
    }
  }
}
