import { Injectable } from "@nestjs/common";
import {CreateUserprofileDto, EditUserprofileDto} from '../userprofile/dto/index'
import { PrismaService } from "src/prisma/prisma.service";
 

@Injectable()
export class UserProfileService {

    // constructor
    constructor(private prisma: PrismaService) {}

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
  
    createUserprofiles(scisid: string, dto: CreateUserprofileDto ) {
        return "created a user profile, Correctly accessing the userprofile service"
  
    }

    editUserprofileById(scisid: string, dto: EditUserprofileDto) {
        return "edited a user profile, Correctly accessing the userprofile service"
        
    }
    deleteUserprofileById(scisid: string) {
        return "deleted a user profile, Correctly accessing the userprofile service"
    }
  
}

