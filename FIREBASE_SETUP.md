# Firebase Setup Guide for Purusharth Class

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "purusharth-class" (or your preferred name)
4. Enable/disable Google Analytics as needed
5. Click "Create project"

---

## Step 2: Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password**
5. Save

### Create Admin Account

1. Go to **Authentication > Users** tab
2. Click **Add user**
3. Enter your admin email and password
4. Click **Add user**

**⚠️ Important:** Only create ONE admin account. This email/password will be used to log into the dashboard.

---

## Step 3: Create Firestore Database

1. Go to **Build > Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select your preferred location (closest to your users)
5. Click **Enable**

---

## Step 4: Enable Storage

1. Go to **Build > Storage**
2. Click **Get started**
3. Choose **Start in production mode**
4. Click **Next** and select the same location as Firestore
5. Click **Done**

---

## Step 5: Configure Security Rules

### Firestore Security Rules

Go to **Firestore Database > Rules** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Results collection
    match /results/{resultId} {
      // Anyone can read results (for public display)
      allow read: if true;
      
      // Only authenticated users can create, update, delete
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
    
    // Deny access to all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click **Publish** to save.

### Storage Security Rules

Go to **Storage > Rules** and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Results folder
    match /results/{fileName} {
      // Anyone can read (for public image display)
      allow read: if true;
      
      // Only authenticated users can upload
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024 // Max 5MB
                   && request.resource.contentType.matches('image/(jpeg|png)'); // Only JPEG/PNG
      
      // Only authenticated users can delete
      allow delete: if request.auth != null;
    }
    
    // Deny access to all other paths
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

Click **Publish** to save.

---

## Step 6: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click **Web** icon (</>) to add a web app
4. Register app name (e.g., "purusharth-class-web")
5. Copy the `firebaseConfig` object

---

## Step 7: Update Your Code

Open `src/lib/firebase.ts` and replace the placeholder config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

---

## Step 8: Create Firestore Index (Required)

For the pinned results query to work, you need to create a composite index:

1. Go to **Firestore Database > Indexes**
2. Click **Add Index**
3. Collection ID: `results`
4. Add fields:
   - Field: `isPinned` | Order: `Ascending`
   - Field: `createdAt` | Order: `Descending`
5. Query scope: **Collection**
6. Click **Create**

**Note:** The first time you run a query that needs an index, Firebase will show an error with a direct link to create the index. You can also click that link.

---

## Summary

| Feature | Configuration |
|---------|---------------|
| Auth | Email/Password only |
| Admin | Single user account |
| Storage | JPEG/PNG only, max 5MB |
| Firestore | Public read, admin write |
| Security | Firebase rules (not frontend logic) |

---

## Testing Checklist

- [ ] Admin can log in with email/password
- [ ] Admin can upload JPEG/PNG images
- [ ] Admin can add captions to images
- [ ] Admin can pin/unpin results (max 4 pinned)
- [ ] Admin can delete results
- [ ] Public users can view results on main page
- [ ] Public users can view all results on /results page
- [ ] Public users CANNOT upload or modify data

---

## Troubleshooting

### "Permission denied" error
- Verify security rules are published
- Check that admin account exists in Authentication
- Ensure you're logged in as admin

### Images not loading
- Check Storage rules allow public read
- Verify image was uploaded successfully

### Query errors
- Create the composite index as described in Step 8
- Check Firestore rules allow read access

### Login not working
- Verify Email/Password auth is enabled
- Check admin credentials are correct
- Clear browser cache and try again
