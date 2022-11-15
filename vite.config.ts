import { ConfigEnv, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import { resolve } from 'path';
import pkg from "./package.json";

// https://vitejs.dev/config/

// The boolean type read by loadEnv is a string. This function can be converted to boolean type
// const viteEnv = wrapperEnv(env);
const { name, version } = pkg;
const __APP_INFO__ = {
    pkg: { version, name }
};

// function pathResolve(dir: string) {
// 	return resolve(process.cwd(), '.', dir);
// }

// const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
export default ({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();

    const env = loadEnv(mode, root);

    return {
        // envPrefix: '__',
        root: root,
        base: env.VITE_BASE,
        resolve: {
            alias: [
                {
                    find: "@/",
                    replacement: `${__dirname}\\src/`
                },
                {
                    find: new RegExp("#/"),
                    replacement: `${__dirname}\\src/utils/`
                    // replacement: resolve(__dirname, 'utils')
                },
                {
                    find: new RegExp("$/"),
                    replacement: `${__dirname}\\types/`
                    // replacement: resolve(__dirname, 'utils')
                },
                {
                    find: new RegExp("_/"),
                    replacement: `${__dirname}\\`
                    // replacement: resolve(__dirname, 'utils')
                }
            ],
            extensions: [".js", ".json", ".ts", ".tsx"]
        },
        plugins: [
            vue(),
            vueJsx({
                optimize: true
            }),
            Components({
                resolvers: [ArcoResolver()]
            })
        ],
        define: {
            __APP_VERSION__: JSON.stringify(`打印设计器 V${__APP_INFO__.pkg.version} - ${command === "build" ? +new Date() : "development"}`)
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import './scss/index.scss';`
                }
            }
        },

        build: {
            target: "es2015",
            outDir: "dist",
            // outDir: OUTPUT_DIR,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    // Used to delete console in production environment
                    drop_console: true
                }
            },
            // Turning off brotliSize display can slightly reduce packaging time
            // brotliSize: false,
            chunkSizeWarningLimit: 2000
        },
        // esbuild: {
        // 	jsxFactory: 'h',
        // 	jsxFragment: 'Fragment'
        // },
        server: {
            port: 3006,
            host: true,
            hmr: true
            // open: true
        }
    };
};
