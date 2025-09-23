"use client"

import { useUser } from '@clerk/nextjs'
import React, {useCallback, useState} from 'react'
import { Todo } from '@/app/generated/prisma'
import { useDebounceValue } from 'usehooks-ts'

function Dashboard() {
    const {user} = useUser()
    const [todos, setTodos] = useState<Todo[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState('')
    const [currentPage, setCurrentPage] = useState('')

    const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300)     //to reduce unnecessary api calls

    const fetchTodos = useCallback(async (page: number) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/todos?page=${page}&search=${debouncedSearchTerm}`)

            if(!response.ok) {
                throw new Error("Failed to fetch todos")
            }

            const data = await response.json()
            setTodos(data.todos)
            setTotalPages(data.totalPages)
            setCurrentPage(data.currentPage)

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }, [debouncedSearchTerm])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard