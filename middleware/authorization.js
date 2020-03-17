function permit(...allowed) {
    // const isAllowed = role => allowed.indexOf(role) > -1;
    function isAllowed(role){
        return allowed.indexOf(role) > -1;
    }
     return (req, res, next) => { 
         if (req.session.user && isAllowed(req.session.user.role)) {
              next(); 
            } else { 
                 return res.redirect('/403'); 
                } 
            } 
        }

        module.exports = permit;
