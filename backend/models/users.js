// const bcrypt = require('bcryptjs'); 

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('user', {
        // Define your model attributes here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isEmail: true,  // Validate email format
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        timestamps: false,
        tableName: 'users',      // Explicitly specify the table name
        freezeTableName: true,   // Disable pluralization
        // hooks: {
        //     beforeSave: async (user) => {
        //         if (user.changed('password')) {  // Only hash if the password has changed
        //             user.password = await bcrypt.hash(user.password, 10);
        //         }
        //     },
        // },
    });

    return Users;
};
