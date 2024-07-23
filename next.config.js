const withMDX = require('@next/mdx')()

const nextConfig = {
    output: 'standalone',
    // 다른 설정들
    env: {
        API_SERVER_HOST: process.env.API_SERVER_HOST,
    },
    // 마크다운 및 MDX 파일을 포함시키기 위해 페이지 확장자 설정
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

module.exports = withMDX(nextConfig)