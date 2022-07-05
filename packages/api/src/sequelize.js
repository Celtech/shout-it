const Sequelize = require('sequelize');

module.exports = function sequelizeService(app) {
  const connectionString = app.get('mysql');
  const connectionDialect = app.get('dbDialect');
  const sequelize = new Sequelize(connectionString, {
    dialect: connectionDialect,
    logging: false,
    define: {
      freezeTableName: true,
    },
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function sequelizeSetup(...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync());

    return result;
  };
};
