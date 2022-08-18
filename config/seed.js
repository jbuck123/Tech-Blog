// const connection = require("./db_connection");
// const User = require('../models/user');
// // pull in conection and user

// connection.sync({force: true}).then(()=>{
//     User.bulkCreate([
//         {
//             username: "jbuck123",
//             email: "test@gmail.com",
//             password: ("password123" )
//         },
//         {
//             username: "jbuck1234",
//             email: "test1@gmail.com",
//             password: ("password123")
//         },
//         {
//             username: "jbuck12345",
//             email: "test2@gmail.com",
//             password: ("password123")
//         },
//     ]).then((users) => {
//         console.log("users have been seeded correctly")
//         process.exit()
//     });
// });