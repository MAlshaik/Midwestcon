# tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# package.json

```json
{
  "name": "midwestcon",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@supabase/ssr": "^0.5.0",
    "@supabase/supabase-js": "^2.45.2",
    "@t3-oss/env-nextjs": "^0.11.1",
    "again": "^0.0.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "drizzle-orm": "^0.33.0",
    "input-otp": "^1.2.4",
    "lodash.debounce": "^4.0.8",
    "lucide-react": "^0.436.0",
    "next": "14.2.6",
    "openai": "^4.56.0",
    "postgres": "^3.4.4",
    "radix-ui": "^1.0.1",
    "react": "^18",
    "react-dom": "^18",
    "react-hot-toast": "^2.4.1",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "drizzle-kit": "^0.24.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.6",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

```

# drizzle.config.ts

```ts
import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["midwestcon*"],
  schemaFilter: ["public"],
} satisfies Config;


```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

# README.md

```md
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env
.env.*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# .eslintrc.json

```json
{
  "extends": "next/core-web-vitals"
}

```

# src/env.js

```js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

```

# public/vercel.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/google.svg

This is a file of the type: SVG Image

# drizzle/0000_aspiring_alex_power.sql

```sql
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"raw_user_meta_data" jsonb NOT NULL
);

```

# src/utils/useMousePosition.tsx

```tsx
// utils/useMousePosition.ts
import { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;

```

# src/utils/use-outside-click.ts

```ts
import React, { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};


```

# src/utils/navigation.ts

```ts
export const shouldShowNavbar = (pathname: string): boolean => {
  const noNavbarPaths = ['/auth', '/complete-profile'];
  return !noNavbarPaths.some(path => pathname.startsWith(path));
};

```

# src/utils/helpers.ts

```ts
import { type RefObject } from "react";

export const getURL = (path: string = '') => {
    // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL &&
            process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
            process?.env?.NEXT_PUBLIC_VERCEL_URL &&
                process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
                ? process.env.NEXT_PUBLIC_VERCEL_URL
                : // If neither is set, default to localhost for local development.
                'http://localhost:3000/';

    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, '');
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    path = path.replace(/^\/+/, '');

    console.log('url', url);

    // Concatenate the URL and the path.
    return path ? `${url}/${path}` : url;
};

export function scrollDown(ref: RefObject<HTMLDivElement>) {
  if (!ref.current) return;
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

```

# src/utils/cn.ts

```ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


```

# src/types/profiles.ts

```ts
export enum userTypeEnum{
    "guest", "member", "admin"
}

export interface Profile {
    supaId: string;
    projectId: string | null;
    userType: string;
}

export interface AccountData {
  firstName: string;
  lastName: string;
}



```

# src/server/helpers.ts

```ts
import { headers } from "next/headers";

/**
 * Get the correct URL for the environment
 * @returns {string} The full URL for the current environment
 */
export const getURL = (path = '') => {
    const headersList = headers();
    const host = headersList.get('host') || headersList.get('x-forwarded-host');

    const base = process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost') ? 'http' : 'https';

    return `${base}://${host}${path}`;
};
```

# src/lib/utils.ts

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# src/constants/urls.ts

```ts
export const AUTH_URLS = [
    '/auth/login',
    '/auth/register',
    '/auth/confirm-email',
]

```

# src/constants/cookies.ts

```ts
export const PENDING_USER = 'pendingUser';
export const CREATED_PROFILE = 'createdProfile';
export const REFERRER = 'referrer';
export const INVITE_CODE = 'invite_code';


```

# src/helpers/metaDataChecker.ts

```ts
import { User } from "@supabase/supabase-js";

export function isProfileComplete(user: User) {
    return (
        user.user_metadata &&
        user.user_metadata.memberType &&
        user.user_metadata.fullName
    );
}

export function isUserConfirmed(user: User | undefined) {
    return (
        user &&
        user.user_metadata &&
        user.user_metadata.confirmed
    );
}
```

# src/app/page.tsx

```tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Landing } from "@/components/main/landing";

export default async function Home() {

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userName = user?.user_metadata.full_name || user?.email; 

  console.log(JSON.stringify(user, null, 2));


  return (
    <Landing userName={userName}/>
  );
}

```

# src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

# src/app/favicon.ico

This is a binary file of the type: Binary

# drizzle/meta/_journal.json

```json
{
  "version": "7",
  "dialect": "postgresql",
  "entries": [
    {
      "idx": 0,
      "version": "7",
      "when": 1724641693439,
      "tag": "0000_aspiring_alex_power",
      "breakpoints": true
    }
  ]
}
```

# drizzle/meta/0000_snapshot.json

```json
{
  "id": "4c930a43-c08a-4ea3-b5ed-1b3292acea68",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "auth.users": {
      "name": "users",
      "schema": "auth",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true
        },
        "email": {
          "name": "email",
          "type": "varchar",
          "primaryKey": false,
          "notNull": true
        },
        "raw_user_meta_data": {
          "name": "raw_user_meta_data",
          "type": "jsonb",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {}
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

# src/server/db/schema.ts

```ts
import {
  pgTableCreator,
  uuid,
  pgSchema,
  varchar,
  jsonb
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `midwestcon_${name}`);

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email").notNull(),
  raw_user_meta_data: jsonb("raw_user_meta_data").notNull(),
});


```

# src/server/db/index.ts

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

```

# src/server/actions/auth.ts

```ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getURL } from "@/utils/helpers";
import { AccountData } from "@/types/profiles";
import { cookies } from "next/headers";
import { PENDING_USER } from "@/constants/cookies";

/**
 * Logs a user in
 * @param email the email of the user
 * @param password the password of the user
 * returns null if successful, or an error message if not
 */
export async function login(email: string, password: string): Promise<string | null> {
  const supabase = createClient();
  
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return error ? error.message : null;
}


/**
 * Registers a user
 * @param email the email of the user
 * @param password the password of the user
 * @returns null if successful, or an error message if not
 */
export async function register(email: string, password: string) : Promise<string | null> {
    const supabase = createClient();

    const userData = {
      email,
      password
    };

    const { data, error } = await supabase.auth.signUp(userData);

    if (error) {
      return error.message;
    }

    await setPendingUser(email);
  
    return null;
}

export async function setPendingUser(email: string) : Promise<void> {
  cookies().set(PENDING_USER, email, { 
    httpOnly: true, 
    secure: true, 
    sameSite: 'strict',
    maxAge: 3600
  })
}

export async function getPendingUser() : Promise<string | undefined> {
  return cookies().get(PENDING_USER)?.value;
}

export async function deletePendingUser() : Promise<void> {
  cookies().delete(PENDING_USER);
}

/**
 * Logs a user out
 */
export async function logout() {
    const supabase = createClient();
  
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      redirect('/error?message=' + error.message);
    }

    redirect('/');
}

/**
 * Completes a user's account
 */
export async function completeAccount(data: AccountData) {
    const supabase = createClient();
    
    if (!data.firstName || !data.lastName) {
        return 'Please enter your first and last name';
    }

    const {error} = await supabase.auth.updateUser({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
      }
    });
    if (error) {
        return error.message;
    }

    return null;
}


/**
 * Updates a user's profile
 * @param data The updated user data
 * @returns null if successful, or an error message if not
 */
export async function updateProfile(data: Partial<AccountData>): Promise<string | null> {
    const supabase = createClient();
    
    const { error } = await supabase.auth.updateUser({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : undefined,
        }
    });

    if (error) {
        return error.message;
    }
    return null;
}

/**
 * Logs in a user with Google
 * @returns redirects to the home page if successful, and back to login page if not
 */
export async function loginWithGoogle(
) : Promise<void> {
  const supabase = createClient();

  const redirectUrl = getURL('/auth/callback');

  console.log("auth url: ", redirectUrl)
  console.log('ahahahaha')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  })

  if (error) {
    redirect('/login?message=' + error.message);
  }

  redirect(data.url)
}

/**
 * Confirms a user's email with OTP
 * @param email email of the user
 * @param otp otp of the user
 * @returns redirects to the home page if successful, and back to login page if not
 */
export async function confirmEmail(
  email: string,
  otp: string
) : Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'signup',
  });

  if (error) {
    redirect('/confirm?message=' + error.message);
  }

  await deletePendingUser();

  redirect('/additional-info');
}


```

# src/utils/supabase/server.ts

```ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export function createAdminClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

# src/utils/supabase/middleware.ts

```ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { AUTH_URLS } from '@/constants/urls';
import { isProfileComplete, isUserConfirmed } from '@/helpers/metaDataChecker';

export async function updateSession(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
    }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {data, error} = await supabase.auth.getUser();

  console.log(request.nextUrl.pathname)

  console.log(!AUTH_URLS.includes(request.nextUrl.pathname))

  if (!AUTH_URLS.includes(request.nextUrl.pathname) && data.user && !isProfileComplete(data.user)) {
    return NextResponse.redirect(new URL('/auth/complete-profile', request.url));
  }

  return response
}

```

# src/utils/supabase/client.ts

```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

# src/components/ui/otp-button.tsx

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { EnterIcon } from "@radix-ui/react-icons"

const buttonVariants = cva(
  "inline-flex rounded-[0.5rem] items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        nav: "hover:bg-hover rounded-full",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        text: "text-primary",
        nextWithEnter: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        default: "h-9 px-4 py-[0.1rem]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  onEnterPress?: () => void
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onEnterPress, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    React.useEffect(() => {
      if (variant === 'nextWithEnter' && onEnterPress) {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            onEnterPress()
          }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
          document.removeEventListener('keydown', handleKeyDown)
        }
      }
    }, [variant, onEnterPress])

    const buttonElement = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )

    if (variant === 'nextWithEnter') {
      return (
        <div className="inline-flex flex-col">
          {buttonElement}
          <div className="text-xs text-foreground/90 flex items-center  mt-2">
            or press <span className="font-bold mx-1">Enter</span> <EnterIcon className="w-4 h-4" />
          </div>
        </div>
      )
    }

    return buttonElement
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }


```

# src/components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

# src/components/ui/input-otp.tsx

```tsx
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

# src/components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# src/app/openai/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const { prompt, type } = await req.json();

  if (!prompt || !type) {
    return NextResponse.json({ error: 'Prompt and type are required' }, { status: 400 });
  }

  try {
    if (type === 'text') {
      const completion = await openai.createCompletion({
        model: 'text-davinci-004',
        prompt,
        max_tokens: 150,
      });

      const result = completion.data.choices[0].text;
      return NextResponse.json({ result });
    } else if (type === 'image') {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const imageUrl = response.data.data[0].url;
      return NextResponse.json({ imageUrl });
    } else {
      return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

```

# src/app/auth/default.tsx

```tsx
export default function AuthDefault() {
    return null;
}
```

# src/components/main/landing.tsx

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logout } from "@/server/actions/auth";

export function Landing({ userName }: { userName: string }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [type, setType] = useState<"text" | "image">("text");

  const handlePromptSubmit = async () => {
    if (!prompt && !file) return;

    try {
      let body;
      if (type === "text") {
        body = JSON.stringify({ prompt, type });
      } else if (type === "image" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("prompt", prompt);
        formData.append("type", type);
        body = formData;
      }

      const response = await fetch('/openai', {
        method: 'POST',
        headers: type === "text" ? { 'Content-Type': 'application/json' } : undefined,
        body,
      });

      const data = await response.json();
      setResult(data.result || data.imageUrl || "No result returned");
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-screen max-w-[1024px] px-4 py-16">
        <div className="py-28 flex flex-col items-center justify-center">
          {!userName ? (
            <Button onClick={() => router.push('/auth/register')}>Login</Button>
          ) : (
            <>
              <h1 className="text-4xl font-bold">Welcome {userName}</h1>
              <div className="flex gap-2">
                <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
                <Button onClick={() => logout()}>Logout</Button>
              </div>

              <div className="mt-8 w-full max-w-md">
                <div className="flex gap-4 mb-4">
                  <Button onClick={() => setType("text")} className={type === "text" ? "bg-blue-500 text-white" : ""}>Text</Button>
                  <Button onClick={() => setType("image")} className={type === "image" ? "bg-blue-500 text-white" : ""}>Image</Button>
                </div>

                {type === "text" ? (
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Submit your crime evidence here..."
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full p-2 border rounded"
                  />
                )}
                
                <Button onClick={handlePromptSubmit} className="mt-2 w-full">
                  Submit Evidence
                </Button>

                {result && (
                  <div className="mt-4 p-4 border rounded bg-gray-100">
                    {type === "text" ? (
                      <p className="whitespace-pre-wrap">{result}</p>
                    ) : (
                      <img src={result} alt="Generated Evidence" className="w-full h-auto" />
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";
// import { logout } from "@/server/actions/auth";

// export function Landing({ userName }: { userName: string }) {
//   const router = useRouter();
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState<string | null>(null);

//   const handlePromptSubmit = async () => {
//     if (!prompt) return;

//     try {
//       const response = await fetch('/api/openai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await response.json();
//       setResult(data.result || "No result returned");
//     } catch (error) {
//       console.error("Error fetching data from OpenAI API:", error);
//       setResult("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <main className="flex flex-col justify-center items-center">
//       <div className="w-screen max-w-[1024px] px-4 py-16">
//         <div className="py-28 flex flex-col items-center justify-center">
//           {!userName ? (
//             <Button onClick={() => router.push('/auth/register')}>Login</Button>
//           ) : (
//             <>
//               <h1 className="text-4xl font-bold">Welcome {userName}</h1>
//               <div className="flex gap-2">
//                 <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
//                 <Button onClick={() => logout()}>Logout</Button>
//               </div>

//               <div className="mt-8 w-full max-w-md">
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   className="w-full p-2 border rounded"
//                   placeholder="Submit your crime evidence here..."
//                 />
//                 <Button onClick={handlePromptSubmit} className="mt-2 w-full">
//                   Submit Evidence
//                 </Button>
//                 {result && (
//                   <div className="mt-4 p-4 border rounded bg-gray-100">
//                     <p className="whitespace-pre-wrap">{result}</p>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


```

# src/app/auth/register/registerForm.tsx

```tsx
"use client";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"


import { useRouter } from "next/navigation";
import { useState } from "react";
import { register, loginWithGoogle } from "@/server/actions/auth";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();
    
    const handleSubmit = async () => {
        const res = await register(email, password);
        setMessage(res || ''); 
        if (res) {
            toast.error(res, {
            duration: 4000, 
            position: 'bottom-right', 
            style: {
                border: '2px solid #333',
                color: '#fff',
                backgroundColor: '#333',
            },
            });
        } else {
            console.log("registered successfully")
            toast.success('Registered successfully', {
            duration: 4000, 
            position: 'bottom-right', 
            style: {
                border: '2px solid #333',
                color: '#fff',
                backgroundColor: '#333',
            }, 
            });

            router.push('/');
        }

    }

    return (
        <Card className="flex flex-col bg-background mx-auto border-none max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl text-center"></CardTitle>
            <CardDescription className="text-m flex flex-col gap-4">
            <Button 
            variant="secondary" 
            className="w-full gap-3"
            onClick={() => loginWithGoogle()}
            >
                <Image
                src={'/google.svg'}
                alt="Google"
                width={20}
                height={20}
                >
                </Image>
                Register with Google
            </Button>
            </CardDescription>
        </CardHeader>
        {/*}
        <div className="flex flex-row justify-center text-center items-center gap-4">
            <p className="w-1/5">Or</p>
        </div>
        <CardContent>
            <div className="grid gap-4">
                <p>{message}</p>
            <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-start">
                <label htmlFor="password">Password</label>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
                Register
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
                Login
            </Link>
            </div>
        </CardContent>
        {*/}
        </Card>
    )
}

```

# src/app/auth/register/page.tsx

```tsx
import RegisterForm from "./registerForm";


export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen py-2">
            <RegisterForm />
        </div>
    )
}
```

# src/app/auth/login/page.tsx

```tsx
import LoginForm from "./loginForm";


export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen py-2">
            <LoginForm />
        </div>
    )
}

```

# src/app/auth/login/loginForm.tsx

```tsx
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, loginWithGoogle } from "@/server/actions/auth";
import { toast } from "react-hot-toast";
import Image from "next/image";



export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const handleSubmit = async () => {
        const res = await login(email, password);

        if (res) {
            setMessage(res);
            toast.error(res, {
                duration: 4000, 
                position: 'bottom-right', 
                style: {
                    border: '2px solid #333',
                    color: '#fff',
                    backgroundColor: '#333',
                },
                });
        } else {
            toast.success('Successfully logged in!', {
                duration: 4000, 
                position: 'bottom-right', 
                style: {
                    border: '2px solid #333',
                    color: '#fff',
                    backgroundColor: '#333',
                },
                });
            router.push('/');
        }

    }

    return (
        <Card className="flex flex-col bg-background mx-auto min-w-[400px] min-h-[450px] max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-m flex flex-col gap-4">
            <Button 
            variant="secondary" 
            className="w-full gap-3"
            onClick={() => loginWithGoogle()}
            >
                <Image
                src={'/google.svg'}
                alt="Google"
                width={20}
                height={20}
                >
                </Image>
                Login with Google
            </Button>
            </CardDescription>
        </CardHeader>
        <div className="flex flex-row justify-center text-center items-center gap-4">
            <p className="w-1/5">Or</p>
        </div>
        <CardContent>
            <div className="grid gap-4">
                <label>{message}</label>
            <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                <label htmlFor="password">Password</label>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
                Login
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
                Sign up
            </Link>
            </div>
        </CardContent>
        </Card>
    )
 
}

```

# src/app/auth/confirm/page.tsx

```tsx
import EnterOtpPage from "./enterOtp"
import { confirmEmail, getPendingUser } from "@/server/actions/auth";

export default async function ConfirmPage() {
  const pendingEmail = await getPendingUser();

  const handleOtp = async (otp: string) => {
    "use server";
    await confirmEmail(pendingEmail ?? '', otp);
  }
  
  if (pendingEmail !== undefined) {
    return <EnterOtpPage email={pendingEmail ?? ''} handleConfirm={handleOtp} />;
  } else {
    return <h1>Code has expired, please try logging in again.</h1>
  }
}

```

# src/app/auth/confirm/enterOtp.tsx

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/otp-button"
import { useSearchParams } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function EnterOtpPage({
  email,
  handleConfirm
} : {
  email: string;
  handleConfirm: (otp: string) => void;
}) {
  const params = useSearchParams()
  const message = params.get('message') ?? ''
  const [otp, setOtp] = useState("")

  const handleResend = () => {
    // Implement resend OTP logic here
    console.log('Resending OTP')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col w-full max-w-lg mx-auto p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold ">Enter OTP.</h1>
          {message && <p className="text-destructive">{message}</p>}
          <p className="text-foreground">Please check <span className="font-bold">{email}</span> for a confirmation code.</p>
          <p className="text-foreground">Enter your OTP to verify.</p>
        </div>
        
        <div className="space-y-8">
        <InputOTP 
          value={otp} 
          onChange={setOtp} 
          maxLength={6}
          className="mb-8 shadow-md"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        
        <div className="w-40 flex flex-col">
        <Button 
          variant="link" 
          className="p-0 h-auto text-sm justify-start text-purple-600 mb-4" 
          onClick={handleResend}
        >
          Resend OTP
        </Button>
        
        <Button 
          variant="nextWithEnter"
          className="font-semibold"
          onClick={() => handleConfirm(otp)}
          onEnterPress={() => handleConfirm(otp)}
        >
          Verify
        </Button>
        </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/auth/callback/route.ts

```ts
/* eslint-disable */

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
```

