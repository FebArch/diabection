const {connect} = require("mongoose")

async function connectToDB(url) {
    return await connect(url)
}

module.exports= {
    connectToDB
}
