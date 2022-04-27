import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import requireTransform from 'vite-plugin-require-transform';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        requireTransform({}),
        VitePWA({
        registerType: 'autoUpdate',  
        manifest: {
            "name":"Simple Quiz",
            "short_name":"Simple Quiz",
            "theme_color":"#8463ff",
            "icons":[
            {"src":"./img/icons/android-chrome-144x144.png", "sizes":"144x144","type":"image/png"},
            ],
            "start_url":".",
            "display":"standalone",
            "background_color":"#FFFFFF"
        },
        workbox: {
            // workbox options for generateSW
        }
        })
    ],
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "./src") // map '@' to './src' 
        },
    }
})