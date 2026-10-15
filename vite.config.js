import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local development mein /api/chat ko handle karta hai
function devApi(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        process.env.GROQ_API_KEY = env.GROQ_API_KEY

        let raw = ''
        for await (const chunk of req) raw += chunk
        try {
          req.body = raw ? JSON.parse(raw) : {}
        } catch {
          req.body = {}
        }

        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (obj) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        }

        try {
          const mod = await server.ssrLoadModule('/src/api/chat.js')
          await mod.default(req, res)
        } catch (e) {
          console.error('API error:', e)
          res.status(500).json({ error: 'Dev API error' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), devApi(env)],
  }
})