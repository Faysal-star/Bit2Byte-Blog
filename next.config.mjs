/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
            pathname: '/**',
        }, 
        {
            protocol: 'http',
            hostname: '88.222.244.211',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'img.icons8.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'i.postimg.cc',
            pathname: '/**',
            port: '',
        },
        {
            protocol: 'http',
            hostname: 'apiendpoint.site',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'apiendpoint.site',
            port: '',
            pathname: '/**',
        },
    
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "https://88.222.244.211/api/v1",
  },
};

export default nextConfig;
