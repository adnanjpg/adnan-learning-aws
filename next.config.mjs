// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */
// await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
    // webpack
    webpack: (webpackConfig, { }) => {
        // https://github.com/mysqljs/mysql/issues/1655#issuecomment-477409968

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        webpackConfig.optimization.minimize = false;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return webpackConfig;
    },
};

export default config;
