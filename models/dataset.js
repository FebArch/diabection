const {Schema, model, models} = require("mongoose")

let dataset = new Schema({
    username:{
        type: String,
        required: true
    },
    pregnancies:{
        type: Number,
        required: true
    },
    glucose:{
        type: Number,
        required: true
    },
    bp:{
        type: Number,
        required: true
    },
    skinthickness:{
        type: Number,
        required: true
    },
    insulin:{
        type: Number,
        required: true
    },
    bmi:{
        type: Number,
        required: true
    },
    dpf:{
        type: Number,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    outcome: { 
        type: Number,
        default: 0
    }
})


let Health = model('health', dataset)

module.exports = Health