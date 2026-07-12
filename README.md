# InsureAI Frontend

AI-Native Insurance Service Automation Platform — Phase 1 Frontend

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app boots to the **Loading** screen, auto-transitions to **Login**, then navigates to **Home** after a successful sign-in.

## Run Tests

```bash
npm test          # run all Vitest tests once
npm run test:ui   # open Vitest UI (if configured)
```

## Build for Production

```bash
npm run build
```

---

## App Flow

```
/ (Splash)  ──animation complete──▶  /login  ──mock sign-in──▶  /home
```

| Route    | Description                                                  |
|----------|--------------------------------------------------------------|
| `/`      | Loading/Splash screen — plays animation then redirects       |
| `/login` | Username + password form (mock auth, any credentials work)  |
| `/home`  | Dashboard — profile onboarding for new users, profile card for returning users |

Unauthenticated access to `/home` redirects to `/login` via `RequireAuth`.

Auth state is **persisted to `localStorage`** via Zustand's `persist` middleware, so a page refresh keeps the session alive.

---

## Swapping in the Real Lottie Animation

1. Export your animation from **Jitter** as a **Lottie JSON** file.
2. Drop it into `src/assets/` (e.g. `loading-animation.json`).
3. Open `src/pages/SplashPage.tsx` and:
   - Uncomment the import: `import myAnimation from '../assets/loading-animation.json';`
   - Add the prop: `<LoadingAnimation animationData={myAnimation} ... />`

The `onComplete` callback will fire when the Lottie animation finishes, replacing the CSS placeholder's fixed timer.

If you instead have an **animated SVG** from SVGator, drop it into `src/assets/` and render it inline inside `SplashPage` — the safety-net `timeout` prop on `LoadingAnimation` will still trigger navigation after ~2.5s.

---

## Project Structure

```
src/
├── assets/           # Drop your Lottie JSON or SVG here
├── components/
│   ├── Layout.tsx            # Header + page wrapper
│   ├── LoadingAnimation.tsx  # Lottie/SVG/placeholder switcher
│   ├── LoginForm.tsx         # Username + password form
│   ├── ProfileCard.tsx       # Existing-user profile display
│   ├── ProfileOnboardingForm.tsx  # New-user setup form
│   └── RequireAuth.tsx       # Route guard
├── pages/
│   ├── SplashPage.tsx
│   ├── LoginPage.tsx
│   └── HomePage.tsx
├── store/
│   └── authStore.ts          # Zustand store with localStorage persistence
├── test/
│   ├── setup.ts
│   └── LoginForm.test.tsx
├── types.ts                  # Shared Profile + AuthState interfaces
└── App.tsx                   # Router
```
