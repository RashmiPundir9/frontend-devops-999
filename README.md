## Yaahajji Admin – React + Ant Design Admin Portal

### Overview


**Yaahajji Admin** is the admin portal for the Yaahajji platform, built on top of a reusable React + Ant Design admin starter.

It follows the same structure and patterns as a typical production admin app, with:

- Neutral, configurable branding
- Clean architecture with clear separation of layouts, pages, services, and utilities
- Ready-made auth flow, dashboard shell, and theming

You can use this project as the base for new Yaahajji admin modules by plugging in your own features and APIs.
Test PR change

Test PR change
THIS_IS_BRANCH_CHANGE_999

---

## Tech Stack

- **React** (Create React App, `react-scripts`)
- **React Router** (`react-router-dom`)
- **Ant Design** (`antd`, `@ant-design/icons`)
- **Axios** for HTTP requests
- **LocalStorage** for auth token/user storage

---

## Project Structure

```text
src/
  App.js
  App.css
  index.js
  index.css
  routes.config.js

  components/
    HeaderBar.jsx
    MessageProvider.jsx
    Sidebar/
      index.jsx
      Sidebar.css

  layouts/
    PublicLayout.jsx
    DashboardLayout.jsx
    AuthLayout/
      index.jsx
      AuthLayout.css

  navigation/
    sidebar.config.js

  pages/
    Login/
      index.jsx
      login.css
    ForgotPassword/
      index.jsx
    ResetPassword/
      index.jsx
    Dashboard/
      index.jsx
      Dashboard.css
    ExampleList/
      index.jsx   // simple placeholder page

  services/
    axios.js
    auth.service.js

  utils/
    storage.js

  styles/
    theme.js
```

### Folder Responsibilities

- **`pages/`**  
  Feature screens. Each page folder groups UI and local styles for that screen (e.g. `Login`, `Dashboard`, `ExampleList`).

- **`components/`**  
  Shared layout/UI building blocks used across pages:
  - `Sidebar` – left navigation for the dashboard.
  - `HeaderBar` – top bar with page title and user menu.
  - `MessageProvider` – global Ant Design message context.

- **`layouts/`**
  Page shells that provide high-level layout:
  - `PublicLayout` – for public-facing pages.
  - `AuthLayout` – two-column layout for login/forgot/reset screens.
  - `DashboardLayout` – admin shell with sidebar + header + content area.

- **`services/`**
  API layer.  
  - `axios.js` – shared Axios instance with interceptors (base URL, auth header, error handling).
  - `auth.service.js` – login API helper (example implementation).

- **`utils/`**
  Cross-cutting utilities.
  - `storage.js` – helpers for handling auth token, user, and “remember me” in `localStorage`.

- **`navigation/`**
  Navigation configuration.
  - `sidebar.config.js` – defines items shown in the dashboard sidebar.

- **`styles/`**
  Theming and design tokens.
  - `theme.js` – central Ant Design theme tokens (primary color, border radius, font).

---

## Routing

### Route Configuration

File: `src/routes.config.js`

Each route is defined as a config object:

```javascript
{
  path: "/dashboard",
  component: DashboardHome,
  routeType: "private",     // "public" | "private"
  isAuthPage: false,        // used for login/forgot/reset
  layout: "dashboard",      // "public" | "auth" | "dashboard"
  title: "Dashboard",       // used by HeaderBar
}
```

Current routes (by default):

- `/login`, `/forgot-password`, `/reset-password` – public auth pages, using `AuthLayout`.
- `/dashboard` – main dashboard page, private, using `DashboardLayout`.
- `/dashboard/examples` – example placeholder list page, private, using `DashboardLayout`.

### How Routes Are Wired

File: `src/App.js`

- Uses `BrowserRouter`, `Routes`, `Route` from `react-router-dom`.
- Reads all routes from `routes.config.js`.
- Selects layout via a small function:

  ```javascript
  const getLayout = (layout) => {
    if (layout === "auth") return AuthLayout;
    if (layout === "dashboard") return DashboardLayout;
    return PublicLayout;
  };
  ```

- Wraps routes in:
  - `PublicRoute` for public routes (optionally redirecting authenticated users away from auth pages).
  - `PrivateRoute` for private routes (redirecting unauthenticated users to `/login`).

---

## Auth & Storage

### Route Guards

- **`src/routes/PublicRoute.jsx`**

  - If user is authenticated and the route is an auth page (`isAuthPage`), redirects to `/dashboard`.
  - Otherwise, renders children.

- **`src/routes/PrivateRoute.jsx`**

  - Reads token from `utils/storage`.
  - If no token, clears auth data and redirects to `/login`, preserving the `from` path.
  - If token exists, renders children.

### LocalStorage Helpers

File: `src/utils/storage.js`

- Stores everything under consistent keys:

  - Token: `auth_token`
  - User: `auth_user`
  - Remember: `auth_remember`

- Exposes:

  - `getAuthToken`, `setAuthToken`, `removeAuthToken`
  - `getUser`, `setUser`, `removeUser`
  - `getRememberMe`, `setRememberMe`, `removeRememberMe`
  - `setAuthData({ token, user, remember })`
  - `clearAuthData()`
  - `isAuthenticated()`
  - `getAuthHeader()` – returns `{ Authorization: "Bearer <token>" }` or `{}`

Use these helpers instead of accessing `localStorage` directly.

---

## API Layer

### Axios Client

File: `src/services/axios.js`

- Single axios instance with:

  - `baseURL: process.env.REACT_APP_API_BASE_URL`
  - Default JSON headers
  - 15s timeout

- **Request interceptor**:

  - Reads token from `storage.getAuthToken()`.
  - If present, sets `Authorization: Bearer <token>` header.

- **Response interceptor**:

  - Returns `response.data` on success.
  - On error:
    - 401 → clears auth data and redirects to `/login`.
    - 500 → logs a server error.
  - Rejects with either `error.response.data` or `error.message`.

> When using this starter in a new project, set `REACT_APP_API_BASE_URL` in your `.env` file.

### Auth Service

File: `src/services/auth.service.js`

Example login helper:

```javascript
import api from "./axios";

export const loginUser = async ({ email, password }) => {
  const payload = {
    email,
    password,
    portal: "admin", // example field – adjust per project API
  };

  const response = await api.post("/user/login", payload);

  return response.response;
};
```

In the login page, this is currently commented out and replaced with a fake response so that the template works without a backend. In a real project, uncomment `loginUser` and wire it to your API.

---

## Layouts & Shell

### Dashboard Layout

File: `src/layouts/DashboardLayout.jsx`

- Uses AntD `Layout`:
  - Left: `Sidebar` (sticky, full-height).
  - Right: `HeaderBar` at top, scrollable content below (`Outlet`).

### Auth Layout

File: `src/layouts/AuthLayout/index.jsx`

- Two-column layout:
  - Left: form area (renders current auth page via `Outlet`).
  - Right: branding panel with gradient background and text (“Admin Portal”).

### Public Layout

File: `src/layouts/PublicLayout.jsx`

- Simple top header with brand text and buttons (e.g. “Dashboard”, “Admin Login”).
- `Outlet` below for public pages.

---

## Navigation

### Sidebar

- Config file: `src/navigation/sidebar.config.js`

  ```javascript
  import { HomeOutlined, TableOutlined } from "@ant-design/icons";

  export const sidebarItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/dashboard/examples",
      icon: <TableOutlined />,
      label: "Example List",
    },
  ];
  ```

- Component: `src/components/Sidebar/index.jsx`

  - Reads `sidebarItems`.
  - Uses `useLocation` to highlight the active route.
  - Uses `useNavigate` to perform navigation on click.
  - Uses a vertical gradient background based on the theme colors.
  - Displays a simple “Admin” brand text at the top.

### Header Bar

File: `src/components/HeaderBar.jsx`

- Shows:

  - Current page title (looked up from `routes.config.js` by matching the path).
  - User avatar and name/role (from `storage.getUser()`).
  - User menu with:
    - (Disabled) “Reset Password” action (wired to `/reset-password`).
    - “Log out” action that clears auth data and navigates to `/login`.

---

## Styling & Theming

### Global CSS Variables

File: `src/index.css`

Defines design tokens as CSS custom properties:

```css
:root {
  /* default theme = light */
  --color-primary: #00c183;
  --color-primary-strong: #14b07e;
  --color-primary-soft: #c1c89e;

  --color-bg-page: #f5f7fa;
  --color-bg-card: #ffffff;
  --color-border-subtle: #f0f0f0;

  --border-radius-lg: 12px;
  --border-radius-xl: 28px;

  --font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

/* future: dark theme skeleton */
:root[data-theme="dark"] {
  --color-primary: #00c183;
  --color-primary-strong: #00a56d;
  --color-primary-soft: #064e3b;

  --color-bg-page: #020617;
  --color-bg-card: #0f172a;
  --color-border-subtle: #1e293b;
}
```

These variables are used in:

- `AuthLayout.css` for the auth panel gradient and border radius.
- `Sidebar/index.jsx` for the sidebar gradient.

In the future, you can implement dark mode by:

- Filling out the `:root[data-theme="dark"]` values.
- Toggling `document.documentElement.dataset.theme = "dark" | "light"` in JavaScript.

### Ant Design Theme Tokens

File: `src/styles/theme.js`

```javascript
export const themeTokens = {
  primary: "#00C183",
  borderRadius: 8,
  fontFamily: "Inter, sans-serif",
};
```

Used in `src/index.js`:

```javascript
<ConfigProvider
  theme={{
    token: {
      colorPrimary: themeTokens.primary,
      borderRadius: themeTokens.borderRadius,
      fontFamily: themeTokens.fontFamily,
    },
  }}
>
  <MessageProvider>
    <App />
  </MessageProvider>
</ConfigProvider>
```

Change `themeTokens` to adjust the global AntD theme (colors, corner radius, fonts).

---

## Auth Flow (Template)

### Login Page

File: `src/pages/Login/index.jsx`

- Uses AntD `Form`, `Input`, `Input.Password`, `Checkbox`, `Button`.
- Validates email & password.
- On submit:

  - Currently uses a fake response:
    - Sets a dummy JWT and user object.
    - Uses `setAuthData` from `utils/storage`.
    - Navigates to the original `from` path or `/dashboard`.

- In a real project:

  - Uncomment the `loginUser` import from `services/auth.service.js`.
  - Call `loginUser(payload)` instead of the fake response.
  - Map the backend response to `token` and `user` fields.

---

## How to Use This Starter for a New Project

1. **Copy this folder** as a new project (or use it as a template repo).
2. **Update metadata:**
   - Change `"name"` in `package.json`.
   - Set `REACT_APP_API_BASE_URL` in a `.env` file.
3. **Branding:**
   - Update text in:
     - `AuthLayout` (title/subtitle).
     - `PublicLayout` header text.
   - Adjust theme colors in:
     - `src/styles/theme.js`
     - `src/index.css` (`--color-primary` group).
4. **Define your routes:**
   - Edit `src/routes.config.js`:
     - Add new pages under `pages/`.
     - Add matching entries for each route (path, component, routeType, layout, title).
5. **Update navigation:**
   - Edit `src/navigation/sidebar.config.js` to match your modules.
6. **Create feature pages:**
   - Under `src/pages/<FeatureName>/`, create `index.jsx` (and optional CSS).
   - Wire them into `routes.config.js` and the sidebar.
7. **Wire your APIs:**
   - Implement new services in `src/services/` (e.g. `user.service.js`, `order.service.js`).
   - Use the shared `api` instance from `axios.js`.
   - Use `utils/storage` for auth headers and token management.

---

## Running the Project

```bash
# install dependencies
npm install

# start development server
npm start

# build for production
npm run build
```

The app runs at `http://localhost:3000` by default.

---

This starter is designed to give you a familiar, production-style architecture from day one, while staying generic enough to be reused across multiple admin projects.
