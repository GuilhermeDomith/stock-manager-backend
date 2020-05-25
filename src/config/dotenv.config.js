const path = `.${process.env.NODE_ENV}.env`;
module.exports = require('dotenv').config({ path });
