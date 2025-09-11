import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// CORS: allow all by default; restrict via CORS_ORIGIN env in prod
// Support comma-separated list for multiple origins
const corsEnv = process.env.CORS_ORIGIN || '*'
let corsOptions
if (corsEnv === '*') {
  corsOptions = { origin: true }
} else if (corsEnv.includes(',')) {
  const list = corsEnv.split(',').map(s => s.trim()).filter(Boolean)
  corsOptions = {
    origin: (origin, callback) => {
      if (!origin || list.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    }
  }
} else {
  corsOptions = { origin: corsEnv }
}
app.use(cors(corsOptions))
app.use(express.json())

// Storage location: configurable for platforms with persistent volumes
const STORAGE_DIR = process.env.STORAGE_DIR || path.resolve('./server')
try {
  fs.mkdirSync(STORAGE_DIR, { recursive: true })
} catch {}
const DATA_FILE = path.join(STORAGE_DIR, 'usersStore.json')

function loadUsers() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw).users || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ users }, null, 2))
}

function hashPassword(pw) {
  return crypto.createHash('sha256').update(pw).digest('hex')
}

function generateToken() {
  return crypto.randomBytes(24).toString('hex')
}

// In-memory token map (simple demo)
const sessions = new Map()

app.post('/auth/signup', (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  const users = loadUsers()
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'User already exists' })
  }
  const newUser = {
    id: Date.now().toString(),
    email,
    firstName,
    lastName,
    phone: phone || '',
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  saveUsers(users)
  const token = generateToken()
  sessions.set(token, newUser.id)
  const { passwordHash, ...publicUser } = newUser
  res.status(201).json({ token, user: publicUser })
})

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }
  const users = loadUsers()
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = generateToken()
  sessions.set(token, user.id)
  const { passwordHash, ...publicUser } = user
  res.json({ token, user: publicUser })
})

app.get('/auth/me', (req, res) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const userId = sessions.get(token)
  const users = loadUsers()
  const user = users.find(u => u.id === userId)
  if (!user) return res.status(401).json({ error: 'Invalid session' })
  const { passwordHash, ...publicUser } = user
  res.json({ user: publicUser })
})

app.post('/auth/logout', (req, res) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (token) sessions.delete(token)
  res.json({ ok: true })
})

// Health endpoint for deployment platforms
app.get('/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() })
})

const PORT = process.env.PORT || process.env.AUTH_PORT || 4000
app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`))
