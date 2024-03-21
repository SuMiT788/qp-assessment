/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const NODE_ENV: string = process.env.NODE_ENV!
export const PORT: number = +process.env.PORT!
export const DB_HOST: string = process.env.DB_HOST!
export const DB_PORT: number = +process.env.DB_PORT!
export const DB_USER_NAME: string = process.env.DB_USER_NAME!
export const DB_PASSWORD: string = process.env.DB_PASSWORD!
export const DB_NAME: string = process.env.DB_NAME!
export const JWT_SECRET: string = process.env.JWT_SECRET!
