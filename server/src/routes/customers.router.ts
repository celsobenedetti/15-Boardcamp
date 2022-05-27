import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  postCustomer,
} from "../controllers/customers.controller";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", postCustomer);

export default router;
