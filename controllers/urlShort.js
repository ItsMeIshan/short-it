const urlModel = require('../models/url');
const {StatusCodes} = require('http-status-codes');
const shortid = require('shortid');
const dns = require('dns');
const postUrl = async (req, res) =>{
    const origUrl = req.body.url;
    if(!origUrl) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'please enter the url' });
    }
    try {
        const parsedUrl = new URL(origUrl);
        dns.lookup(parsedUrl.hostname, async (error,address,family)=>{
            if(error === null){
                const urlGet = await urlModel.findOne({orignal_url: parsedUrl.href});
                if(!urlGet){
                    const shortUrlId = shortid.generate();
                    try {
                        const urlObject = {orignal_url: parsedUrl.href, short_url: shortUrlId};
                        const urlDb = await urlModel.create({...urlObject});
                        const {orignal_url, short_url} = urlDb;
                        return res.status(StatusCodes.CREATED).json({orignal_url, short_url});
                    } catch (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
                    }
                }
                else {
                    const {orignal_url, short_url} = urlGet;
                    return res.status(StatusCodes.OK).json({ already_Shortened: {orignal_url, short_url} });
                }
            }
            else{
                return res.status(StatusCodes.BAD_REQUEST).json({error, msg: `invalid url please try again`});
            }
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error, msg: 'invalid url'});
    }
}
const getOrignalUrl = async (req, res) => {
    const {short_url} = req.params;
    if(!req.params){
        return res.send("no parameters passed")
    }
    if(!req.params.short_url){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send("please pass short url id in request parameters");
    }
    try {
        const {orignal_url} = await urlModel.findOne({short_url});
        res.status(301).redirect(orignal_url);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: `cannot find url with short url id ${short_url} `});
    }
}
module.exports = {postUrl, getOrignalUrl};