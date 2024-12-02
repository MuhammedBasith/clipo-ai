/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'r2.starryai.com',
                port: '',
                pathname: '/results/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'img.cdn-pictorem.com',
                port: '',
                pathname: '/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'photostylelab.com',
                port: '',
                pathname: '/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;