import { DataTypes, Model, Optional, Association } from "sequelize";
import { sequelize } from "../config/db";
import { RegisterUser } from "./registerUser";

interface InterestRequestAttributes {
  id?: number;
  senderId: number;
  receiverId: number;
  status: "pending" | "accepted" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

// ✅ Extend to allow associated models in typing
interface InterestRequestWithRelations extends InterestRequestAttributes {
  sender?: RegisterUser;
  receiver?: RegisterUser;
}

interface InterestRequestCreationAttributes
  extends Optional<InterestRequestAttributes, "id"> {}

export class InterestRequest
  extends Model<InterestRequestWithRelations, InterestRequestCreationAttributes>
  implements InterestRequestWithRelations
{
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public status!: "pending" | "accepted" | "rejected";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // ✅ Define association properties (optional fields)
  public readonly sender?: RegisterUser;
  public readonly receiver?: RegisterUser;

  public static associations: {
    sender: Association<InterestRequest, RegisterUser>;
    receiver: Association<InterestRequest, RegisterUser>;
  };
}

InterestRequest.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
    senderId: { type: DataTypes.INTEGER, allowNull: false, field: 'senderId' },
    receiverId: { type: DataTypes.INTEGER, allowNull: false, field: 'receiverId' },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
      field: 'status',
    },
  },
  {
    sequelize,
    tableName: "interest_requests",
    timestamps: true,
  }
);

// ✅ Define associations
InterestRequest.belongsTo(RegisterUser, {
  as: "sender",
  foreignKey: "senderId",
});

InterestRequest.belongsTo(RegisterUser, {
  as: "receiver",
  foreignKey: "receiverId",
});
