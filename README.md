# Forney Aquatics — Meet Command Center

A standalone installable web app (PWA) for the Forney HS 2026–27 swim/dive roster, UIL District meet entries, and TISCA relay lineups.

## Features
- Email/password Firebase Authentication; access restricted to the coach's specific user UID, both in the UI and Firestore rules.
- Firestore cloud auto-save to `users/{uid}/plans/main` with local draft fallback.
- 15 girls and 14 boys on the championship roster, plus three editable open spots per team; additional swimmers in the master roster.
- District: 9 individual/diving event choices, A-only relays, red flags when >4 per event, incomplete relay warning, and per-swimmer limit warnings.
- Relay Center: independent A/B/C TISCA relay lineups, stroke order, splits, adjustable flying-start allowance and projection.
- Athlete database: add/edit/archive athletes and record official, recent or projected event times.
- Download and import JSON backups, and copy a readable meet summary.
- iPhone home-screen installation via web manifest.

**Important**: This is a coach planning tool, not an official UIL entry submission system. District and TISCA lineups are independent. Existing chat widget selections cannot be automatically recovered.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed in the terminal. `npm install` installs Firebase and other dependencies for you.

## GitHub + Netlify deployment (no command line required)

1. Create a **private** GitHub repository named `forney-aquatics-app` (do not add a README initially).
2. Upload **the contents of this project folder** to the repository, preserving `src/` and `public/` subfolders. GitHub web upload supports dragging the extracted project contents.
3. Log into Netlify and select **Add new project → Import an existing project → GitHub**. Authorize GitHub, choose the repository.
4. Build command: `npm run build`. Publish directory: `dist`. Netlify generally detects these from `netlify.toml`.
5. Deploy. Netlify gives a `*.netlify.app` HTTPS address.
6. In Firebase Console → Authentication → Settings → Authorized domains, add only the **domain name** you deployed to (`your-site.netlify.app`, not `https://...`). Note: Firebase SDK email/password authentication may work without this step, but it's needed for redirect or email-link flows. Verify Firebase configuration and domain before signing in.
7. Open the Netlify URL, sign in with the **Firebase email/password user you created**. Other Firebase users won't be permitted.
8. On iPhone Safari: Share → Add to Home Screen → Add.

## Firebase setup (already started)

The Firebase web app config is included in `src/firebase.js`. Those are public browser config values, **not** a password. Firebase Authentication and Firestore Security Rules enforce access.

Firestore should be created in production mode. Verify the deployed Firestore rules match `firestore.rules`. The app saves under `users/{uid}/plans/main`.

Security rules should remain restricted to the specific authorized UID. Never switch to `allow read, write: if true`.

## Backups and limitations

The app is designed to save changes to Firestore automatically and also retains a local browser draft. If the network goes offline, it may display **Cloud save failed — local draft only**. That is a warning, not a successful cloud save. Use **Summary → Download JSON backup** regularly. On recovery, use **Restore a JSON backup** after logging in.

Do not enter student IDs, medical details or other sensitive student data. Get appropriate district approval before putting school records into an external cloud app. Time values are coach-entered; no external timing or Hy-Tek import is present yet.

## Development

Source entry: `src/main.jsx`; React UI: `src/App.jsx`; data model: `src/data.js`; Firebase config: `src/firebase.js`.

To build for production: `npm run build`.
