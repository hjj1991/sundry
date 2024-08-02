import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import {ReactNode} from "react";
import {cn} from "@/lib/utils";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const RedText = ({ children }: { children: ReactNode }) => {
    return <span style={{ color: 'red' }}>{children}</span>;
};


export function useMDXComponents(): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => <h1 className={cn("text-6xl font-bold")}>{children}</h1>,
        img: (props) => (
            <Image
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                {...(props as ImageProps)}
            />
        ),
        RedText,
    }
}