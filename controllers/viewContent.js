const { DSmodel, Sortingmodel, Algomodel } = require('../models/content.js')
const practice = require('../models/praciceQues')
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');
const jwtscret = process.env.JWT_SCRET

module.exports.viewContent = async (req, res) => {
    try {
        let id1;
        let name = [];
        const token = req.cookies.jwt
        jwt.verify(token, jwtscret, async (err, decodedToken) => {
            if (err) {
            } else {
                id1 = decodedToken.id
            }
        })
        const resultname = await user.findById(id1);
        if (resultname === null) {
            name[0] = "";
        } else {
            name = resultname.name.split(" ")
        }
        const idtopic = req.params.idtopic
        const result1 = await DSmodel.findById(idtopic)
        const result2 = await Sortingmodel.findById(idtopic)
        const result3 = await Algomodel.findById(idtopic)
        if (result1 != null) {
            const j = result1.paragraphs.length
            const practiceQ = await practice.find({ topic: name })
            res.render('viewCon', { data: result1, j: j, questions: practiceQ, name: name[0] })
        }
        else if (result2 != null) {
            const j = result2.paragraphs.length

            const practiceQ = await practice.find({ topic: name })
            res.render('viewCon', { data: result2, j: j, questions: practiceQ, name: name[0] })
        }
        else if (result3 != null) {
            const j = result3.paragraphs.length
            const practiceQ = await practice.find({ topic: name })
            res.render('viewCon', { data: result3, j: j, questions: practiceQ, name: name[0] })
        }
    } catch (error) {
        console.log(error);
    }
}