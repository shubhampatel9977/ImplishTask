const Joi = require('joi');
const companyService = require("../services/companyService");

// Controller methods
const getAllCompany = async(req, res) => {
  try{
    const allCompanys = await companyService.getAllCompany();
    if(allCompanys) {
      res.status(200).json({ data: allCompanys });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyById = async(req, res) => {
  try{
    const { id } = req.params;
    if(id) {
      const companyById = await companyService.getCompanyById(id);
      if(companyById) {
        res.status(200).json({ data: companyById });
      }
    } else {
      res.status(400).json({ message: "Please check id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCompany = async(req, res) => {
  try {
    const schema = Joi.object({
      code: Joi.allow(""),
      name: Joi.string().required(),
      machines: Joi.number().required(),
      area: Joi.string().required(),
      link: Joi.string().required(),
      frequency: Joi.string().required(),
      c_number: Joi.string().required(),
      remark: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);

    if(error) res.status(400).json({ message: error });
    
    const result = await companyService.createCompany(value);

    if(result) {
      res.status(201).json({ message: "Company add successfully", data: result });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCompanyById = async(req, res) => {
  try {
    const { id } = req.params
    const schema = Joi.object({
      code: Joi.number().required(),
      name: Joi.string().required(),
      machines: Joi.number().required(),
      area: Joi.string().required(),
      link: Joi.string().required(),
      frequency: Joi.string().required(),
      c_number: Joi.string().required(),
      remark: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);

    if(error) res.status(400).json({ message: error });

    const result = await companyService.updateCompanyById(id, value);
    if(result) {
      res.status(200).json({ message: "Company update successfully", data: result});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCompanyById = async(req, res) => {
  try{
    const { id } = req.params
    if(id) {
      const result = await companyService.deleteCompanyById(id);
      if(result) {
        res.status(200).json({ message: "Company delete successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCompany,
  getCompanyById,
  createCompany,
  updateCompanyById,
  deleteCompanyById
};