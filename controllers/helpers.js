// exposts is shorthand for module.exports 
// this file is exporting a function that checks to see if user is logged in

exports.isLoggedIn = function (req, res, next) {
    const user_id = req.session.userId;
                                //userId is created in the user model page 
    const is_auth_route = req.path.match(/register|login/gi);

    if(is_auth_route && user_id){
        return res.redirect('/');
    }

    next();
}