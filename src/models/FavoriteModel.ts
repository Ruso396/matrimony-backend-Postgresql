import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { RegisterUser } from './registerUser';

interface FavoriteAttributes {
  id: number;
  userId: number;
  favoriteUserId: number;
}

interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> {}

export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes>
  implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public favoriteUserId!: number;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
    },
    favoriteUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'favoriteUserId',
    },
  },
  {
    sequelize,
    tableName: 'favorites',
    modelName: 'Favorite',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'favoriteUserId'],
      },
    ],
  }
);

RegisterUser.hasMany(Favorite, {
  foreignKey: 'userId',
  as: 'favorites',
  onDelete: 'CASCADE',
});

Favorite.belongsTo(RegisterUser, {
  foreignKey: 'userId',
  as: 'user',
});
