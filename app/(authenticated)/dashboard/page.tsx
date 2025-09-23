"use client"

import { useUser } from '@clerk/nextjs'
import React, {useState} from 'react'
import { Todo } from '@/app/generated/prisma'

function Dashboard() {
    const {user} = useUser()
    const [todos, setTodos] = useState<Todo[]>([])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard