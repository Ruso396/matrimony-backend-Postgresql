import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { RegisterUser } from './registerUser';

interface PremiumPaymentAttributes {
  id: number;
  userId: number;
  amount: number;
  duration: string;
  paymentMethod: string;
  transactionId: string;
  status: string;
  createdAt?: Date;
}

interface PremiumPaymentCreationAttributes
  extends Optional<PremiumPaymentAttributes, 'id' | 'status' | 'createdAt'> {}

export class PremiumPayment extends Model<PremiumPaymentAttributes, PremiumPaymentCreationAttributes>
  implements PremiumPaymentAttributes {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public duration!: string;
  public paymentMethod!: string;
  public transactionId!: string;
  public status!: string;
  public readonly createdAt!: Date;
}

PremiumPayment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'id' },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'userId' },
    amount: { type: DataTypes.FLOAT, allowNull: false, field: 'amount' },
    duration: { type: DataTypes.STRING, allowNull: false, field: 'duration' },
    paymentMethod: { type: DataTypes.STRING, allowNull: false, field: 'paymentMethod' },
    transactionId: { type: DataTypes.STRING, allowNull: false, field: 'transactionId' },
    status: { type: DataTypes.STRING, defaultValue: 'success', field: 'status' },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'createdAt' },
  },
  {
    sequelize,
    modelName: 'PremiumPayment',
    tableName: 'premiumpayments',
    timestamps: false,
  }
);

RegisterUser.hasMany(PremiumPayment, { foreignKey: 'userId', as: 'payments' });
PremiumPayment.belongsTo(RegisterUser, { foreignKey: 'userId', as: 'user' });
