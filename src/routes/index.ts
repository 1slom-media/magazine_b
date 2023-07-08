import { Router } from "express";
import admin from "../controller/admin";
import banner_category from "../controller/banner_category";
import banner from "../controller/banner";
import brands from "../controller/brands";
import category from "../controller/category";
import sub_category from "../controller/sub_category";
import products from "../controller/products";
import orders from "../controller/orders";
import users from "../controller/users";

const router = Router()

// route admin
router.get("/admins",admin.Get);
router.post("/postadmin",admin.Post);
router.post("/loginadmin",admin.SignIn);
router.get("/admins/:id",admin.GetId);
router.put("/admins/:id",admin.Put);

// route banner_category
router.get("/banner_category",banner_category.Get)
router.get("/banner_category/:id",banner_category.GetId)
router.post("/banner_category",banner_category.Post)
router.put("/banner_category/:id",banner_category.Put)
router.delete("/banner_category/:id",banner_category.Delete)

// route banner
router.get("/banner",banner.Get)
router.get("/banner/:id",banner.GetId)
router.post("/banner",banner.Post)
router.put("/banner/:id",banner.Put)
router.delete("/banner/:id",banner.Delete)

// route brands
router.get("/brands",brands.Get)
router.get("/brandssearch",brands.GetSearch)
router.get("/brands/:id",brands.GetId)
router.post("/brands",brands.Post)
router.put("/brands/:id",brands.Put)
router.delete("/brands/:id",brands.Delete)

// route category
router.get("/category",category.Get)
router.get("/category/:id",category.GetId)
router.post("/category",category.Post)
router.put("/category/:id",category.Put)
router.delete("/category/:id",category.Delete)

// route sub_category
router.get("/sub_category",sub_category.Get)
router.get("/sub_category/:id",sub_category.GetId)
router.post("/sub_category",sub_category.Post)
router.put("/sub_category/:id",sub_category.Put)
router.delete("/sub_category/:id",sub_category.Delete)

// route products
router.get("/products",products.Get)
router.get("/searchprod",products.GetSearch)
router.get("/products/:id",products.GetId)
router.post("/products",products.Post)
router.put("/products/:id",products.Put)
router.delete("/products/:id",products.Delete)

// route orders
router.get("/orders",orders.Get)
router.get("/searchorder",orders.GetSearch)
router.get("/orders/:id",orders.GetId)
router.post("/orders",orders.Post)
router.put("/orders/:id",orders.Put)
router.delete("/orders/:id",orders.Delete)

// route users
router.get('/users',users.Get)
router.get('/users/:id',users.GetId)
router.post('/register',users.SignUp)
router.post('/login',users.SignIn)
router.put('/users/:id',users.Put)

export default router;