const postUrl = async (req, res) =>{
    res.send('here is your url');
}
const getOrignalUrl = async (req, res) => {
    res.send('you will be redirected to your orignal url');
}
module.exports = {postUrl, getOrignalUrl};