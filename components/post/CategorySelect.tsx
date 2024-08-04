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
            {/* `Select` 박스가 열렸을 때 여백을 추가하여 클릭 충돌을 방지합니다 */}
            {isSelectOpen && (
                <div 
                    className="absolute inset-0 bg-transparent"
                    style={{ margin: '20px' }} // 여백 추가
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
                <SelectContent className="mt-2">
                    <SelectItem value="ALL">전체</SelectItem>
                    {categories.map((category, index) => (
                        <SelectItem key={index} value={category}>{category}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}