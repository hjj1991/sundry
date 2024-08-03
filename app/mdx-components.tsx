import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import React from "react";
import {cn} from "@/lib/utils";


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
            <li className="my-4 text-slate-500">
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
        div: ({children}) => <div className={cn("my-4")}>{children}</div>,
        section: ({children}) => <section className={cn("my-6")}>{children}</section>,
        img: (props) => (
            <Image
                sizes="100vw"
                style={{width: '100%', height: 'auto'}}
                {...(props as ImageProps)}
            />
        ),
    }
}