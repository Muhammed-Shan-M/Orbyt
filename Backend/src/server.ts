
import app from './app'
import { ENV } from './config/env'
import { connectDB } from './common/database/db'
import logger from './common/logger/logger'

const PORT = Number(ENV.PORT)

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`server running at: http://localhost:${PORT}`)
    })
})