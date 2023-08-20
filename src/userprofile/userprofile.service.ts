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
                roleId: dto.userType,
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
                students: true
                },
            });

            const createStudent = await this.prisma.student.create({
                data: {
                    studentUserId: scisid,
                    studentsschoolId: dto.SchoolId,
                }
            })
        
            return userCreated.userProfile;
            }
        }

        // this crete student user is not in use yet  is not yet in use
        async createStudentUserprofiles(scisid: string, dto: CreateUserprofileDto) {
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
                students: true
                },
            });

            const createStudent = await this.prisma.student.create({
                data: {
                    studentUserId: scisid,
                    studentsschoolId: dto.SchoolId,
                }
            })
        
            
            if(userCreated && createStudent){
                console.log("Successfully created user and Student")
            }
            
            return userCreated.userProfile;
            
            }

        }

        async createParentUserprofiles(scisid: string, dto: CreateUserprofileDto) {
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
                roleId: dto.userType,
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
                students: true
                },
            });

            const createParent = await this.prisma.parent.create({
                data: {
                    parentUserId : scisid,
                    studentId: dto.studentId,
                }
            })
        
            
            if(userCreated && createParent){
                console.log("Successfully user and Parent and linked a student")
            }
            
            return userCreated.userProfile;
            
            }

        }

        
        async createTeacherUserprofiles(scisid: string, dto: CreateUserprofileDto) {
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
                roleId: dto.userType,
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
                students: true
                },
            });

            // set subjects that a teacher teaches on creating
            const createTeacher = await this.prisma.teacher.create({
                data: {
                    TeacheruserId: scisid,
                    schoolId: dto.SchoolId,
                }
            })
        
            
            if(userCreated && createTeacher){
                console.log("Successfully user and Teacher and linked a student")
            }
            
            return userCreated.userProfile;
            
            }

        }
        
        async editUserprofileById(scisid: string, dto: EditUserprofileDto) {
            // Find the user profile by scisid
            const userProfile = await this.prisma.userProfile.findUnique({
                where: {
                    userId: scisid,
                },
            });
        
            // If the user profile does not exist, return an error or handle accordingly
            if (!userProfile) {
                return "User profile not found";
            }
        
            // Update the user profile with the new values from dto
            const updatedUserProfile = await this.prisma.userProfile.update({
                where: {
                    id: userProfile.id,
                },
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    secondname: dto.secondname,
                    dob: dto.dob,
                    phone1: dto.phone1,
                    phone2: dto.phone2,
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
                include: {
                    user: true,
                },
            });
        
            return updatedUserProfile;
        }
        
        async deleteUserprofileById(scisid: string) {
            // Find the user profile by scisid
            const userProfile = await this.prisma.userProfile.findUnique({
                where: {
                    userId: scisid,
                },
            });
        
            // If the user profile does not exist, return an error or handle accordingly
            if (!userProfile) {
                return "User profile not found";
            }
        
            // Delete the user profile
            const deletedUserProfile = await this.prisma.userProfile.delete({
                where: {
                    id: userProfile.id,
                },
            });
        
            return "successfully deleted a user";
        }
        

    }

