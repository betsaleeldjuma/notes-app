const mongoose = require('mongoose')

const connectDB = async (DATABASE_URL) => {
    try {
        const conn = await mongoose.connect(DATABASE_URL)
        console.log(`Data base connected... Connected: ${conn.connection.host}`)
        return conn
    } catch(error) {
        console.error('MongoDB connection error:', error)
        throw error
    }
}

module.exports = connectDB