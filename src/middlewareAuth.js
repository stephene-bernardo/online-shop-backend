module.exports = {

    loginRequired(req, res, next) {
      
      if (req.session.passport && req.session.passport.user[0].userid) {
        return next();
      }
      throw 'Not Authenticated'
    }
};