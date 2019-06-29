let express = require('express'),
    router = express.Router(),
    Address = require('../../../moduls/user/address'),
    Customer = require('../../../moduls/user/customer');


    router.post('/', (req, res) => {
        let details = req.body;
        if(details.province && details.city && details.postalCode
            && details.homePhone && details.address) {
            new Address({
                province   : details.province,
                city       : details.city,
                postalCode : details.postalCode,
                homePhone  : details.homePhone,
                address    : details.address
            }).save(function (err, savedAddress) {
                if(!err) {
                    Customer.findOne({_id: req.user._id}, (err, foundUser) => {
                        foundUser.addresses.push(savedAddress._id);
                        foundUser.save((err)=>{
                            if(!err) {
                                if(details.ajax)
                                    res.send({
                                        status: 'done',
                                        data  : savedAddress
                                    });
                                else
                                    res.redirect('back')
                            }
                        })
                    })
                } else {
                    if(details.ajax)
                        res.send({
                            status: 'undone'
                        });
                    else
                        res.redirect('back')
                }
            })
        } else {
            if(details.ajax)
                res.send({
                    status: 'undone',
                });
            else
                res.redirect('back')
        }
    });
    
    router.put('/:id', (req, res) => {
        let details = req.body;
        if(details.province && details.city && details.postalCode
            && details.homePhone && details.address) {
            Address.findOneAndUpdate({_id: req.params.id}, {
                province   : details.province,
                city       : details.city,
                postalCode : details.postalCode,
                homePhone  : details.homePhone,
                address    : details.address
            }, function (err, updatedAddress) {
                if(!err) {
                    res.redirect('back')
                } else {
                    res.redirect('back')
                }
            })
        } else {
            res.redirect('back');
        }
    });
    
    router.delete('/:id', (req, res) => {
        Address.findOneAndDelete({_id: req.params.id}, function (err) {
            if(!err) {
                res.redirect('back')
            } else {
                res.redirect('back')
            }
        })
    });


module.exports = router;