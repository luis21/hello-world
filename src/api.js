const https = require('https')

const BASE_URL = process.env.EXTERNAL_API_URL || 'https://api.example.com'
const API_KEY = process.env.EXTERNAL_API_KEY

async function callExternalApi(path, body) {
  if (!API_KEY) throw new Error('EXTERNAL_API_KEY not configured')
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`External API error ${response.status}: ${err}`)
  }
  return response.json()
}

async function getExternalUser(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`Failed to fetch external user: ${response.status}`)
  return response.json()
}

module.exports = { callExternalApi, getExternalUser }
