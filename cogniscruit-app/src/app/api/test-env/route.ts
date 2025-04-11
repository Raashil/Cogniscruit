import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID ? '✅ Present' : '❌ Missing',
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ? '✅ Present' : '❌ Missing',
    AUTH_SECRET: process.env.AUTH_SECRET ? '✅ Present' : '❌ Missing',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✅ Present' : '❌ Missing',
    MONGODB_URI: process.env.MONGODB_URI ? '✅ Present' : '❌ Missing'
  };

  return NextResponse.json({ 
    message: 'Environment Variables Test',
    environment: process.env.NODE_ENV,
    variables: envVars
  });
} 