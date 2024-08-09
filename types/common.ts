export type GenerateMetadataProps = {
    title?: string;
    description?: string;
    asPath?: string;
    ogImage?: string;
}

export interface NpmDependency {
    name: string;
    installedVersion: string;
    licenseType?: string;
    author?: string;
    link?: string;
}