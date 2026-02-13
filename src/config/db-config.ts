import mongoose from 'mongoose'

const dbUrl = `${process.env.dbUrl}`

export async function connection() {
  try {
          await mongoose.connect(dbUrl);
          console.log("db is connected");
  } catch (error) {
    console.log("there is an error in the conncection function")
  }
}