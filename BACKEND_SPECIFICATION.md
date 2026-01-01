# Purusharth Class - Backend API Specification

## Overview
This document provides the complete backend specification for the Purusharth Class website. The frontend expects these API endpoints to manage student results, admin authentication, and image uploads.

---

## Database Schema

### Tables

#### 1. `admins`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Admin email address |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| created_at | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |

#### 2. `results`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| title | VARCHAR(500) | NOT NULL | Result title/caption (supports Gujarati text) |
| image_url | TEXT | NOT NULL | URL to the stored image |
| is_pinned | BOOLEAN | DEFAULT FALSE | Whether result appears on main page |
| created_at | TIMESTAMP | DEFAULT NOW() | Upload timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Constraint:** Maximum 4 results can have `is_pinned = true` at any time.

---

## API Endpoints

### Authentication

#### POST `/api/admin/login`
Authenticate an admin user.

**Request Body:**
```json
{
  "email": "admin@purusharthclass.com",
  "password": "secure_password"
}
```

**Success Response (200):**
```json
{
  "token": "jwt_token_here",
  "admin": {
    "id": "uuid",
    "email": "admin@purusharthclass.com"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Implementation Notes:**
- Use bcrypt for password hashing
- Generate JWT token with 24h expiry
- Include admin ID in JWT payload

---

### Public Endpoints (No Auth Required)

#### GET `/api/results`
Fetch all results for the Results page.

**Response (200):**
```json
{
  "results": [
    {
      "id": "uuid",
      "title": "ધોરણ ૧૦ બોર્ડ પરીક્ષા 2024",
      "imageUrl": "https://your-storage.com/images/result-1.jpg",
      "isPinned": true,
      "createdAt": "2024-03-15T10:30:00Z"
    }
  ]
}
```

**Notes:**
- Return results ordered by `created_at DESC` (newest first)
- Convert `snake_case` database fields to `camelCase` in response

---

#### GET `/api/results/pinned`
Fetch only pinned results for the main page.

**Response (200):**
```json
{
  "results": [
    {
      "id": "uuid",
      "title": "ધોરણ ૯ પ્રથમ પરીક્ષામાં ગણિત વિષયમાં 50/50 ગુણ લાવનાર વિદ્યાર્થીઓ",
      "imageUrl": "https://your-storage.com/images/result-1.jpg",
      "isPinned": true,
      "createdAt": "2024-03-15T10:30:00Z"
    }
  ]
}
```

**Notes:**
- Filter where `is_pinned = true`
- Maximum 4 results returned
- Order by `created_at DESC`

---

### Protected Endpoints (Require JWT Auth)

All protected endpoints require the header:
```
Authorization: Bearer <jwt_token>
```

Return `401 Unauthorized` if token is missing, invalid, or expired.

---

#### GET `/api/admin/results`
Fetch all results for admin dashboard.

**Response (200):**
```json
{
  "results": [
    {
      "id": "uuid",
      "title": "Result Title",
      "imageUrl": "https://your-storage.com/images/result-1.jpg",
      "isPinned": true,
      "createdAt": "2024-03-15T10:30:00Z"
    }
  ]
}
```

---

#### POST `/api/admin/results/upload`
Upload a new result with image.

**Request:**
- Content-Type: `multipart/form-data`
- Fields:
  - `image`: File (JPEG, PNG, WebP - max 5MB)
  - `title`: String (required)

**Success Response (201):**
```json
{
  "result": {
    "id": "uuid",
    "title": "New Result Title",
    "imageUrl": "https://your-storage.com/images/new-result.jpg",
    "isPinned": false,
    "createdAt": "2024-03-15T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Image and title are required"
}
```

**Implementation Notes:**
- Validate file type (only images)
- Limit file size to 5MB
- Generate unique filename (e.g., `result-{uuid}.{ext}`)
- Store image in cloud storage (AWS S3, Cloudinary, etc.)
- Save image URL to database

---

#### PATCH `/api/admin/results/:id/pin`
Toggle pin status of a result.

**Request Body:**
```json
{
  "isPinned": true
}
```

**Success Response (200):**
```json
{
  "result": {
    "id": "uuid",
    "title": "Result Title",
    "imageUrl": "https://your-storage.com/images/result-1.jpg",
    "isPinned": true,
    "createdAt": "2024-03-15T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Maximum 4 results can be pinned"
}
```

**Implementation Notes:**
- Before pinning, check if already 4 results are pinned
- If trying to pin when 4 already pinned, return error
- Update `updated_at` timestamp

---

#### DELETE `/api/admin/results/:id`
Delete a result and its image.

**Success Response (200):**
```json
{
  "message": "Result deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Result not found"
}
```

**Implementation Notes:**
- Delete image from cloud storage
- Delete database record
- Return 404 if result doesn't exist

---

## Image Storage

### Recommended Options:
1. **AWS S3** - Scalable, cost-effective
2. **Cloudinary** - Built-in image optimization
3. **DigitalOcean Spaces** - Simple S3-compatible storage
4. **Firebase Storage** - Easy integration

### Image Requirements:
- Accepted formats: JPEG, PNG, WebP
- Maximum size: 5MB
- Recommended: Compress images before storing
- Generate thumbnails for faster loading (optional)

---

## Security Considerations

1. **Password Storage**
   - Use bcrypt with salt rounds >= 10
   - Never store plain text passwords

2. **JWT Tokens**
   - Use strong secret key (256-bit minimum)
   - Set reasonable expiry (24 hours recommended)
   - Include only necessary claims (admin ID)

3. **API Security**
   - Validate all inputs
   - Sanitize file uploads
   - Implement rate limiting
   - Use HTTPS only

4. **CORS Configuration**
   - Allow only your frontend domain
   - Be restrictive with methods and headers

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/purusharth_db

# JWT
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRY=24h

# Storage (example for AWS S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=purusharth-results
AWS_REGION=ap-south-1

# Admin (for initial setup)
ADMIN_EMAIL=admin@purusharthclass.com
ADMIN_PASSWORD=initial-secure-password
```

---

## Initial Setup Script

Create an initial admin user on first deployment:

```sql
-- Run once to create admin user
INSERT INTO admins (email, password_hash)
VALUES (
  'admin@purusharthclass.com',
  '$2b$10$...' -- bcrypt hash of your password
);
```

---

## Frontend API Configuration

In your frontend, update the API base URL based on environment:

```typescript
// src/config/api.ts
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend-domain.com'  // Production
  : 'http://localhost:3001';            // Development

// Then update hooks/useResults.ts to use:
const response = await fetch(`${API_BASE_URL}/api/results/pinned`);
```

---

## Testing Checklist

- [ ] Admin can login with correct credentials
- [ ] Admin cannot login with wrong credentials
- [ ] Token expires after 24 hours
- [ ] Can upload image with title
- [ ] Cannot upload without image or title
- [ ] Can pin up to 4 results
- [ ] Cannot pin more than 4 results
- [ ] Can unpin results
- [ ] Can delete results
- [ ] Main page shows only pinned results
- [ ] Results page shows all results
- [ ] Images load correctly from storage

---

## Sample API Response Mapping

The frontend expects responses in **camelCase**. If your backend uses snake_case, map the fields:

| Database Column | API Response Field |
|----------------|-------------------|
| id | id |
| title | title |
| image_url | imageUrl |
| is_pinned | isPinned |
| created_at | createdAt |
