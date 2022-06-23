export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-9ptc0fv8.us.auth0.com'
export const clientId = 'TWUCpgDir5QlmcwhsdBwGZOUMItsxpMD'
export const audience = 'https://SethDev.com'

// AUTH_DOMAIN = dev - 9ptc0fv8.us.auth0.com
// AUTH_AUDIENCE = https://SethDev.com
// AUTH_CLIENT_ID = TWUCpgDir5QlmcwhsdBwGZOUMItsxpMD