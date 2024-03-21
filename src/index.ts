import { AppDataSource } from './helpers/dbConnection'
import { PORT } from './config/environment'
import app from './app'

const startServer = async (): Promise<void> => {
  await AppDataSource.initialize()
  console.log('-> Data Source has been initialized!')

  app.listen(PORT, () => {
    console.log(`-> Server listening on port ${PORT}`)
  })
}

startServer().catch(error => {
  console.log(error)
})
