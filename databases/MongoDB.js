const mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

class MongoDb {
    connection = null;

    async connect() {
        // https://github.com/Automattic/mongoose/blob/master/lib/connectionstate.js
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            // you should only see once per request
            // if there is more than one shown on the terminal,
            // then it's indicate wrong implementation
            console.log('Connected to mongodb...')
        }

        this.connection = mongoose.connection;

        return this;
    }

    async close() {
        if (this.connection) {
            await this.connection.close();
            //await this.connection.disconnect();
        }
    }
}

module.exports = new MongoDb();
