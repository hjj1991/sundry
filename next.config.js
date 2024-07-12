const nextConfig = {
    output: 'standalone',
    // 다른 설정들
    env: {
        API_SERVER_HOST: process.env.API_SERVER_HOST,
    },
};

module.exports = nextConfig;