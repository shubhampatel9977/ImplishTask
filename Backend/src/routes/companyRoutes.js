const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const companyController = require("../controllers/companyController");

// Define routes
router.get('/', authMiddleware, companyController.getAllCompany);
router.get('/:id', authMiddleware, companyController.getCompanyById);
router.post('/', authMiddleware, companyController.createCompany);
router.put('/:id', authMiddleware, companyController.updateCompanyById);
router.delete('/:id', authMiddleware, companyController.deleteCompanyById);

module.exports = router;
