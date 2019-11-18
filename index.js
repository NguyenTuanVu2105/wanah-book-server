var express = require('express');
var app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

require('./server/router/router')(app);

const db = require('./server/config/db.config');

const Role = db.role;

db.sequelize.sync({ alter : true }).then(() => {
	initial();
});

var server = app.listen(8080, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s", host, port)
})


function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	Role.create({
		id: 2,
		name: "ADMIN"
	});
}