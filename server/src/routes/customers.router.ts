import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  postCustomer,
} from "../controllers/customers.controller";
import validateCustomer from "../middleware/customer.validator";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", validateCustomer, postCustomer);

export default router;
