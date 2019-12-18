const db = require('../config/db.config');
const Profile = db.profile;
function distance(lat1, lat2, lon1, lon2) {
    var pi = Math.PI;
    lon1 = lon1 * (pi / 180);
    lon2 = lon2 * (pi / 180);
    lat1 = lat1 * (pi / 180);
    lat2 = lat2 * (pi / 180);

    dlon = lon2 - lon1;
    dlat = lat2 - lat1;
    a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

    c = 2 * Math.asin(Math.sqrt(a));
    r = 6371;
    return c * r;
}
exports.contactUser = (req, res) => {
    Profile.findOne({
        where: {
            id: req.userId
        }
    }).then(curUser=>{
        Profile.findAll({
        }).then(users => {
            distanceArray = users.map(item => {
                return {
                    first_name : item.first_name,
                    last_name  : item.last_name,
                    address_detail : item.address_detail,
                    distance : distance(item.address_latitude, curUser.address_latitude, item.address_longitude, curUser.address_longitude)
                }
            })
            res.send(distanceArray.sort((a, b) => (a.distance > b.distance) ? 1 : -1))
        })
    })
}
