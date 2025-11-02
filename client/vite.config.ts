import { defineConfig } from "/node_modules/.vite/deps/vite.js?v=c804ee64";
import react from "/node_modules/.vite/deps/@vitejs_plugin-react-swc.js?v=d2c8ffb4";
import path from "/@id/__vite-browser-external:path";
// https://vitejs.dev/config/
export default defineConfig(()=>({
        server: {
            host: "::",
            port: 8080
        },
        plugins: [
            react()
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        }
    }));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpdGUuY29uZmlnLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwibmFtZXMiOlsiZGVmaW5lQ29uZmlnIiwicmVhY3QiLCJwYXRoIiwic2VydmVyIiwiaG9zdCIsInBvcnQiLCJwbHVnaW5zIiwicmVzb2x2ZSIsImFsaWFzIiwiX19kaXJuYW1lIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxZQUFZLFFBQVEsT0FBTztBQUNwQyxPQUFPQyxXQUFXLDJCQUEyQjtBQUM3QyxPQUFPQyxVQUFVLE9BQU87QUFFeEIsNkJBQTZCO0FBQzdCLGVBQWVGLGFBQWEsSUFBTyxDQUFBO1FBQ2pDRyxRQUFRO1lBQ05DLE1BQU07WUFDTkMsTUFBTTtRQUNSO1FBQ0FDLFNBQVM7WUFBQ0w7U0FBUTtRQUNsQk0sU0FBUztZQUNQQyxPQUFPO2dCQUNMLEtBQUtOLEtBQUtLLE9BQU8sQ0FBQ0UsV0FBVztZQUMvQjtRQUNGO0lBQ0YsQ0FBQSxHQUFJIn0=