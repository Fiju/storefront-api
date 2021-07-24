import express from "express";
import jwt from "jsonwebtoken";

export default async (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    const token: string = (authorizationHeader &&
      authorizationHeader.split(" ")[1]) as string;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN as string);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(401).json("Permission not allowed");
  }
};
