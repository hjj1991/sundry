import React from 'react';
import Image, {ImageProps} from 'next/image';
import type {MDXComponents} from 'mdx/types';
import {cn} from '@/lib/utils';
import {Pre} from "@/components/ClipboardButton";

interface CaptionedImageProps extends Omit<ImageProps, 'width' | 'height'> {
    caption?: string;
    width?: number;
    height?: number;
}

const CaptionedImage: React.FC<CaptionedImageProps> = ({caption, width = 800, height = 600, ...props}) => {
    return (
        <figure style={{textAlign: 'center', margin: '20px 0'}}>
            <Image
                width={width}
                height={height}
                sizes="100vw"
                priority
                style={{width: 'auto', height: 'auto', display: 'block', margin: '0 auto'}}
                {...props as ImageProps}
            />
            {caption && (
                <figcaption style={{marginTop: '8px', color: '#666'}}>
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

const LiDescription = ({children}: { children: React.ReactNode }) => {
    return (
        <span className="font-thin mt-2 block">
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === 'code') {
                    return React.cloneElement(child as React.ReactElement, {
                        className: 'bg-teal-50 text-teal-700 py-0.5 px-1 rounded text-sm dark:bg-teal-900 dark:text-teal-300',
                    });
                }
                return child;
            })}
        </span>
    );
};

export function useMDXComponents(): MDXComponents {
    return {
        h1: (props) => (
            <h1 className={cn("text-6xl font-bold my-8 scroll-margin-top-16 dark:text-white", props.className)} {...props} />
        ),
        h2: (props) => (
            <h2 className={cn("text-4xl font-bold my-8 scroll-mt-20 dark:text-white", props.className)} {...props} />
        ),
        p: ({children}) => (
            <p className="my-6 leading-10 text-slate-500 dark:text-slate-400">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'code') {
                        return React.cloneElement(child as React.ReactElement, {
                            className: 'bg-teal-50 text-teal-700 py-0.5 px-1 rounded text-sm dark:bg-teal-900 dark:text-teal-300',
                        });
                    }
                    return child;
                })}
            </p>
        ),
        ul: (props) => (
            <ul className={cn('list-disc list-inside my-4 pl-5 text-gray-800 bg-gray-200 rounded-lg p-4 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:shadow-none', props.className)} {...props} />
        ),
        li: ({children}) => (
            <li className={cn('my-4 text-gray-800 relative pl-6 dark:text-gray-300')}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'code') {
                        return React.cloneElement(child as React.ReactElement, {
                            className: 'bg-teal-50 text-teal-700 py-0.5 px-1 rounded text-sm dark:bg-teal-900 dark:text-teal-300',
                        });
                    }
                    return child;
                })}
            </li>
        ),
        strong: ({children}) => (
            <strong className={cn('font-semibold text-slate-700 dark:text-slate-300 break-words')}>
                {children}
            </strong>
        ),
        div: ({children}) => <div className={cn("my-4")}>{children}</div>,
        section: ({children}) => <section className={cn("my-6")}>{children}</section>,
        a: ({children, ...props}) => (
            <a className={cn("text-indigo-600 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300 break-words")} {...props}>
                {children}
            </a>
        ),
        pre: (props) => <Pre {...props} />,
        LiDescription,
        CaptionedImage
    };
}
