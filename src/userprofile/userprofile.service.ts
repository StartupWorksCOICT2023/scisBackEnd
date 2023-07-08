import { Injectable } from "@nestjs/common";
import { CreateUserprofileDto, EditUserprofileDto } from '../userprofile/dto/index'
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';


@Injectable()
export class UserProfileService {
    
    // constructor
    constructor(private prisma: PrismaService) { }

    getUserprofiles() {
        return "all users profile, Correctly accessing the userprofile service"
    }

    async getUserprofileById(scisid: string) {
        const foundUser = await this.prisma.scisUser.findUnique({
            where: {
                scisuserid: scisid,
            },
            include: {
                roles: true,
                userProfile: true,
                // use parents if its a student
                parents: true,
                // THIS HERE IS POOR 
                // return students if its a parent, but for teacher he must get his own endpoint that pulls his students, cant pull students for teachers 
                students: true,
            }
        })

        return foundUser;
    }

    async createUserprofiles(scisid: string, dto: CreateUserprofileDto) {
        console.log(scisid);
        console.log(dto);
      
        // Find the user
        const userExists = await this.prisma.scisUser.findFirst({
          where: {
            scisuserid: scisid,
          },
        });
      
        // If user exists or UserID is already in use, return an error
        if (userExists) {
          return "This user exists or userId is already in use";
        }
      
        // If the user does not exist, create the new user and user profile
        if (!userExists) {
          // ENCRYPT the password first then send it 
          const hash = await argon.hash(scisid);
      
          const userCreated = await this.prisma.scisUser.create({
            data: {
              scisuserid: scisid,
              password: hash,
              userProfile: {
                create: {
                  firstName: dto.firstName,
                  lastName: dto.lastName,
                  secondname: dto.secondname,
                  dob: dto.dob,
                  phone1: dto.phone1,
                  phone2: dto.gender,
                  gender: dto.gender,
                  religion: dto.religion,
                  email: dto.email,
                  occupation: dto.occupation,
                  address: dto.address,
                  district: dto.district,
                  region: dto.region,
                  country: dto.country,
                  profilePicture: dto.profilePicture,
                },
              },
            },
            include: {
              userProfile: true,
            },
          });
      
          return userCreated.userProfile;
        }
      }
      
    editUserprofileById(scisid: string, dto: EditUserprofileDto) {
        console.log(scisid)
        console.log(dto)
        return "edited a user profile, Correctly accessing the userprofile service"

    }
    deleteUserprofileById(scisid: string) {
        console.log(scisid)
        return "deleted a user profile, Correctly accessing the userprofile service"
    }

}

