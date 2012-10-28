
/**
 * Module dependencies.
 */

var express = require('express')
  , passport = require('passport')
  ,	LocalStrategy = require('passport-local').Strategy
  , routes = require('./routes')
  , users = require('./routes/user.js')
  , http = require('http')
  , path = require('path')
  , mongoose = require ('mongoose')
  , UserAuth = require('./models/userAuth.js')
  ;

//Connect MongoDB when the application starts
mongoose.connect('mongodb://localhost/consultorio');

var app = express();

//Configure the application
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout : false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser()); 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //Initialize express session
  app.use(express.session({secret : 'hola123'}));
  //Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

//Configure for evelopment environment
app.configure('development', function(){
  app.use(express.errorHandler());
});
//Routes
//app.get('/', routes.index);
app.get('/user', users.list);
app.get('/addUser', users.add);
app.post('/user', users.index_post);

//Provide login sessions
passport.serializeUser(function (user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id,done){
	UserAuth.findOne({_id : id}, function(err, user){
		done(err,user);
	});
});
    /* No me creaba el usuario
     var usuario = new UserAuth({username : "test1" , password : "1234" , salt : "1234" ,roles : ["admin"]});  
      usuario.save(function(err) {
          if (err) console.log(err);
          else console.log('Parece que bien');
        });
      UserAuth.find({ }, function (err, users) { console.log(users);});
    */
   
//Creating the logic for Authentication - Generic
passport.use(new LocalStrategy(
  function(username, password, done) {
    UserAuth.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      //Falta crear en user un método para validar el password cuando tenga hashing
      if (user.password != password) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
));

app.get('/', ensureAuthenticated, routes.index);

app.get('/login', function(req, res){
    res.render('login', { title: "Login", user: req.user, message: req.session.message });
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
        })
);

app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
}

