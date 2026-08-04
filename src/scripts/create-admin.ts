import bcrypt from "bcrypt";
import readlineSync from "readline-sync";

import connectDatabase from "@/database/connection.js";
import userRepository from "@/apps/user/user.repository.js";
import { UserRole } from "@/apps/user/user.types.js";
import env from "@/config/env.js";





const createAdmin = async () => {

  await connectDatabase();

  const full_name =  readlineSync.question("Full Name: ");
  const email = readlineSync.question("Email :");
  const password = readlineSync.question("Password: ", {
    hideEchoBack : true,
  })


  const existingUser = await userRepository.findByEmail(email);

  if(existingUser){
    console.log("User already exists");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userRepository.create({
    full_name,
    email,
    password : hashedPassword,
    role : UserRole.ADMIN
  })

  console.log("Admin created successfully:");
  console.log({
    id: user._id,
    email : user.email,
    role : user.role
  })

  process.exit(0)

}

createAdmin()