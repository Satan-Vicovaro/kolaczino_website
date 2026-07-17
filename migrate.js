// Lightweight SQLite migration runner - replaces `npx prisma migrate deploy`
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DATABASE_URL?.replace('file:', '') || '/site/data/photos.db';
const MIGRATIONS_DIR = path.join(__dirname, 'prisma', 'migrations');

function run(sql) {
  // Use sqlite3 CLI to execute SQL
  execSync(`sqlite3 "${DB_PATH}" "${sql.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
}

function runFile(filePath) {
  execSync(`sqlite3 "${DB_PATH}" < "${filePath}"`, { shell: '/bin/sh', stdio: 'inherit' });
}

function main() {
  // Ensure DB exists
  if (!fs.existsSync(DB_PATH)) {
    console.log('Creating new database at', DB_PATH);
    fs.writeFileSync(DB_PATH, '');
  }

  // Create _prisma_migrations table if it doesn't exist
  run(`CREATE TABLE IF NOT EXISTS _prisma_migrations (
    id TEXT PRIMARY KEY,
    checksum TEXT NOT NULL,
    finished_at TEXT,
    migration_name TEXT NOT NULL,
    logs TEXT,
    rolled_back_at TEXT,
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    applied_steps_count INTEGER NOT NULL DEFAULT 0
  );`);

  // Read applied migrations
  const appliedRaw = execSync(`sqlite3 "${DB_PATH}" "SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL;"`)
    .toString().trim();
  const applied = new Set(appliedRaw ? appliedRaw.split('\n') : []);

  // Get pending migrations
  const dirs = fs.readdirSync(MIGRATIONS_DIR)
    .filter(d => fs.statSync(path.join(MIGRATIONS_DIR, d)).isDirectory())
    .sort();

  let count = 0;
  for (const dir of dirs) {
    if (applied.has(dir)) {
      console.log(`Migration ${dir} already applied, skipping.`);
      continue;
    }

    const sqlFile = path.join(MIGRATIONS_DIR, dir, 'migration.sql');
    if (!fs.existsSync(sqlFile)) {
      console.warn(`No migration.sql in ${dir}, skipping.`);
      continue;
    }

    console.log(`Applying migration: ${dir}`);
    const id = require('crypto').randomUUID();
    
    // Record migration start
    run(`INSERT INTO _prisma_migrations (id, checksum, migration_name, started_at, applied_steps_count) VALUES ('${id}', '', '${dir}', datetime('now'), 0);`);
    
    // Apply migration
    runFile(sqlFile);
    
    // Mark as finished
    run(`UPDATE _prisma_migrations SET finished_at = datetime('now'), applied_steps_count = 1 WHERE id = '${id}';`);
    
    console.log(`Migration ${dir} applied successfully.`);
    count++;
  }

  console.log(count > 0 ? `${count} migration(s) applied.` : 'Database is up to date.');
}

main();
