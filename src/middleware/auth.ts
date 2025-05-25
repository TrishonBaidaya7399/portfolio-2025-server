import { expressjwt } from "express-jwt";
console.log({ JWT_TOKEN: process.env.JWT_SECRET });
export const authMiddleware = expressjwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ["HS256"],
  requestProperty: "auth",
}).unless({ path: ["/api/admin/login", "/api/contact"] });
