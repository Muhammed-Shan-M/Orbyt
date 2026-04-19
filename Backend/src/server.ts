
import app from './app'
import { ENV } from './config/env'
import { connectDB } from './common/database/db'

const PORT = Number(ENV.PORT)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at: http://localhost:${PORT}`)
    })
})