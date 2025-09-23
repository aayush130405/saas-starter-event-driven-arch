"use client"

import { useUser } from '@clerk/nextjs'
import React, {useCallback, useState} from 'react'
import { Todo } from '@/app/generated/prisma'
import { useDebounceValue } from 'usehooks-ts'

function Dashboard() {
    const {user} = useUser()
    const [todos, setTodos] = useState<Todo[]>([])
    const [searchTerm, setSearchTerm] = useState('')

    const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300)     //to reduce unnecessary api calls

    const fetchTodos = useCallback(async (page: number) => {
        try {
            const response = await fetch(`/api/todos?page=${page}&search=${debouncedSearchTerm}`)
        } catch (error) {
            
        }
    }, [debouncedSearchTerm])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard