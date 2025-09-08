import {clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/admin(.*)'])

const publicRoutes = [
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/api/webhook/register'
]

export default clerkMiddleware(async (auth, req) => {

  const {userId} = await auth()

  const {users} = await clerkClient()

  //if user is not signed in
  if(!userId && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  } 

  //user is logged in
  if(userId) {
    const user = await users.getUser(userId)
    const role = user.publicMetadata.role as string | undefined
    
    //redirect admin
    if(role === 'admin' && req.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect("/admin")
    }
    
  }

  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}