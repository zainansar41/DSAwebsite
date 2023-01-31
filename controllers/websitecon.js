const jwt = require('jsonwebtoken')
const query = require('../models/query.js')
const { DSmodel, Sortingmodel, Algomodel } = require('../models/content.js')
const user = require('../models/user.js')
const practice = require('../models/praciceQues')
const jwtscret = process.env.JWT_SCRET


class webcon {
    static index_get = async (req, res) => {
        try {
            let id;
            let name=[];
            const token = req.cookies.jwt
            jwt.verify(token, jwtscret, async (err, decodedToken) => {
                if (err) {
                } else {
                    id = decodedToken.id
                }
            })
            const resultname = await user.findById(id);
            if (resultname===null) {
                name[0]="";
            }else{
                name=resultname.name.split(" ")
            }
            res.render('index',{name:name[0]})
        } catch (error) {
            console.log(error);
        }
    }
    static DS_get = async (req, res) => {
        try {
            let id;
            let name=[];
            const token = req.cookies.jwt
            jwt.verify(token, jwtscret, async (err, decodedToken) => {
                if (err) {
                } else {
                    id = decodedToken.id
                }
            })
            const resultname = await user.findById(id);
            if (resultname===null) {
                name[0]="";
            }else{
                name=resultname.name.split(" ")
            }
            const result = await DSmodel.find();
            res.render('DS', { data: result,name:name[0] })
        } catch (error) {
            console.log(error);
        }
    }
    static algo_get = async (req, res) => {
        try {
            let id;
            let name=[];
            const token = req.cookies.jwt
            jwt.verify(token, jwtscret, async (err, decodedToken) => {
                if (err) {
                } else {
                    id = decodedToken.id
                }
            })
            const resultname = await user.findById(id);
            if (resultname===null) {
                name[0]="";
            }else{
                name=resultname.name.split(" ")
            }
            const result1 = await Sortingmodel.find();
            const result2 = await Algomodel.find();
            const result = [].concat(result1, result2)
            res.render('algo', { data: result ,name:name[0]})
        } catch (error) {
            console.log(error);
        }
    }
    static query_get = async (req, res) => {
        try {
            let id;
            let name=[];
            const token = req.cookies.jwt
            jwt.verify(token, jwtscret, async (err, decodedToken) => {
                if (err) {
                } else {
                    id = decodedToken.id
                }
            })
            const resultname = await user.findById(id);
            if (resultname===null) {
                name[0]="";
            }else{
                name=resultname.name.split(" ")
            }
            res.render('query', { result: resultname,name:name[0]})
        } catch (error) {
            console.log(error);
        }
    }
    static query_post = async (req, res) => {
        try {
            const { name, email, Subject, question } = req.body;
            const doc = new query({
                name: name,
                email: email,
                subject: Subject,
                question: question
            })
            const result = await doc.save()
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    }
    static search_post = async (req, res) => {
        try {
            let id;
            let name=[];
            const token = req.cookies.jwt
            jwt.verify(token, jwtscret, async (err, decodedToken) => {
                if (err) {
                } else {
                    id = decodedToken.id
                }
            })
            const resultname = await user.findById(id);
            if (resultname===null) {
                name[0]="";
            }else{
                name=resultname.name.split(" ")
            }
            const { searchbar } = req.body;
            const search = searchbar.toLowerCase()
            let result1 = await DSmodel.findOne({ topicName: search })
            let result2 = await Algomodel.findOne({ topicName: search })
            let result3 = await Sortingmodel.findOne({ topicName: search })
            const question = await practice.find({ topic: search })
            if (result1 != null) {
                const j = result1.paragraphs.length
                res.render('viewCon', { data: result1, j: j, questions: question,name:name[0] })
            }
            else if (result2 != null) {
                const j = result2.paragraphs.length
                res.render('viewCon', { data: result2, j: j, questions: question,name:name[0] })
            }
            else if (result3 != null) {
                const j = result3.paragraphs.length
                res.render('viewCon', { data: result3, j: j, questions: question,name:name[0] })
            }
            result1 = await DSmodel.find({ tags: searchbar })
            result2 = await Algomodel.find({ tags: searchbar })
            result3 = await Sortingmodel.find({ tags: searchbar })
            const result = result1.concat(result2, result3)
            const practiceResult = await practice.find({ tags: searchbar })
            res.render('searchPage', { data: result, questions: practiceResult,name:name[0] })
        } catch (error) {
            console.log(error);
        }
    }
    static start_get = async (req, res) => {
        try {
            let id;
            let name=[];
            const token = req.cookies.jwt
            jwt.verify(token, jwtscret, async (err, decodedToken) => {
                if (err) {
                } else {
                    id = decodedToken.id
                }
            })
            const resultname = await user.findById(id);
            if (resultname===null) {
                name[0]="";
            }else{
                name=resultname.name.split(" ")
            }
            const result = await practice.find({})
            res.render('startprac', { data: result,name:name[0] })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = webcon;