const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

/*
User.hasMany(Article, { foreignKey: "userId" });
Article.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Article.hasMany(Comment, { foreignKey: "articleId" });
Comment.belongsTo(Article, { foreignKey: "articleId" });
*/

User.hasMany(Article);
Article.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Article.hasMany(Comment);
Comment.belongsTo(Article);

/**
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
