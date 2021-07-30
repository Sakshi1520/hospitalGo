const express = require('express');
const Hospital = require('../modules/hospitals');
const router = express.Router();

//get list of hospitals from db
router.get('/hospitals',function(req,res,next){
    // Hospital.find({}).then(function(hospitals){
    //     res.send(hospitals);
    // });
    Hospital.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
    }).then(function(hospitals){
        res.send(hospitals);
    });
});

//add new to db
router.post('/hospitals',function(req,res,next){
    // var hospital = new Hospital(req.body);
    // hospital.save();
    Hospital.create(req.body).then(function(hospital){
        res.send(hospital);
    }).catch(next);
});

//update in db
router.put('/hospitals/:id',function(req,res,next){
    // res.send({type:'put'});
    Hospital.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Hospital.findOne({_id:req.params.id}).then(function(hospital){
            res.send(hospital);
       })
    });
});

//delete in db
router.delete('/hospitals/:id',function(req,res,next){
    Hospital.findByIdAndRemove({_id:req.params.id}).then(function(hospital){
        res.send(hospital);
    });
    // res.send({type:'delete'});
});

module.exports = router;