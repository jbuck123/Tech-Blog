// require sequelize 
const { DataTypes, Model } = require('sequelize');

class User extends Model{}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                lend: 2,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 6,
            },
        },
    },
    {
        sequelize: require("../config/db_connection"),
        // pull in connection
        modelName: 'user'
        // table name
        // not going to use bcrypt bc it is not required but hook would go here
    }
);

module.exports = User;