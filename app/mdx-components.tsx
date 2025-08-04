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
        <figure className="my-8 text-center">
            <Image
                width={width}
                height={height}
                sizes="100vw"
                priority
                className="block mx-auto max-w-full h-auto rounded-lg shadow-md"
                {...props as ImageProps}
            />
            {caption && (
                <figcaption className="mt-2 text-sm text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

const LiDescription = ({children}: { children: React.ReactNode }) => {
    return (
        <span className="font-sans text-base text-foreground">
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === 'code') {
                    return React.cloneElement(child as React.ReactElement, {
                        className: 'bg-accent text-accent-foreground py-0.5 px-1 rounded text-sm',
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
            <h1 className={cn("text-4xl md:text-5xl font-bold font-heading my-8 scroll-mt-24 break-words", props.className)} {...props} />
        ),
        h2: (props) => (
            <h2 className={cn("text-3xl md:text-4xl font-bold font-heading my-6 scroll-mt-24 break-words", props.className)} {...props} />
        ),
        h3: (props) => (
            <h3 className={cn("text-2xl md:text-3xl font-bold font-heading my-5 scroll-mt-24 break-words", props.className)} {...props} />
        ),
        h4: (props) => (
            <h4 className={cn("text-xl md:text-2xl font-bold font-heading my-4 scroll-mt-24 break-words", props.className)} {...props} />
        ),
        h5: (props) => (
            <h5 className={cn("text-lg md:text-xl font-bold font-heading my-3 scroll-mt-24 break-words", props.className)} {...props} />
        ),
        h6: (props) => (
            <h6 className={cn("text-base md:text-lg font-bold font-heading my-2 scroll-mt-24 break-words", props.className)} {...props} />
        ),
        p: ({children}) => (
            <p className="my-4 leading-relaxed text-foreground break-words">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'code') {
                        return React.cloneElement(child as React.ReactElement, {
                            className: 'bg-accent text-accent-foreground py-0.5 px-1 rounded text-sm',
                        });
                    }
                    return child;
                })}
            </p>
        ),
        ul: (props) => (
            <ul className={cn('list-disc list-inside my-4 pl-5 text-foreground break-words', props.className)} {...props} />
        ),
        ol: (props) => (
            <ol className={cn('list-decimal list-inside my-4 pl-5 text-foreground break-words', props.className)} {...props} />
        ),
        li: ({children}) => (
            <li className={cn('my-2 text-foreground break-words')}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'code') {
                        return React.cloneElement(child as React.ReactElement, {
                            className: 'bg-accent text-accent-foreground py-0.5 px-1 rounded text-sm',
                        });
                    }
                    return child;
                })}
            </li>
        ),
        strong: ({children}) => (
            <strong className={cn('font-semibold text-foreground break-words')}>
                {children}
            </strong>
        ),
        a: ({children, ...props}) => (
            <a className={cn("text-primary hover:underline break-words")} {...props}>
                {children}
            </a>
        ),
        blockquote: (props) => (
            <blockquote className={cn("border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground")} {...props} />
        ),
        code: (props) => (
            <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", props.className)} {...props} />
        ),
        pre: (props) => <Pre {...props} />,
        table: (props) => (
            <div className="w-full overflow-auto my-4">
                <table className={cn("w-full caption-bottom text-sm", props.className)} {...props} />
            </div>
        ),
        th: (props) => (
            <th className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", props.className)} {...props} />
        ),
        td: (props) => (
            <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", props.className)} {...props} />
        ),
        CaptionedImage,
        LiDescription,
    };
}
