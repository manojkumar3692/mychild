'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('family_relations', [
      {
        id: 1,
        relation: 'appa - அப்பா',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        relation: 'amma - அம்மா',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        relation: 'thatha - தாத்தா',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        relation: 'paati - பாட்டி',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        relation: 'anna - அண்ணா',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        relation: 'akka - அக்கா',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        relation: 'thangachi - தங்கச்சி',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        relation: 'thambi - தம்பி',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        relation: 'periyapa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        relation: 'periyamma',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        relation: 'chithi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        relation: 'anni',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        relation: 'kollu paati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        relation: 'kollu thatha',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('family_relations', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('family_relations', null, {});
    */
  }
};
