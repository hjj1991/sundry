"use client";

import {useEffect, useRef} from 'react';
import {usePathname} from "next/navigation";

export default function Giscus() {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!ref.current || ref.current.hasChildNodes()) return;

        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://giscus.app/client.js';
        scriptElem.async = true;
        scriptElem.crossOrigin = 'anonymous';

        scriptElem.setAttribute('data-repo', 'hjj1991/sundry');
        scriptElem.setAttribute('data-repo-id', 'R_kgDOMTIs0g');
        scriptElem.setAttribute('data-category', 'General');
        scriptElem.setAttribute('data-category-id', 'DIC_kwDOMTIs0s4Chh3j');
        scriptElem.setAttribute('data-mapping', 'pathname');
        scriptElem.setAttribute('data-strict', '0');
        scriptElem.setAttribute('data-reactions-enabled', '1');
        scriptElem.setAttribute('data-emit-metadata', '0');
        scriptElem.setAttribute('data-input-position', 'bottom');
        scriptElem.setAttribute('data-theme', 'transparent_dark');
        scriptElem.setAttribute('data-lang', 'en');

        ref.current.appendChild(scriptElem);
    }, []);

    useEffect(() => {
        const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
        iframe?.contentWindow?.postMessage(
            {giscus: {setConfig: {term: pathname}}},
            'https://giscus.app',
        );
    }, [pathname]);

    return <section ref={ref}/>;
}
