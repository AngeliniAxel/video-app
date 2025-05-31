import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: [
            'upload.wikimedia.org',
            'i.ytimg.com',
            'img.jakpost.net',
            'images-cdn.ispot.tv',
            'cdn0.tnwcdn.com',
        ],
    },
};

export default nextConfig;
