const { BASE_URL } = process.env
export default {
  // Characters
  getRoles: { method: 'GET', url: `${BASE_URL}/api/characters.v2.3.json` },
  getReplacingRoles: { method: 'GET', url: `${BASE_URL}/api/replacingRoles.v2.4.json` },
  // Third Party
  postToDiscord: { method: 'POST' }
}
