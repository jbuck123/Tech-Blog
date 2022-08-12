// require sequelize 
const { DataTypes, Model } = require('sequelize');
const bcrypt = require("bcrypt")

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
                len: 2,
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
        modelName: 'user',
        // table name
        hooks: {
            async beforeCreate(user) {
                const hashed_pass = await bcrypt.hash(user.password, 10);

                user.password = hashed_pass
            },
        },
        timestamps: true
    }
);

User.prototype.validatePassword = async function (password, stored_password) {
    return await bcrypt.compare(password, stored_password);
};

// User.hasmany(Blog)
// Blogs.belongsTo(User)

module.exports = User;