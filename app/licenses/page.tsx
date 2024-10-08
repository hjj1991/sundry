import fs from 'fs';
import path from 'path';
import { ExternalLink } from 'lucide-react';
import { NpmDependency } from '@/types/common';
import Link from 'next/link';

async function fetchLicenses(): Promise<NpmDependency[]> {
    const filePath = path.join(process.cwd(), 'public/licenses.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function LicensesPage() {
    const licenses = await fetchLicenses();

    return (
        <div className="flex flex-col items-center mb-10 space-y-2 mt-28">
            <h1 className="text-5xl">Licenses</h1>
            <h2 className="text-xl">All licenses used for 잡다창고</h2>
            <div className="grid max-w-3xl grid-cols-12 gap-10 mx-auto">
                {licenses.map((l) => (
                    <a
                        key={l.name}
                        className="flex-col space-y-1 overflow-hidden col-span-full group"
                        href={l.link ? l.link.replace("git+", "").replace("ssh://", "") : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open GitHub repo for ${l.name}`}
                    >
                        <div className="inline-flex items-end">
                            <div className="space-x-2 duration-300 ease-in group-hover:translate-x-6 group-hover:opacity-0">
                                <span className="text-2xl">{l.name}</span>
                                <span className="opacity-50">{l.installedVersion}</span>
                            </div>

                            {l.link && (
                                <div className="absolute mb-1 text-blue-600 duration-300 ease-in -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                    <ExternalLink />
                                </div>
                            )}
                        </div>

                        <div className="text-gray-400">
                            {[l.licenseType, l.author].filter(Boolean).join(", ")}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
