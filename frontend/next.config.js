/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.unsplash.com', 'localhost', 'firebase', 'avatars.githubusercontent.com'],
	},
};

module.exports = nextConfig;
