# Getting Started

## Server-Side Rendering ways

### 1. Static Site Generation (SSG)

The HTML is generated **once** when you build your application. The pages are then stored as static files and served via a Content Delivery Network (CDN).

- **When it happens:** During the build process (before the site goes live).
- **Performance:** Blazing fast. Since the server doesn't have to "think" when a user clicks a link, it just hands over a pre-made file.
- **Best for:** Blogs, documentation, marketing sites, or any content that doesn't change based on who is looking at it.
- **The Downside:** If you have 10,000 products and one price changes, you technically have to rebuild the whole site to update that one page (though modern frameworks have "Incremental" fixes for this).

### 2. Dynamic Server-Side Rendering (SSR)

This is what most people mean when they use the specific term "SSR." The HTML is generated **on-the-fly** every single time a user requests a page.

- **When it happens:** At "Runtime" (the moment a user hits Enter on their browser).
- **Performance:** Slightly slower than static because the server has to fetch data from a database and "render" the HTML before sending it back.
- **Best for:** Personalized dashboards, social media feeds, or any site where the data changes constantly (like stock prices or weather).
- **The Benefit:** The content is always 100% up-to-date and can be tailored specifically to the logged-in user.

### Comparison at a Glance

| Feature        | Static (SSG)              | Dynamic (SSR)                |
| -------------- | ------------------------- | ---------------------------- |
| Speed          | Instant (CDN cached)      | Moderate (Server processing) |
| Data Freshness | Outdated until next build | Always real-time             |
| Server Load    | Very low                  | Higher (computational cost)  |
| SEO            | Excellent                 | Excellent                    |

**A Quick Nuance:** Modern frameworks like Next.js or Nuxt have blurred these lines. They offer something called **ISR (Incremental Static Regeneration)**, which allows you to update static pages in the background after the build, giving you the speed of Static with the freshness of Dynamic.

## Hydration

**Hydration is the process where React takes HTML that was rendered on the server and “wires it up” on the client so it becomes interactive.**

Think of it like this:

- **Server**: Sends down fully rendered HTML (fast first paint, good SEO)
- **Browser**: Displays that HTML immediately
- **React (client-side)**: Attaches event listeners, state, and effects → now it’s a real React app

Without hydration, the page would look right but be **completely dead** (no clicks, no state updates).

### The SSR → hydration lifecycle in Next.js

1. Request hits the server

Depending on your setup, Next.js:

- Runs a **Server Component**
- Or runs `getServerSideProps`
- Or renders a page via the App Router

2. HTML is rendered on the server

React renders your components to static HTML:

```html
<button>Click me</button>
```

This HTML is sent to the browser.

3. Browser paints the page

User sees content immediately (this is the big win of SSR).

4. Client-side JavaScript loads

Next.js downloads:

- React
- Your component code
- Page-specific JS

5. Hydration begins

React calls something like:

```js
hydrateRoot(container, <App />);
```

React:

- Re-runs the same components **on the client**
- Compares the output to the existing DOM
- Attaches event handlers instead of replacing DOM nodes

If everything matches → hydration is fast and invisible.

## React Server Components (RSC)

React Server Components are components that:

- Run **only on the server**
- Never ship their JavaScript to the browser
- Can directly access backend resources (DBs, secrets, filesystem)
- Render into a special serialized format that React can understand

They let you build React UIs where **most components never become client-side JS at all.**

In Next.js App Router, **every component is a Server Component by default.**

### The problem RSCs solve

Before RSCs, even with SSR:

- The server rendered HTML
- But the **same components still had to run again in the browser**
- Meaning:
  - Large JS bundles
  - Duplicate work
  - Slow hydration
  - Client JS doing backend-shaped work

RSCs break this assumption.

> "Not everything needs to be interactive."

### Server Components vs Client Components

#### Server Components (default)

✅ Run on the server
✅ Can access databases, APIs, secrets
✅ Zero JS sent to browser
❌ No state
❌ No effects
❌ No event handlers

```tsx
// Server Component
export default async function UserProfile() {
  const user = await db.user.findFirst();

  return <h1>Hello {user.name}</h1>;
}
```

#### Client Components ('use client')

✅ Run in the browser
✅ Can use hooks (`useState`, `useEffect`)
✅ Can handle events
❌ Can’t access server-only resources

```tsx
"use client";

export function LikeButton() {
  const [likes, setLikes] = useState(0);

  return <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>;
}
```

### How Server Components actually work (under the hood)

This part is key.

1. **Server renders RSCs**

React executes Server Components on the server and produces:

- HTML
- Plus a **React Server Component payload** (not HTML, not JS)

2. **RSC payload is streamed to the browser**

This payload describes:

- Component tree structure
- Props
- References to Client Components

3. **Browser reconstructs the tree**

The client:

- Builds the React tree from the RSC payload
- Downloads JS only for Client Components
- Hydrates only those client components

**Server Components themselves are never hydrated.**

### Streaming + Suspense is not optional anymore

Server Components pair naturally with `Suspense`.

```tsx
<Suspense fallback={<Loading />}>
  <ProductList />
</Suspense>
```

What happens:

- HTML streams immediately
- Slow data fetches don’t block the whole page
- Hydration happens progressively

This is how Next.js achieves **time-to-first-byte improvements** without waterfalls.

### Data fetching in RSCs (the “aha” moment)

With RSCs, data fetching becomes _part of rendering_.

```tsx
async function Posts() {
  const posts = await fetch("https://api.example.com/posts").then((res) =>
    res.json(),
  );
  return <PostList posts={posts} />;
}
```

No:

- `useEffect`
- Loading state boilerplate
- Client waterfalls

React just… waits.

### Caching and revalidation (Next.js specific)

Next.js layers caching on top of RSCs:

```ts
fetch(url, { cache: "force-cache" });
fetch(url, { next: { revalidate: 60 } });
```

This means:

- Server Components can be static
- Or revalidated
- Or fully dynamic

And **React doesn't care** — it just renders.

### What Server Components cannot do (important)

You cannot use:

- `useState`
- `useEffect`
- `useContext` (client context)
- Event handlers (`onClick`)
- Browser APIs (`window`, `document`)

If you need those → `'use client'`.

### The “Client Boundary” concept

When you mark a file with `'use client'`:

- That component
- And everything it imports becomes part of the client bundle.

So structure matters:

```tsx
// Good
<ServerData>
  <ClientWidget />
</ServerData>
```

```tsx
// Bad
"use client";

import ServerData from "./ServerData"; // ❌ pulls server logic into client
```

### RSCs + hydration together

This is the clean separation:

| Phase         | What runs              |
| ------------- | ---------------------- |
| Server render | Server Components      |
| HTML paint    | Browser                |
| Hydration     | Client Components only |
| Interaction   | Client Components      |

**Less hydration = faster app.**

### Why RSCs feel weird at first

They violate old React instincts:

- “Components must be universal”
- “Fetch in effects”
- “Everything hydrates”

RSCs say:

- Fetch during render
- Most components never hydrate
- JS is opt-in

Once it clicks, apps get simpler and faster.

### When NOT to use Server Components

Avoid them for:

- Highly interactive widgets
- Client-only state machines
- Drag-and-drop
- Animations tied to scroll or input

Use them for:

- Layout
- Data fetching
- Content
- Auth-gated pages
- Anything mostly static

### One-sentence summary

> React Server Components let you render most of your app on the server, ship almost no JavaScript, and hydrate only what actually needs to be interactive.
