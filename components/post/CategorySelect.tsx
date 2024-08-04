'use client';

import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function CategorySelect({ selectedCategory, categories }: { selectedCategory?: string, categories: string[] }) {
    const router = useRouter();
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const handleSelectChange = (value: string) => {
        setIsSelectOpen(false);
        if (value === 'ALL') {
            router.push('/posts');
        } else {
            router.push(`/posts/${value}`);
        }
    };

    const selectCategory = selectedCategory ? decodeURIComponent(selectedCategory.replace(/\+/g, ' ')) : 'ALL';

    return (
        <div className="mb-8" onClick={() => setIsSelectOpen(true)}>
            <Select
                value={selectCategory}
                onValueChange={handleSelectChange}
                onOpenChange={(open) => setIsSelectOpen(open)}
            >
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
            {/* 모달이 열려 있을 때 다른 요소 클릭 방지 */}
            {isSelectOpen && (
                <div
                    className="fixed inset-0 bg-transparent"
                    onClick={() => setIsSelectOpen(false)}
                />
            )}
        </div>
    );
}