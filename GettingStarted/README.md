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
