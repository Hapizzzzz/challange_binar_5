const {PrismaClient} = require('@prisma/client')
var prisma = new PrismaClient({
    log:['query']
})

module.exports = prisma