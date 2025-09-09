"use client"

import React, { useState } from 'react' 
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Eye, EyeOff} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function SignIn() {
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {isLoaded, signIn, setActive} = useSignIn()

    if(!isLoaded) {
        return null;
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault()

        if(!isLoaded) return 

        try {
            const result = await signIn.create({
                identifier: emailAddress, password
            })

            if(result.status === 'complete') {
                await setActive({session: result.createdSessionId})

                router.push("/dashboard")
            } else {
                console.log(JSON.stringify(result, null, 2))
            }
        } catch (error: any) {
            console.error("Error", error.errors[0].message)
            setError(error.errors[0].message)
        }

    }

  return (
    
  )
}

export default SignIn