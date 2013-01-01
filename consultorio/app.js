
/**
 * Module dependencies.
 */

var express = require('express')
  , passport = require('passport')
  ,	LocalStrategy = require('passport-local').Strategy
  , routes = require('./routes')
  , users = require('./routes/user.js')
  , patients = require('./routes/patient.js')
  , session = require('./routes/session.js')
  , http = require('http')
  , path = require('path')
  , mongoose = require ('mongoose')
  , User = require('./models/UsersModel.js')
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

//Configure for development environment
app.configure('development', function(){
  app.use(express.errorHandler());
});
//Routes
//app.get('/', routes.index);
//API for users
app.get('/api/users', users.list);
app.get('/api/user/:id', users.get);
app.post('/api/user', users.add);
app.put('/api/user/:id', users.update);
app.delete('/api/user/:id', users.delete);
//API for patients
app.get('/api/patients', patients.list);
app.get('/api/patient/:id', patients.get);
app.post('/api/patient', patients.add);
app.put('/api/patient/:id', patients.update);
app.delete('/api/patient/:id', patients.delete);
//API for session
app.get('/api/session', session.getSessionInformation);


//Provide login sessions
passport.serializeUser(function (user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id,done){
	User.findOne({_id : id}, function(err, user){
		done(err,user);
	});
});

//Creating the logic for Authentication - Generic
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
));

//Para clientes
// app.get('/', ensureAuthenticated, routes.index);

//Para desarrollo
app.get('/', routes.index);

app.get('/partials/:name' , routes.partials);

app.get('/login', function(req, res){
    res.render('login', { title: "Login", error : req.query['error']  });
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?error=true'
    })
);

app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/login?logout=true');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
}

