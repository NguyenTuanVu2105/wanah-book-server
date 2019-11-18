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

var port = process.env.PORT || 5000

app.listen(port)


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