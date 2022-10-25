import {Model} from "sequelize";
import {Book as BookAttributes} from "../modules/book/book.typedefs";

module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model<BookAttributes> implements BookAttributes {
    public id!: number;
    public authorId!: string;
    public title!: string;
  }

  Book.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};
