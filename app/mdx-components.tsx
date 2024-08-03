import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import React, {ReactNode} from "react";
import {cn} from "@/lib/utils";


const LiDescription = ({ children }: { children: ReactNode }) => {
    return (
        <span className="font-thin mt-2 block">
            {React.Children.map(children, (child) => {
                // Check if child is a valid React element and type is `code`
                if (React.isValidElement(child) && child.type === 'code') {
                    // Apply styles to `code` elements
                    return React.cloneElement(child as React.ReactElement, {
                        className: 'bg-teal-50 text-teal-700 py-0.5 px-1 rounded text-sm',
                    });
                }
                // Render other children as is
                return child;
            })}
        </span>
    );
};


export function useMDXComponents(): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => <h1 className={cn("text-6xl fonts-bold my-8")}>{children}</h1>,
        h2: ({ children }) => <h2 className={cn("text-4xl fonts-bold my-8")}>{children}</h2>,
        p: ({ children }) => (
            <p className="my-6 text-slate-500">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'code') {
                        return React.cloneElement(child as React.ReactElement, {
                            className: 'bg-teal-50 text-teal-700 py-0.5 px-1 rounded text-sm',
                        });
                    }
                    return child;
                })}
            </p>
        ),
        li: ({ children }) => (
            <li className={cn('my-4 text-gray-800 relative pl-6 bg-gradient-to-r from-yellow-100 to-red-100 border-l-4 border-yellow-500 rounded-lg p-4 shadow-md')}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'code') {
                        return React.cloneElement(child as React.ReactElement, {
                            className: 'bg-teal-50 text-teal-700 py-0.5 px-1 rounded text-sm',
                        });
                    }
                    return child;
                })}
            </li>
        ),
        strong: ({children}) => (
            <strong className={cn('font-semibold text-slate-700')}>
                {children}
            </strong>
        ),
        div: ({children}) => <div className={cn("my-4")}>{children}</div>,
        section: ({children}) => <section className={cn("my-6")}>{children}</section>,
        img: (props) => (
            <Image
                sizes="100vw"
                style={{width: '100%', height: 'auto'}}
                {...(props as ImageProps)}
            />
        ),
        a: ({ children, ...props }) => (
            <a className={cn("text-indigo-600 hover:text-indigo-400 break-words")} {...props}>
                {children}
            </a>
        ),
        LiDescription
    }
}