import app from './config/server-config'
import UserRouter from './routes/user-route'

app.use("/api/user",UserRouter);

export default app