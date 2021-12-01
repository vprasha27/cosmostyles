const express = require("express");
const router = express.Router();
const PUBLISHABLE_KEY = "pk_test_Wl2rlrhGcvRBzUSYmAK7FhSE00nHDHsr3N"

//create a route named /admin/login that will be used to display the admin page
router.get("/", (req, res) => {
  res.render("Home");
});

router.get("/app/home", (req, res) => {
  res.render("Home");
});

//create a route named /admin/login that will be used to display the admin page
router.get("/admin/login", (req, res) => {
  res.render("admin-login");
});

//create a route named /admin/login that will be used to display the admin page
router.get("/app/login", (req, res) => {
  res.render("user-login");
});

//create a route named /admin/login that will be used to display the admin page
router.get("/app/success", (req, res) => {
  res.render("success");
});

//create a route named /admin/login that will be used to display the admin page
router.get("/app/cart", (req, res) => {
  res.render("cart");
});

//create a route named /admin/login that will be used to display the admin page
router.get("/app/billing", (req, res) => {
  res.render("billing");
  Key:PUBLISHABLE_KEY
});

//create a route named /admin/login that will be used to display the admin page
router.get("/app/orders", (req, res) => {
  res.render("user-order");
});

//create a route named /admin/login that will be used to display the admin page
router.get("/app/shipping", (req, res) => {
  res.render("shipping");
});

//create a router to fetch the list of all users
router.get("/admin/users", (req, res) => {
  res.render("admin-users-list");
});

router.get("/admin/products", (req, res) => {
  res.render("admin-product-list");
});

router.get("/admin/product/edit/:id", (req, res) => {
  res.render("admin-edit-product");
});

router.get("/admin/jobs", (req, res) => {
  res.render("jobs-list");
});

router.get("/admin/socials", (req, res) => {
  res.render("socials-list");
});

router.get("/admin/product/add", (req, res) => {
  res.render("product-add");
});

router.get("/admin/job/add", (req, res) => {
  res.render("admin-jobs-add");
});

router.get("/admin/social/add", (req, res) => {
  res.render("admin-socials-add");
});

router.get("/app/product/:id", (req, res) => {
  res.render("product");
});

router.get("/app/shop", (req, res) => {
  res.render("Home");
});

router.get("/app/about", (req, res) => {
  res.render("about");
});

router.get("/app/career", (req, res) => {
  res.render("career");
});

router.get("/app/contact", (req, res) => {
  res.render("contact");
});

router.get("/app/prime", (req, res) => {
  res.render("prime");
});

router.get("/app/profile", (req, res) => {
  res.render("profile");
});

router.get("/app/forgot-password", (req, res) => {
  res.render("forgot-password");
});

router.get("/app/otp", (req, res) => {
  res.render("otp");
});

router.get("/app/reset-password", (req, res) => {
  res.render("update-password");
});

router.get("/app/register", (req, res) => {
  res.render("register");
});

module.exports = router;
