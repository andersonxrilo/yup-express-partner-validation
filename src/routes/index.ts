import { Router } from "express";
import * as router_user from "./user.route";
const router = Router();

router.use(router_user.router);

export default router;
