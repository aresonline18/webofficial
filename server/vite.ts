
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Error</title>
            <script type="module">
              const error = {"message":"Failed to resolve import \"express\" from \"server/vite.ts\". Does the file exist?","stack":"    at TransformPluginContext._formatError (file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49258:41)\n    at TransformPluginContext.error (file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49253:16)\n    at normalizeUrl (file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64291:23)\n    at async file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64423:39\n    at async Promise.all (index 0)\n    at async TransformPluginContext.transform (file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64350:7)\n    at async PluginContainer.transform (file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49099:18)\n    at async loadAndTransform (file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:51977:27)","id":"/dev-server/server/vite.ts","frame":"1  |  import express from \"express\";\n   |                       ^\n2  |  import fs from \"fs\";\n3  |  import path from \"path\";","plugin":"vite:import-analysis","pluginCode":"import express from \"express\";\nimport fs from \"fs\";\nimport path from \"path\";\nimport { createServer as createViteServer, createLogger } from \"vite\";\nimport viteConfig from \"../vite.config\";\nimport { nanoid } from \"nanoid\";\nconst viteLogger = createLogger();\nexport function log(message, source = \"express\") {\n    const formattedTime = new Date().toLocaleTimeString(\"en-US\", {\n        hour: \"numeric\",\n        minute: \"2-digit\",\n        second: \"2-digit\",\n        hour12: true\n    });\n    console.log(`${formattedTime} [${source}] ${message}`);\n}\nexport async function setupVite(app, server) {\n    const serverOptions = {\n        middlewareMode: true,\n        hmr: {\n            server\n        },\n        allowedHosts: true\n    };\n    const vite = await createViteServer({\n        ...viteConfig,\n        configFile: false,\n        customLogger: {\n            ...viteLogger,\n            error: (msg, options)=>{\n                viteLogger.error(msg, options);\n                process.exit(1);\n            }\n        },\n        server: serverOptions,\n        appType: \"custom\"\n    });\n    app.use(vite.middlewares);\n    app.use(\"*\", async (req, res, next)=>{\n        const url = req.originalUrl;\n        try {\n            const clientTemplate = path.resolve(import.meta.dirname, \"..\", \"client\", \"index.html\");\n            // always reload the index.html file from disk incase it changes\n            let template = await fs.promises.readFile(clientTemplate, \"utf-8\");\n            template = template.replace(`src=\"/src/main.tsx\"`, `src=\"/src/main.tsx?v=${nanoid()}\"`);\n            const page = await vite.transformIndexHtml(url, template);\n            res.status(200).set({\n                \"Content-Type\": \"text/html\"\n            }).end(page);\n        } catch (e) {\n            vite.ssrFixStacktrace(e);\n            next(e);\n        }\n    });\n}\nexport function serveStatic(app) {\n    // FIXED: Point to client/dist where the React app actually builds to\n    const distPath = path.resolve(import.meta.dirname, \"..\", \"client\", \"dist\");\n    if (!fs.existsSync(distPath)) {\n        throw new Error(`Could not find the build directory: ${distPath}, make sure to build the client first`);\n    }\n    app.use(express.static(distPath));\n    // fall through to index.html if the file doesn't exist (SPA fallback)\n    app.use(\"*\", (_req, res)=>{\n        res.sendFile(path.resolve(distPath, \"index.html\"));\n    });\n}\n","loc":{"file":"/dev-server/server/vite.ts","line":1,"column":38}}
              try {
                const { ErrorOverlay } = await import("/@vite/client")
                document.body.appendChild(new ErrorOverlay(error))
              } catch {
                const h = (tag, text) => {
                  const el = document.createElement(tag)
                  el.textContent = text
                  return el
                }
                document.body.appendChild(h('h1', 'Internal Server Error'))
                document.body.appendChild(h('h2', error.message))
                document.body.appendChild(h('pre', error.stack))
                document.body.appendChild(h('p', '(Error overlay failed to load)'))
              }
            </script>
          </head>
          <body>
          </body>
        </html>
      