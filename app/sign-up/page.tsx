"use client"

import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
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

function Signup() {
  const {isLoaded, signUp, setActive} = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState('')

  const router = useRouter()

  return (
    <div>Signup</div>
  )
}

export default Signup