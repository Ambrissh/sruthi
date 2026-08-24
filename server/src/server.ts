import { app } from "./app.js";

// Vercel invokes the Express app as a serverless function. Locally, keep a
// normal HTTP listener for `npm run dev:api`.
if (!process.env.VERCEL) {
  const port = Number(process.env.PORT ?? 8787);
  app.listen(port, () => {
    console.log(`Shruthi Swara Laya API listening on port ${port}`);
  });
}

export default app;
