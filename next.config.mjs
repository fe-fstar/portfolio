import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: async () => {
        return 'build';
    },
    webpack: (config, { buildId }) => {
        config.output.filename = config.output.filename.replace('[chunkhash]', buildId);
        return config;
    },
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default withNextIntl(nextConfig);