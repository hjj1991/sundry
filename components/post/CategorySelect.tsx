'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CategorySelect({ selectedCategory, categories }: { selectedCategory?: string, categories: string[] }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [delayedOpen, setDelayedOpen] = useState(false);

    const handleOpenChange = (
        newOpenState: boolean | ((prevState: boolean) => boolean)
    ) => {
        if (newOpenState) {
            setOpen(newOpenState);
            setDelayedOpen(newOpenState);
        } else {
            setOpen(newOpenState);
            setTimeout(() => {
                setDelayedOpen(newOpenState);
            }, 100);
        }
    };

    const handleSelectChange = (value: string) => {
        if (value === 'ALL') {
            router.push('/posts');
        } else {
            router.push(`/posts/${value}`);
        }
    };

    const selectCategory = selectedCategory ? decodeURIComponent(selectedCategory.replace(/\+/g, ' ')) : 'ALL';

    return (
        <div className="mb-8 relative">
            <Select
                value={selectCategory}
                onValueChange={handleSelectChange}
                open={delayedOpen}
                onOpenChange={handleOpenChange}
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
