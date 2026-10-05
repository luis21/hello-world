const express = require('express')
const { fetchUser, validateEmail } = require('./utils')
const { callExternalApi } = require('./api')

const app = express()
app.use(express.json())

app.get('/users/:id', async (req, res) => {
  try {
    const user = await fetchUser(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    console.error('Error fetching user:', err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/users', async (req, res) => {
  const { email, name } = req.body
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }
  try {
    const result = await callExternalApi('/create-user', { email, name })
    res.status(201).json(result)
  } catch (err) {
    console.error('Error creating user:', err.message)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

app.listen(3000, () => console.log('Server running on port 3000'))
module.exports = app
