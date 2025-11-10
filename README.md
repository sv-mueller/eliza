## Requirements

Install Vercel CLI: `pnpm i -g vercel@latest`

## Updating

Update Vercel CLI: `pnpm i -g vercel@latest`

## Environment Variables

Create and maintain environment variables in Vercel: https://vercel.com/sv-mueller-projects/~/settings/environment-variables

Pull environment variable updates via: `vercel env pull .env.development.local`

## Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Docs

The following resources are helpful understanding and making better use of the underlying technolgies:

- [Next.js Documentation](https://nextjs.org/docs) - Web Framework and Deployment platform
- [React Documentation](https://react.dev/) - UI library
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview) - Database ORM
- [Neon](https://neon.com/docs/introduction) - Serverless Postgres platform with branching
- [Better Auth](https://www.better-auth.com/docs/introduction) - Authentication framework
- [SimpleWebAuthn](https://simplewebauthn.dev/docs/) - WebAuthn library
- [shadcn](https://ui.shadcn.com/docs/) - Designed components that you can customize, extend, and build on.
- [tailwindcss](https://tailwindcss.com/docs/installation/framework-guides/nextjs) - Utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/get-started) - Form validation
- [Zod](https://zod.dev/) - Schema validation
- [TanStack Table](https://tanstack.com/table/v8/docs/introduction) - Tables and datagrids
- [Statsig Feature Flags](https://docs.statsig.com/feature-flags/overview) - Feature Flags

## Database

The database is a serververless postgress database hosted on Neon.
There is Preview and Production branch.

### Drizzle Studio

The database can be inspected and manipulated via Drizzle Studio.

Run the following command to start Drizzle Studio: `pnpm drizzle-kit studio`

Open the following link in your browser: https://local.drizzle.studio/

### Better-Auth schemas

The authentication schemas for Better-Auth can be generated via: `pnpx @better-auth/cli generate`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
