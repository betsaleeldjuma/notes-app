const mongoose = require('mongoose')

const connectDB = async (DATABASE_URL) => {
    try {
        const conn = await mongoose.connect(DATABASE_URL)
        console.log(`Data base connected... Connected: ${conn.connection.host}`)
    } catch(error) {
        console.log(error)
    }
}

module.exports = connectDB