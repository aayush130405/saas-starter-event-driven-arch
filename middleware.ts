import {clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/api/webhook/register'
])

export default clerkMiddleware(async (auth, req) => {

  const {userId} = await auth()

  const {users} = await clerkClient()

  //if user is not logged in
  if(!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  } 

  //user is logged in
  if(userId) {
    try {
      const user = await users.getUser(userId)
      const role = user.publicMetadata.role as string | undefined
      
      //redirect admin
      if(role === 'admin' && req.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }
  
      //prevent non admin user to access admin resource
      if(role !== 'admin' && req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
  
      //redirect authed users trying to access public sign-in sign-up routes
      if(isPublicRoute(req) && req.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL(role === 'admin' ? '/admin/dashboard' : '/dashboard', req.url))
      }
    } catch (error) {
      console.error(error)
      return NextResponse.redirect(new URL('/error', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}