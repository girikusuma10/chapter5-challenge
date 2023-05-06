const apiDoc= require('./../apiDoc.json')

module.exports= {
  apiDocJson(req, res) {
    return res.json(apiDoc)
  }
}