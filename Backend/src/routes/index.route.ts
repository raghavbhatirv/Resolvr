import { Router } from "express";
import { dnsRouter } from "./dns.route.js";

export const router = Router();

router.use("/dns", dnsRouter)