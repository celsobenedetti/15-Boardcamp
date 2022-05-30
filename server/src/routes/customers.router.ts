import { Router } from "express";
import {
  getCustomerById,
  getCustomers,
  postCustomer,
  putCustomer,
} from "../controllers/customers.controller";
import validateCustomer from "../middleware/customer.validator";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", validateCustomer, postCustomer);
router.put("/:id", validateCustomer, putCustomer);

export default router;
