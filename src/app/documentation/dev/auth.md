# Summary

Auth type: JWT access + refresh tokens (assumption — update if you use sessions/OAuth).

Purpose: secure authentication for API and protected dashboard pages.

Implemented: backend routes under auth/*; frontend pages for login/register/reset exist.

Security goals: short lived access tokens, refresh tokens stored in httpOnly secure cookies, password hashing using bcrypt, rate limiting on auth endpoints, email verification and password reset flows.

## Endpoints (example)

* Replace {BASE_URL} with your backend base URL/config.

- POST /auth/register

    Body: { "email": string, "password": string, "name": string }

    Response 201: { "user": { id, email, name }, "message": "verification sent" }

    Notes: sends email verification token (expires 24h)

- POST /auth/login

    Body: { "email": string, "password": string }

    Response 200: { "accessToken": "<jwt>", "user": {id,email,name} } and sets refreshToken httpOnly cookie.

    Notes: rate limit to X attempts per minute (configurable)

- POST /auth/refresh

    Uses: httpOnly refreshToken cookie

    Response 200: { "accessToken": "<jwt>" }

- POST /auth/logout

    Clears refresh cookie and invalidates refresh token server-side.

- POST /auth/request-password-reset

    Body: { "email": string }

    Send password reset link with time-limited token.

- POST /auth/reset-password

  Body: { "token": string, "newPassword": string }

- GET /auth/me

    Header: Authorization: Bearer <accessToken>

    Response: { "id","email","name","roles": [] }

## Token details

  Access token: JWT, expiry e.g. 10–15 minutes (configurable via JWT_ACCESS_EXPIRES)

  Claims: sub (user id), iat, exp, roles, scopes

  Refresh token: long expiry (e.g. 7–30 days), stored in db/hash for revocation and sent as httpOnly, Secure cookie (SameSite=Strict or Lax depending on cross-site needs).

## DB schema (auth tables)

  users — id (uuid), email (unique), password_hash, name, is_verified, created_at, updated_at

  refresh_tokens — id, user_id, token_hash, expires_at, revoked, created_ip, created_at

  email_verifications / password_resets — token_hash, user_id, expires_at, used

## Backend implementation notes

  Password hashing: bcrypt with cost 12 (or argon2 if you prefer).

  JWT signing: use strong private key; rotate keys by keeping kid in header if doing key rotation.

  Token revocation: store refresh token hashes; when logout or rotation occurs, flag revoked.

  Middleware: auth.middleware.verifyAccessToken to decode JWT and append req.user. auth.middleware.ensureRole(role) for RBAC.

  Rate limiting: use express-rate-limit on POST /auth/* with stricter settings for login & password reset.

  Email: templated transactional emails; include X-Message-ID header for traceability.

## Frontend notes (auth pages)

  Pages implemented: /login, /register, /reset-password, /verify-email (assumed).

  Auth flow: after successful login, store accessToken in memory (React context / redux), refresh handled by background refresh hook that calls /auth/refresh before expiry. Do not store accessToken in localStorage (XSS risk).

  UX: show MFA / 2FA prompt page if enabled; show verification required screen if is_verified=false.

## Tests

  Unit tests for: password hashing, token creation, token verification, middleware.

  Integration tests: register -> email token flow (mock email), login -> refresh flow, reset-password.

## Security checklist (must pass before release)

 HTTPS everywhere (dev & prod via reverse proxy)

 Secure cookie flags set (httpOnly, secure, SameSite)

 Rate limiting on auth endpoints

 Password policy enforced (min len, complexity)

 Email tokens time-limited and single-use

 CSRF protections if any state is set via cookies (e.g., refresh endpoint)

 Audit logging for auth events (login, logout, token reuse)