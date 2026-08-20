import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import app from "../firebase";

import appCss from "../styles.css?url";
// import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  // useEffect(() => {
  //   reportLovableError(error, { boundary: "tanstack_root_error_component" });
  // }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      { title: "Abdullah Abbad | Full Stack Web Developer & UI/UX Designer" },
      {
        name: "description",
        content:
          "Abdullah Abbad is a Full Stack Web Developer and UI/UX Designer from Lahore, Pakistan, building premium websites, AI-powered applications, dashboards, booking systems, and modern digital experiences.",
      },
      {
        name: "keywords",
        content:
          "Abdullah Abbad, CodeGeniusDev, Full Stack Developer, React Developer, Next.js Developer, TypeScript Developer, UI UX Designer, Web Developer Lahore Pakistan, AI Web Developer, Portfolio, CodeBytes Agency, GSAP, Three.js, Tailwind CSS, Node.js, Firebase, Supabase",
      },
      { name: "author", content: "Abdullah Abbad" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "language", content: "English" },
      { name: "theme-color", content: "#AFCD5F" },
      { name: "color-scheme", content: "dark light" },

      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "Abdullah Abbad Portfolio",
      },
      {
        property: "og:title",
        content: "Abdullah Abbad | Full Stack Web Developer & UI/UX Designer",
      },
      {
        property: "og:description",
        content:
          "Premium portfolio of Abdullah Abbad showcasing modern web development, UI/UX design, AI-powered applications, and interactive digital experiences.",
      },
      {
        property: "og:url",
        content: "https://abdullahabbad.netlify.app/",
      },
      {
        property: "og:image",
        content: "https://abdullahabbad.netlify.app/og-image.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },

      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Abdullah Abbad | Full Stack Web Developer",
      },
      {
        name: "twitter:description",
        content:
          "Full Stack Web Developer, UI/UX Designer, and AI enthusiast building premium web experiences.",
      },
      {
        name: "twitter:image",
        content: "https://abdullahabbad.netlify.app/og-image.jpg",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C08HKEQ509"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-C08HKEQ509');
      `,
          }}
        />

      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
