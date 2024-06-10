"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    for (let i = 0; i < 10; i++) {
      let fname = faker.person.firstName();
      let lname = faker.person.lastName();
      let user = {
        name: fname + " " + lname,
        email: faker.internet.email({ firstName: fname, lastName: lname }),
        password: bcrypt.hashSync("password", 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
    }
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
