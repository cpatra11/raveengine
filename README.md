.env
use resend api key and remove EMAIL_SENDING_ADDRESS and EMAIL_SENDING_PASSWORD if using resend.
if not using resend, then use EMAIL_SENDING_ADDRESS and EMAIL_SENDING_PASSWORD.

```bash
RESEND_API_KEY=
RESEND_API_KEY_PASS=
DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

UPLOADTHING_TOKEN=

EMAIL_SENDING_ADDRESS=
EMAIL_SENDING_PASSWORD=
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

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

    Auth → Stripe → Basic Dashboard

    Testimonial Upload → Simple Analysis

    Template Builder → PDF Export

    Usage Tracking → Team Features

    Polish → Testing → Launch
