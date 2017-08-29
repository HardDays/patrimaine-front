const fallback = require('express-history-api-fallback');
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
const root = __dirname + '/dist';
app.use(express.static(root));
//app.use(fallback('index.html', { root }))

// Start the app by listening on the default
// Heroku port
app.get('*', function(req, res) {
  res.sendfile('./dist/index.html')
})
app.listen(process.env.PORT || 8080);