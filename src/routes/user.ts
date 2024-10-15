import { Router } from "express";
import jwt from "jsonwebtoken";
import createUser from "../controllers/createUser";
import loginUser from "../controllers/loginUser";

const userRoutes = Router();

userRoutes.post("/createuser", createUser);
userRoutes.post("/loginuser", loginUser);
// userRoutes.post("/refresh", (req, res) => {
//   const { name, password }: { name: string; password: string } = req.body;

//   if (req.cookies?.jwt) {
//     const refreshToken = req.cookies.jwt;
//     jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET!,
//       (err: any, decoded: any) => {
//         if (err) {
//           return res.status(406).json({ message: "Unauthorized" });
//         } else {
//           const accessToken = jwt.sign(
//             {
//               name: name,
//               password: password,
//             },
//             process.env.ACCESS_TOKEN_SECRET!,
//             {
//               expiresIn: "10m",
//             }
//           );
//           return res.json({ accessToken });
//         }
//       }
//     );
//   }
// });

export default userRoutes;
