'use client'

import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCallback } from 'react'

export default function CategorySelect({ selectedCategory, categories }: { selectedCategory?: string, categories: string[] }) {
    const router = useRouter()

    const handleSelectChange = useCallback((value: string) => {
        if (value === 'ALL') {
            router.push('/posts')
        } else {
            router.push(`/posts/${value}`)
        }
    }, [router])

    const selectCategory = selectedCategory ? decodeURIComponent(selectedCategory.replace(/\+/g, ' ')) : 'ALL'

    return (
        <div className="mb-8">
            <Select value={selectCategory} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">전체</SelectItem>
                    {categories.map((category, index) => (
                        <SelectItem key={index} value={category}>{category}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}