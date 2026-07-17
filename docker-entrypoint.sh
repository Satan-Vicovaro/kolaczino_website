#!/bin/sh
set -e

# Run migrations using lightweight sqlite-based runner
node /site/migrate.js

# Seed database (ignore errors if data already exists)
node /site/prisma/seed.js || echo "Seed skipped (data may already exist)"

# Start the server
node server.js
