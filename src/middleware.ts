import { createNextMiddleware } from "gt-next/middleware";

export default createNextMiddleware();

export const config = {
  matcher: [
    "/((?!_next|_gt|_vercel|api|favicon.ico|.*\\..*).*)",
  ],
};
