import { PrismaClient } from "@prisma/client";
import { hash, genSaltSync, compareSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  //console.log(env['MY_SUPERSECRET']);
  
  const salt = await genSaltSync(12);
  const hashed_password = await hash("qwerty123", salt);



  const user = await prisma.applicationUser.upsert({
    where: {UserName: "areddy"},
    update: {},
    create: {
      UserName: "areddy",
      FirstName: "Avinash",
      LastName: "Matta",
      MiddleName: "Reddy",
      MobileNumber: "9876543210",
      Gender: "Male",
      DateOfBirth: new Date('11/16/1993'),
      BloodGroup: "AB+",
      Address1: "Hyderabad",
      Address2: "",
      City: "HYD",
      State: "TG",
      PostalCode: null,
      Country: "India",
      ApplicationUserMembership: {
        create: {
          Password:hashed_password,
          PasswordSalt:salt,
          SecurityQuestion:'person',
          SecurityPassword:'SA',
        }
      },
      Tasks: {
        create: [
          {
            Name: "First task",
            Status: "InProgress",
            Description:'First task references sample first one',
          },
          {
            Name: "Second task",
            Status: "InProgress",
            Description:'Second task references sample second one',
          },
          {
            Name: "Third task",
            Status: "InProgress",
            Description:'Third task references sample third one',
          }
        ]
      }
    },
    include: {
      ApplicationUserMembership: true,
      Tasks: true
    }
  })

}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
