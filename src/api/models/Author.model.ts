import {Model, UUIDV4} from "sequelize";
import {Author as AuthorAttributes} from "../modules/author/author.typedefs";

module.exports = (sequelize: any, DataTypes: any) => {
  class Author extends Model<AuthorAttributes> implements AuthorAttributes {
    public id!: string;
    public email!: string;
    public firstName!: string;
    public lastName!: string;

    static associate(models: any) {
      Author.hasMany(models.Book, {
        foreignKey: 'authorId',
      });
      models.Book.belongsTo(Author, {
        foreignKey: 'authorId',
      });
    }
  }

  Author.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Author',
  });

  return Author;
}


