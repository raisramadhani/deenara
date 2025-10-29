import { neon } from "@neondatabase/serverless";

// Lazy load database connection
let sqlInstance = null;

export const getSql = () => {
  if (!sqlInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    sqlInstance = neon(process.env.DATABASE_URL);
  }
  return sqlInstance;
};

// For backward compatibility
export const sql = new Proxy(
  {},
  {
    get: (target, prop) => {
      const sqlFn = getSql();
      return sqlFn[prop];
    },
    apply: (target, thisArg, args) => {
      const sqlFn = getSql();
      return sqlFn(...args);
    },
  }
);

// Initialize database tables
export async function initializeDatabase() {
  try {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        google_id VARCHAR(255) UNIQUE NOT NULL,
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    return {
      success: true,
      message: "Database tables initialized successfully",
    };
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// User operations
export async function findUserByGoogleId(googleId) {
  const sql = getSql();
  const result = await sql`
    SELECT id, email, name, google_id, avatar, role, created_at, updated_at 
    FROM users 
    WHERE google_id = ${googleId} 
    LIMIT 1
  `;
  return result[0] || null;
}

export async function findUserByEmail(email) {
  const sql = getSql();
  const result = await sql`
    SELECT id, email, name, google_id, avatar, role, created_at, updated_at 
    FROM users 
    WHERE email = ${email} 
    LIMIT 1
  `;
  return result[0] || null;
}

export async function findUserByEmailWithPassword(email) {
  const sql = getSql();
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `;
  return result[0] || null;
}

export async function createUser({
  email,
  name,
  googleId,
  avatar,
  password,
  role = "user",
}) {
  const sql = getSql();
  const result = await sql`
    INSERT INTO users (email, name, google_id, avatar, password, role)
    VALUES (${email}, ${name}, ${googleId}, ${avatar}, ${password}, ${role})
    RETURNING id, email, name, google_id, avatar, role, created_at, updated_at
  `;
  return result[0];
}

export async function updateUser(id, { name, avatar }) {
  const sql = getSql();
  const result = await sql`
    UPDATE users 
    SET name = ${name}, 
        avatar = ${avatar},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING id, email, name, google_id, avatar, role, created_at, updated_at
  `;
  return result[0];
}
