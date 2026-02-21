# Server Components

In **Next.js App Router**, components are:

- **Server Components** (default)
- **Client Components** (`"use client"`)

A **Client Component runs in the browser**, while a **Server Component runs on the server**.

Because of this:

- Server Components can import Client Components
- Client Components **cannot import Server Components**

## Rendering server components in client components

Pass Server Components as `children`.

**Server component:**

```tsx
// ServerComponent.tsx (default server)
export default async function ServerComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

**Client component:**

```tsx
"use client";

export default function ClientComponent({ children }) {
  return <div className="wrapper">{children}</div>;
}
```

**Usage in a Server Component:**

```tsx
import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";

export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  );
}
```

This works because:

- The **parent is a Server Component**
- The Client Component receives rendered Server content as children
