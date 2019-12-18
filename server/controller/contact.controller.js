const db = require('../config/db.config');
const Profile = db.profile;
const User = db.user;
const Op = db.Sequelize.Op;
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
// exports.contactUser = (req, res) => {
//     var limit = parseInt(req.query.limit)
//     var page = parseInt(req.query.page)
//     Profile.findOne({
//         where: {
//             id: req.userId
//         }
//     }).then(curUser=>{
//         Profile.findAll({
//         where:{
//             id : { 
//                 [Op.ne]: [curUser.id],
//               }
//         }
//         }).then(users => {
//             distanceArray = users.map(item => {
//                 return {
//                     first_name : item.first_name,
//                     last_name  : item.last_name,
//                     address_detail : item.address_detail,
//                     description  : item.description,
//                     avatar  : item.avatar,
//                     name :item.first_name + item.last_name,
//                     distance : distance(item.address_latitude, curUser.address_latitude, item.address_longitude, curUser.address_longitude)
//                 }
//         })
//             res.send(distanceArray.sort((a, b) => (a.distance > b.distance) ? 1 : -1).slice((page-1)*limit,page*limit))
//         }).catch(err => res.status(404).send({message: err}));
//     }).catch(err => res.status(404).send({message: err}));
// }

exports.contactUser = (req, res) => {
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    User.findAll({
        where: {
            id: {
                [Op.ne]: [req.userId]
            }
        }, 
        limit: limit,
        offset: (page-1)*limit,
        attributes: [
            'id',
            [db.sequelize.literal(`(SELECT 111111 *
            DEGREES(ACOS(LEAST(1.0, COS(RADIANS(21.04166030883789))
                 * COS(RADIANS(address_latitude))
                 * COS(RADIANS(105.78498840332031 - address_longitude))
                 + SIN(RADIANS(21.04166030883789))
                 * SIN(RADIANS(address_latitude))))) FROM profiles WHERE users.id = profiles.id )`), 'distance'] 
        ],
        include: [
            {
                model: Profile, 
                attributes: [
                    'first_name', 'last_name', 'address_detail', 'description', 'avatar'
                ], 
            }
        ],
        order: [[db.sequelize.literal('distance'), 'ASC']]
    }).then(users => res.send(users))
    .catch(err => res.status(500).send({message: err}));
}