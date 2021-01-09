const middleware = {}

middleware['authenticated'] = require('../middleware/authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['noneauthenticated'] = require('../middleware/noneauthenticated.js')
middleware['noneauthenticated'] = middleware['noneauthenticated'].default || middleware['noneauthenticated']

export default middleware
