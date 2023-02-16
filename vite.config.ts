import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from "@rollup/plugin-typescript";

const config_dev: UserConfig = {
    base: './',
    plugins: [
        vue(),
    ],
    server: {
        port: 12121
    }
}
const config_prod: UserConfig = {
    base: './',
    plugins: [
        typescript({
            target: 'esnext',
            module: 'esnext',
            rootDir: resolve('./lib'),
            declaration: true,
            declarationDir: resolve('./dist'),
            exclude: resolve('node_modules/**')
        })
    ],
    build: {
        lib: {
            name: 'star-map',
            fileName: 'index',
            entry: resolve(__dirname, './lib/index.ts'),
            formats: [ 'es' ]
        },
        minify: 'esbuild',
    },
    esbuild: {
        drop: [ 'console', 'debugger' ]
    }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    if(mode === 'dev') return config_dev
    else if(mode === 'prod') return config_prod
    else throw ReferenceError('invalid argument "mode"')
})
