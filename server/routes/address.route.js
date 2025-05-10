import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddressController,
  deleteAddressController,
  getAddressController,
  updateAddressController,
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/create", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);
addressRouter.put("/update", auth, updateAddressController);
addressRouter.delete("/disable", auth, deleteAddressController);

export default addressRouter;
