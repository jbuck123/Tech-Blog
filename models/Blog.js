const { DataTypes, Model} = require("sequelize");

const sequelize = require("../config/db_connection");

class Blog extends Model {}

Blog.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    textArea: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
},
{
    sequelize: require("../config/db_connection"),
    // pull in connection
    modelName: 'blog',
    // table name
    
    // timestamps: false
});

module.exports = Blog