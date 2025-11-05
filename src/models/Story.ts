import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { RegisterUser } from './registerUser';

interface StoryAttributes {
  id: number;
  names: string;
  location: string;
  marriedDate: string;
  story: string;
  testimonial: string;
  image: string;
  userId: number | null;
  isFeatured: boolean;
  color: string;
}

interface StoryCreationAttributes extends Optional<StoryAttributes, 'id'> {}

export class SuccessStory extends Model<StoryAttributes, StoryCreationAttributes>
  implements StoryAttributes {
  public id!: number;
  public names!: string;
  public location!: string;
  public marriedDate!: string;
  public story!: string;
  public testimonial!: string;
  public image!: string;
  public userId!: number | null;
  public isFeatured!: boolean;
  public color!: string;
}

SuccessStory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'id' },
    names: { type: DataTypes.STRING, allowNull: false, field: 'names' },
    location: { type: DataTypes.STRING, allowNull: false, field: 'location' },
    marriedDate: { type: DataTypes.STRING, allowNull: true, field: 'marriedDate' },
    story: { type: DataTypes.TEXT, allowNull: false, field: 'story' },
    testimonial: { type: DataTypes.TEXT, allowNull: true, field: 'testimonial' },
    image: { type: DataTypes.STRING, allowNull: true, field: 'image' },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'userId',
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'isFeatured' },
    color: { type: DataTypes.STRING, allowNull: true, field: 'color' },
  },
  {
    sequelize,
    modelName: 'SuccessStory',
    tableName: 'success_stories',
  }
);

SuccessStory.belongsTo(RegisterUser, { foreignKey: 'userId', as: 'user' });
RegisterUser.hasMany(SuccessStory, { foreignKey: 'userId', as: 'stories' });
