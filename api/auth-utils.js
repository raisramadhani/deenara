import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const JWT_EXPIRES_IN = "7d";

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    role: user.role || "user",
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function setCookie(res, name, value, options = {}) {
  const defaultOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
    ...options,
  };

  // Vercel serverless functions use different cookie format
  const cookieString = `${name}=${value}; Path=${
    defaultOptions.path
  }; Max-Age=${defaultOptions.maxAge / 1000}; SameSite=${
    defaultOptions.sameSite
  }${defaultOptions.secure ? "; Secure" : ""}${
    defaultOptions.httpOnly ? "; HttpOnly" : ""
  }`;

  res.setHeader("Set-Cookie", cookieString);
}

export function clearCookie(res, name) {
  const cookieString = `${name}=; Path=/; Max-Age=0; SameSite=lax`;
  res.setHeader("Set-Cookie", cookieString);
}

export function getTokenFromRequest(req) {
  // Try to get token from cookie first
  const cookies = parseCookies(req.headers.cookie || "");
  if (cookies.token) {
    return cookies.token;
  }

  // Try to get token from Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
}

export function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = value;
    });
  }
  return cookies;
}

export async function verifyGoogleToken(token) {
  try {
    // Verify Google OAuth token
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Verify audience matches our client ID
    if (data.aud !== process.env.GOOGLE_CLIENT_ID) {
      return null;
    }

    return {
      googleId: data.sub,
      email: data.email,
      name: data.name,
      avatar: data.picture,
      emailVerified: data.email_verified === "true",
    };
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return null;
  }
}
