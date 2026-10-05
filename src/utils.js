const db = require('./db')

async function fetchUser(id) {
  if (!id || isNaN(id)) throw new Error('Invalid user ID')
  return db.query('SELECT * FROM users WHERE id = $1', [id])
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0]
}

function paginate(items, page = 1, limit = 20) {
  const start = (page - 1) * limit
  return {
    data: items.slice(start, start + limit),
    total: items.length,
    page,
    pages: Math.ceil(items.length / limit),
  }
}

module.exports = { fetchUser, validateEmail, formatDate, paginate }
