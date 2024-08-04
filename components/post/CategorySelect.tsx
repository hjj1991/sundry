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
        <div className="mb-8 relative">
            {/* 이 div는 Select가 열려 있을 때만 나타나며 클릭을 방지합니다 */}
            {isSelectOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsSelectOpen(false)}
                />
            )}
            <Select 
                value={selectCategory} 
                onValueChange={handleSelectChange} 
                onOpenChange={setIsSelectOpen}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent className="z-50">
                    <SelectItem value="ALL">전체</SelectItem>
                    {categories.map((category, index) => (
                        <SelectItem key={index} value={category}>{category}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}