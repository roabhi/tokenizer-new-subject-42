// src/app/api/42proxy/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Extract access token from query parameters or headers
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get('accessToken')

  if (!accessToken) {
    return NextResponse.json({ error: 'Missing access token' }, { status: 400 })
  }

  // Make the request to the 42 API
  try {
    const apiResponse = await fetch('https://api.intra.42.fr/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from 42 API' },
        { status: apiResponse.status }
      )
    }

    // Pass the 42 API response back to the frontend
    const data = await apiResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching data from 42 API:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
