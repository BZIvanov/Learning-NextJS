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
