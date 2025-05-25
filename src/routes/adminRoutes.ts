import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import {
  getUserDetails,
  updateUserDetails,
  login,
  createUser,
} from "../controllers/userController";
import { getDashboard } from "../controllers/dashboardController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Login (no auth required)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }
    next();
  },
  login
);

// Create User (no auth required)
router.post(
  "/users",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("websiteName").notEmpty().withMessage("Website name is required"),
    body("hero").isObject().withMessage("Hero data is required"),
    body("hero.firstName").notEmpty().withMessage("First name is required"),
    body("hero.lastName").notEmpty().withMessage("Last name is required"),
    body("hero.location").isObject().withMessage("Location is required"),
    body("hero.location.country").notEmpty().withMessage("Country is required"),
    body("hero.location.city").notEmpty().withMessage("City is required"),
    body("hero.location.street").notEmpty().withMessage("Street is required"),
    body("hero.location.zipCode")
      .notEmpty()
      .withMessage("Zip code is required"),
    body("hero.userImage").notEmpty().withMessage("User image is required"),
    body("hero.bannerImage").notEmpty().withMessage("Banner image is required"),
    body("about").isObject().withMessage("About data is required"),
    body("about.skills.description")
      .notEmpty()
      .withMessage("Skills description is required"),
    body("about.skills.skillsList")
      .isArray()
      .withMessage("Skills list must be an array"),
    body("services").isArray().withMessage("Services must be an array"),
    body("projects").isArray().withMessage("Projects must be an array"),
    body("skills").isObject().withMessage("Skills data is required"),
    body("skills.technologies")
      .isArray()
      .withMessage("Technologies must be an array"),
    body("skills.professionalSkills")
      .isArray()
      .withMessage("Professional skills must be an array"),
    body("contact").isObject().withMessage("Contact data is required"),
    body("contact.phone.countryCode")
      .notEmpty()
      .withMessage("Phone country code is required"),
    body("contact.phone.number")
      .notEmpty()
      .withMessage("Phone number is required"),
    body("contact.email")
      .isEmail()
      .withMessage("Valid contact email is required"),
    body("contact.location")
      .isObject()
      .withMessage("Contact location is required"),
    body("contact.cvLink").notEmpty().withMessage("CV link is required"),
    body("contact.googleMapLink")
      .notEmpty()
      .withMessage("Google map link is required"),
    body("socialLinks").isObject().withMessage("Social links are required"),
    body("socialLinks.facebook")
      .notEmpty()
      .withMessage("Facebook link is required"),
    body("socialLinks.instagram")
      .notEmpty()
      .withMessage("Instagram link is required"),
    body("socialLinks.github")
      .notEmpty()
      .withMessage("GitHub link is required"),
    body("socialLinks.linkedin")
      .notEmpty()
      .withMessage("LinkedIn link is required"),
    body("socialLinks.twitter")
      .notEmpty()
      .withMessage("Twitter link is required"),
    body("socialLinks.youtube")
      .notEmpty()
      .withMessage("YouTube link is required"),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }
    next();
  },
  createUser
);

// Protected Routes
router.use(authMiddleware);

router.get("/user-details", getUserDetails);
router.put(
  "/user-details",
  [
    body("websiteName").optional().isString(),
    body("hero.firstName").optional().isString(),
    body("hero.lastName").optional().isString(),
    body("hero.location.country").optional().isString(),
    body("hero.location.city").optional().isString(),
    body("hero.location.street").optional().isString(),
    body("hero.location.zipCode").optional().isString(),
    body("hero.userImage").optional().isString(),
    body("hero.bannerImage").optional().isString(),
    body("about.skills.description").optional().isString(),
    body("about.skills.skillsList").optional().isArray(),
    body("services").optional().isArray(),
    body("projects").optional().isArray(),
    body("skills.technologies").optional().isArray(),
    body("skills.professionalSkills").optional().isArray(),
    body("contact.phone.countryCode").optional().isString(),
    body("contact.phone.number").optional().isString(),
    body("contact.email").optional().isEmail(),
    body("contact.location").optional().isObject(),
    body("contact.cvLink").optional().isString(),
    body("contact.googleMapLink").optional().isString(),
    body("socialLinks.facebook").optional().isString(),
    body("socialLinks.instagram").optional().isString(),
    body("socialLinks.github").optional().isString(),
    body("socialLinks.linkedin").optional().isString(),
    body("socialLinks.twitter").optional().isString(),
    body("socialLinks.youtube").optional().isString(),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }
    next();
  },
  updateUserDetails
);
router.get("/dashboard", getDashboard);

export default router;
