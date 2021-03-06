'use strict';

const chalk = require('chalk');
const db = require('../store/db');
const response = require('../network/response');

const joinInclude = [
  {
    model: db.city,
    attributes: ['id', 'name'],
    include: [
      {
        model: db.country,
        attributes: ['id', 'name'],
        include: [{ model: db.region, attributes: ['id', 'name'] }],
      },
    ],
  },
];

const joinAttributes = ['id', 'name', 'email', 'address'];

exports.listCompany = async (req, res) => {
  try {
    let companys;
    if (req.query.name) {
      companys = await db.company.findOne({
        where: {
          name: req.query.name,
        },
      });
    } else {
      companys = await db.company.findAll({
        include: joinInclude,
        attributes: joinAttributes,
      });
    }
    if (!companys) {
      return response.error(req, res, 'Not found', 404);
    }
    response.success(req, res, companys, 200);
  } catch (err) {
    console.error(chalk.red('ctr-company-list'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await db.company.findOne({
      where: {
        id: req.params.id,
      },
      include: joinInclude,
      attributes: joinAttributes,
    });
    if (!company) {
      return response.success(req, res, 'Not found', 404);
    }
    response.success(req, res, company, 200);
  } catch (err) {
    console.error(chalk.red('ctr-company-getId'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.insertCompany = async (req, res) => {
  try {
    const { name, email, address, regionId, countryId, cityId } = req.body;

    const create = await db.company.create({
      name,
      email,
      address,
      RegionId: regionId,
      CountryId: countryId,
      CityId: cityId,
    });
    if (create.dataValues) {
      const company = await db.company.findOne({
        where: {
          id: create.dataValues.id,
        },
        include: joinInclude,
        attributes: joinAttributes,
      });
      response.success(req, res, company, 201);
    }
  } catch (err) {
    console.error(chalk.red('ctr-company-insert'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.updatedCompany = async (req, res) => {
  try {
    const { name, email, address, regionId, countryId, cityId } = req.body;

    const company = await db.company.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!company) {
      return response.error(req, res, 'Not found', 404);
    }

    await db.company.update(
      {
        name,
        email,
        address,
        RegionId: regionId,
        CountryId: countryId,
        CityId: cityId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const companyUpdated = await db.company.findOne({
      where: {
        id: req.params.id,
      },
      include: joinInclude,
      attributes: joinAttributes,
    });
    response.success(req, res, companyUpdated, 200);
  } catch (err) {
    console.error(chalk.red('ctr-company-updated'), err);
    response.error(req, res, err.message, 500);
  }
};

exports.deletedCompany = async (req, res) => {
  try {
    const company = await db.company.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!company) {
      return response.error(req, res, 'Not found', 404);
    }
    await db.company.destroy({
      where: {
        id: req.params.id,
      },
    });
    response.success(req, res, 'The company has been removed', 200);
  } catch (err) {
    console.error(chalk.red('ctr-company-delete'), err);
    response.error(req, res, err.message, 500);
  }
};
