var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var app = express();

//Swagger setup 

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Votcen Api's",
      version: "1.0.0",
      description: "All the Api's for the votcen application",
      // termsOfService: "http://example.com/terms/",
      // contact: {
      //   name: "API Support",
      //   url: "http://www.exmaple.com/support",
      //   email: "support@example.com",
      // },
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Votcen Api's",
      },
    ],
  },
  apis: ["./routes/auth.routes.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));





const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000",
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

app.use(cors(corsOptions));

const db = require("./model");

// Mongo CONNECTION
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ProjectVotcen";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });




const Database = mongoose.connection;
Database.on("error", console.error.bind(console, "connection error: "));
Database.once("open", function () {
  console.log("Connected successfully");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/users', usersRouter);

require('./routes/auth.routes')(app)
// require('./routes/admin.routes')(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("error genrated here ok")
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
