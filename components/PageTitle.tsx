import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
    title: string;
    description?: string;
    classname?: string
}

export default function PageTitle({title, description, classname}: Props) {
    return (
        <div className={cn("flex flex-col gap-2", classname)}>
            <h1 className="text-3xl font-bold font-heading">
                {title}
            </h1>
            {description && <p className="text-muted-foreground">{description}</p>}
        </div>
    )
}