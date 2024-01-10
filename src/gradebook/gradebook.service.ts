import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {  createNewSubject, createSchoolDto, createSubjectDto, createTestDto, createclassDto, createstudentDto, createstudentResultDto, editSchoolDto, editSubjectDto, editTestDto, editclassDto, editstudentDto, updateBatchStudentResultDto, updateStudentResultDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { test } from 'node:test';


@Injectable()
export class GradebookService {

    constructor(private prisma: PrismaService) { }


    // School Ednpoints
    async getAllSchool() {

        const allSchools = await this.prisma.school.findMany();
        return allSchools;

    }

    async createSchool(dto: createSchoolDto) {
        const isSchoolPresent = await this.prisma.school.findFirst({
            where: {
                schoolId: dto.schoolId,
            }
        });

        if (isSchoolPresent) {
            throw new Error('This school ID is already present, please confirm or edit the already present entry');
        }

        const newSchool = await this.prisma.school.create({
            data: {
                schoolId: dto.schoolId,
                name: dto.name,
                address: dto.address,
                // Add other properties as needed
            },
        });

        return newSchool;
    }

    async updateSchool(dto: editSchoolDto) {
        const school = await this.prisma.school.findFirst({
            where: {
                schoolId: dto.schoolId,
            },
        });

        if (!school) {
            throw new Error('This school does not exist');
        }

        const updatedSchool = await this.prisma.school.update({
            where: {
                schoolId: dto.schoolId,
            },
            data: {
                name: dto.name,
                address: dto.address,
                // Add other properties as needed
            },
        });

        return updatedSchool;
    }

    async deleteSchool(schoolId: string){
        const school = await this.prisma.school.findFirst({
            where: {
                schoolId: schoolId,
            },
        });

        if (!school) {
            throw new Error('This school does not exist');
        }

        const deletedSchool = await this.prisma.school.delete({
            where: {
                schoolId: schoolId,
            },
        });

        return deletedSchool;
    }

    // Test Endpoints

    async getAllTest() {
        const allTests = await this.prisma.test.findMany({
            select: {
                testId: true,
                ExamClassLevel: true,
                ExamDate: true,
                ExamDuration: true,
                ExamStartTime: true,
                ExamType: true,
                subjectId: true,
                TotalMarks: true,
                subject : {
                    select:{
                        name: true,
                        TeacherId: true
                    }
                }
            },
        });
        return allTests;
    }


    // WHEN WE CREATE A TEST WE SHOULD CREATE AUTOMAICALLY THE NULL RESULTS FOR ALL THE STUDENTS
    // NOT TESTED YET
    async createTest(dto: createTestDto) {

        console.log(dto)

        const testExists = await this.prisma.test.findFirst({
            where: {
                 // perhaps we justcheck if unique subject time and date is arleady created
                 testId: dto.testId
            },
        });

        if (testExists) {
            throw new Error('This test already exists');
        }

        const testCreated = await this.prisma.test.create({
            data: {
                testId: dto.testId,
                TotalMarks: dto.TotalMarks,
                ExamClassLevel: dto.ExamClassLevel,
                ExamType: dto.ExamType,
                subjectId: dto.subjectId,
                ExamDate: dto.ExamDate,
                ExamStartTime: dto.ExamStartTime,
                ExamDuration: dto.ExamDuration,
            },
        });

        // but we should create an empty students results for the subject

        const studentsTakingTest = await this.prisma.classLevel.findMany({
            where: {
                classId: dto.ExamClassLevel
            },
            
            select: {
                students: true
            }
        })

        console.log(studentsTakingTest);

        for (const student of studentsTakingTest) {
            const isResultEntryPresent = await this.prisma.studentResults.findFirst({
                where: {
                    studentId: student.studentUserId,
                    testId: dto.testId,
                },
            });
    
            if (isResultEntryPresent) {
                throw new Error('Result entry already exists for this student and test');
            }
    
            const createResult = await this.prisma.studentResults.create({
                data: {
                    studentId: student.studentUserId,
                    testId: dto.testId,
                    marksObtained: null,
                },
            });
    
            if (createResult) {
                console.log(`Created result for student ${student.studentUserId} successfully`);
            }
        }
    

        return  `created Test succesffully ${testCreated}`;
    }

    async getTestById(testId: string) {
        const test = await this.prisma.test.findFirst({
            where: {
                testId: testId,
            },
        });

        if (!test) {
            return null; // Return null when the test doesn't exist
        }

        return test;
    }

    async updateTest(dto: editTestDto, passedtestId: string) {
        const test = await this.prisma.test.findFirst({
            where: {
                testId: passedtestId,
            },
        });

        if (!test) {
            throw new Error('This test does not exist');
        }

        const updatedTest = await this.prisma.test.update({
            where: {
                testId: passedtestId,
            },
            data: {
                subjectId: dto.subjectId,
                ExamClassLevel: dto.ExamClassLevel,
                ExamType: dto.ExamType,
                TotalMarks: dto.TotalMarks,
                ExamDate: dto.ExamDate,
                ExamStartTime: dto.ExamStartTime,
                ExamDuration: dto.ExamDuration,
                // Include other fields to be updated from the editTestDto
            },
        });

        return updatedTest;
    }

    async deleteTest(passedtestId: string) {
        const test = await this.prisma.test.findFirst({
            where: {
                testId: passedtestId,
            },
        });

        if (!test) {
            throw new Error('Cannot delete, this test does not exist');
        }

        const deletedTest = await this.prisma.test.delete({
            where: {
                testId: passedtestId,
            },
        });

        return deletedTest;
    }

    // Subject Endpoints
    async createSubject(dto: createNewSubject) {

        console.log(dto);
        

        const isSubjectPresent = await this.prisma.subject.findFirst({
            where: {
                name: dto.name,
                classLevelId: dto.classLevelId,
            }
        })

        if (isSubjectPresent) {
            throw new Error('"this subject is present, please confirm or edit arleady present entry"')
            // return "this result is present, please confirm or edit arleady present entry"
        }

        if(!isSubjectPresent){

            const createResult = await this.prisma.subject.create({
                data:{
                    subjectId: `${dto.classLevelId}-${dto.name}`,
                    name: dto.name,
                    classLevelId: dto.classLevelId,
                    TeacherId: dto.TeacherId
                }
            })
    
            if (createResult) {
                return `created subject succesffully ${createResult}`;
            }
    

        }
    
       
    }

    async getAllSubjects() {
        const allSubjects = await this.prisma.subject.findMany({
            select: {
                subjectId: true,
                name: true,
                tests: true,
                classLevels: true
            },
        });
        return allSubjects;
    }

    // we might have to change this to, find subjects by class, 
    //                                                by name,
    //                                                by student
    //                                                by teacher  

    // GET SUBJECTS OF A TEACHER
    
    async getAllSubjectsOfATeacher(teacherid : string) {
        const allSubjects = await this.prisma.subject.findMany({
            where:{
                TeacherId: teacherid,
            },
            select: {
                subjectId: true,
                name: true,
                tests: true,
                classLevels: true
            },
            
        });
        return allSubjects;
    }

    async getSubjectById(subjectId: string) {
        const subject = await this.prisma.subject.findFirst({
            where: {
                subjectId: subjectId,
            },
        });

        if (!subject) {
            return "This subject does not exists";
        }

        return subject;
    }

    async updateSubject(subjectId: string, dto: editSubjectDto) {

        const subject = await this.prisma.subject.findFirst({
            where: {
                subjectId: subjectId,
            },
        });

        if (!subject) {
            return "This Subject does not exists";
        }

        const updatedSubject = await this.prisma.subject.update({
            where: {
                subjectId: subjectId,
            },
            data: {
                name: dto.name,
                subjectId: dto.subjectId,
                // Include other fields to be updated from the updateTestDto
            },
        });

        return updatedSubject;


    }

    async deleteSubject(subjectId: string) {

        const subject = await this.prisma.subject.findFirst({
            where: {
                subjectId: subjectId,
            },
        });

        if (!subject) {
            return "cannot delete, This subject does not exists";
        }

        const deletedTest = await this.prisma.subject.delete({
            where: {
                subjectId: subjectId,
            },
        });

        return deletedTest;

    }

    // StudentResult Endpoints
    async createStudentResult(dto: createstudentResultDto) {

        const isResultEntryPresent = await this.prisma.studentResults.findFirst({
            where: {
                studentId: dto.studentId,
                testId: dto.testId,
                marksObtained: dto.testmarks,
            }
        })

        if (isResultEntryPresent) {
            throw new Error('"this result is present, please confirm or edit arleady present entry"')
            // return "this result is present, please confirm or edit arleady present entry"
        }

        const createResult = await this.prisma.studentResults.create({
            data: {
                studentId: dto.studentId,
                testId: dto.testId,
                marksObtained: dto.testmarks,
            },
        });

        if (createResult) {
            return "created result succesffully"
        }

    }

    async uploadResultsbyExcelFiles() {
        //TO DO: write all the neccessary code
    }

    async getStudentResultByStudentId(studentId: string) {

        console.log(studentId);
        
        // WE ARE CHANGING THIS TO GETTING EXAM RESULTS AND THE EXAM OR TEST DATA
        // FOR ORGANSIATION IN THE FRONT END

        // me months later
        // i think what i was saying was, its better to get student resutlts from exams(biliogy form 2 test 1)
        // it will give us a more collective data 

        try {
            const studentResultsById = await this.prisma.studentResults.findMany({
              where: {
                studentId: studentId,
              },
              include: {
                test: {
                  include: {
                    subject: true, // Include the subject associated with the test
                  },
                },
              },
            });
        
            return studentResultsById;
        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student results for studentId: ${studentId}`, error);
            throw new Error(`Failed to retrieve student results for studentId: ${studentId}`);
        }
    }

    async getStudentResultByTestId(testId: string) {
        try {
            const studentResultsByTestId = await this.prisma.studentResults.findMany({
                where: {
                    testId: testId,
                },
                include: {
                    student: true
                }
            });

            return studentResultsByTestId;
        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student results for testId: ${testId}`, error);
            throw new Error(`Failed to retrieve student results for testId: ${testId}`);
        }
    }

    async updateStudentResult(dto: updateStudentResultDto) {

        console.log(dto);
        
        const isResultEntryPresent = await this.prisma.studentResults.findFirst({
            where: {
                studentId: dto.studentId,
                testId: dto.testId,
                marksObtained: dto.currentTestMarks,
            }
        })

        if (!isResultEntryPresent) {
            throw new Error('"this result is not present, please confirm or preview if arleady updated"')
            // return "this result is present, please confirm or edit arleady present entry"
        }

        const updatedResultEntry = await this.prisma.studentResults.updateMany({
            where: {
                studentId: dto.studentId,
                testId: dto.testId,
                marksObtained: dto.currentTestMarks,
            },
            data: {
                marksObtained: dto.newTestMarks,
            },
        });

        if (updatedResultEntry) {
            console.log('successfully updated results')
            console.log(updatedResultEntry);
            return updatedResultEntry;
        }

    }

    async updateBatchStudentResult(dtoList: updateBatchStudentResultDto[]) {
        const updatedResultEntries = [];

        for (const dto of dtoList) {
            const isResultEntryPresent = await this.prisma.studentResults.findFirst({
                where: {
                    studentId: dto.studentId,
                    testId: dto.testId,
                },
            });

            if (!isResultEntryPresent) {
                throw new Error('Result entry does not exist');
            }

            const updatedResultEntry = await this.prisma.studentResults.updateMany({
                where: {
                    studentId: dto.studentId,
                    testId: dto.testId,
                },
                data: {
                    marksObtained: dto.newTestMarks,
                },
            });

            if (updatedResultEntry) {
                updatedResultEntries.push(updatedResultEntry);
            }
        }

        return updatedResultEntries;
    }

    async deleteStudentResult(dto: createstudentResultDto) {
        const isResultEntryPresent = await this.prisma.studentResults.findFirst({
            where: {
                studentId: dto.studentId,
                testId: dto.testId,
                marksObtained: dto.testmarks,
            },
        });

        if (!isResultEntryPresent) {
            throw new Error('This result is not present. Please confirm or edit the already present entry.');
        }

        const deletedEntry = await this.prisma.studentResults.delete({
            where: {
                id: isResultEntryPresent.id
            },
        });

        if (deletedEntry) {
            return deletedEntry;
        }
    }


    // Student Endpoints
    async getAllStudents() {

        try {
            const studentById = await this.prisma.scisUser.findMany({
                where: {
                    roleId: 'student',
                }, include: {
                    userProfile: true,
                    
                }
            });

            return studentById;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student for students, error`);
            throw new Error(`Failed to retrieve students`);
        }

    }

    async getAllStudentsCount() {

        try {
            const studentById = await this.prisma.scisUser.findMany({
                where: {
                    roleId: 'student',
                }, include: {
                    userProfile: true,
                    
                }
            });

            return studentById.length;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student for students, error`);
            throw new Error(`Failed to retrieve students`);
        }

    }

    async getAllStudentsWithDetails() {

        try {
            const studentById = await this.prisma.student.findMany({
                 include: {
                    classLevels: true,
                    profile: true
                }
            });

            return studentById;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student for students, error`);
            throw new Error(`Failed to retrieve students`);
        }

    }

    // Student Endpoints
    async getStudentsOfParent(parentId: string) {

        try {
            const studentsByParentId = await this.prisma.parent.findUnique({
                where: {
                    parentUserId: parentId,
                }, include: {
                    student: true
                }
            });

            return studentsByParentId.student;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student of a Parent, error`);
            throw new Error(`Failed to retrieve students of a parent`);
        }

    }

    async createStudent(dto: createstudentDto) {
        // TODO: Implement createStudent method
        const StudentCreatedAlready = await this.prisma.student.findFirst({
            where: {
                studentUserId: dto.scisuserId
            }
        })

        if (StudentCreatedAlready) {
            throw new Error('"this student is present, or please confirm the userID of the student"')
        }

        if (!StudentCreatedAlready) {


            // WHILE CREATING A PARENT THEN WE ADD STUDENTS TO HIM, NOT THAT WHEN WE CREATE A ASTUDENT WE ASSIGN HIM/HER TO A PARENT DIRECTLY

            // A TEACHER SHOULD CREATE A CLASS WITH HIS ALL STUDENTS 

            const createStudent = await this.prisma.student.create({
                data: {
                    studentUserId: dto.scisuserId,
                    studentsschoolId: dto.schoolId,
                }
            })

            if (createStudent) {
                return "created student successfully"
            }
        }
    }

    async getStudentById(studentId: string) {

        try {
            const studentById = await this.prisma.student.findFirst({
                where: {
                    studentUserId: studentId,
                },
            });

            return studentById;
        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student for studentId: ${studentId}`, error);
            throw new Error(`Failed to retrieve student for studentId: ${studentId}`);
        }
    }

    async updateStudent(dto: editstudentDto) {

        // YOU CAN ONLY CHANGE SCHOOLS NOW

        const isStudentExist = await this.prisma.student.findFirst({
            where: {
                studentUserId: dto.oldscisuserId
            }
        })

        if (!isStudentExist) {
            throw new Error('"this Student is not present"')
            // return "this result is present, please confirm or edit arleady present entry"
        }

        const updateStudent = await this.prisma.student.updateMany({
            where: {
                studentUserId: dto.oldscisuserId
            },
            data: {
                studentUserId: dto.newscisuserId,
                studentsschoolId: dto.schoolId
            },
        });

        if (updateStudent) {
            return `Successfully updated a student with student ID ${dto.oldscisuserId} to a new student ID ${dto.newscisuserId} with school id ${dto.schoolId}`;
        }

    }

    async deleteStudent(studentId: string) {

        const StudentExists = await this.prisma.student.findFirst({
            where: {
                studentUserId: studentId,
            },
        });

        if (!StudentExists) {
            throw new Error('This student is not present. Please confirm or edit the student Id ');
        }

        const deletedStudent = await this.prisma.student.delete({
            where: {
                studentUserId: studentId
            },
        });

        if (deletedStudent) {
            return `Successfully deleted ${deletedStudent}`;
        }

    }
    // ClassLevel Endpoints
    // they are used to group students together so that when a teacher is registering his subject he can choose classes which study it. classes should be created by admin

    // for optional subject custom classes should be created

    // or
    // we should add a class with the, the subjects. but each subject should be optional or not 

    async createClassLevel(dto: createclassDto) {

        const classExists = await this.prisma.classLevel.findFirst({
            where: {
                year: dto.year,
                class: dto.class,
                combination: dto.combination,
                stream: dto.stream
            }
        })

        if (classExists) {
            throw new Error('"this class arleady exitst"')
        }

        if (!classExists) {
            console.log(dto);
        
            try {
                const createnewClass = await this.prisma.classLevel.create({
                    data: {
                        classId: `${dto.year}-${dto.class}-${dto.combination}-${dto.stream}`,
                        year: dto.year,
                        class: dto.class,
                        combination: dto.combination,
                        stream: dto.stream,
                        level: dto.level
                    }
                });
        
                if (createnewClass) {
                    return  `New class created successfully ${createnewClass}`;
                }
            } catch (error) {
                console.error('Error creating new class:', error);
                // Handle the error here, you might want to return an error message or re-throw the error
                return 'Error creating new class'; // Or some other error message
            }
        }
    }

    async getClassLevelById(classLevelId: string) {
        console.log(classLevelId)
        try {
            const getclassById = await this.prisma.classLevel.findFirst({
                where: {
                    classId: classLevelId,
                },
                include: {
                    students: true,
                    subjects: true
                }
            });

            return getclassById;
        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving class details for class Id: ${classLevelId}`, error);
            throw new Error(`Failed to retrieve class details for class Id: ${classLevelId}`);
        }

    }

    async getClassLevelsOfCurrentYear() {

        // Get the current date
        const currentDate = new Date();

        // Extract the current year from the date   
        const currentYear = currentDate.getFullYear().toString();

        console.log(currentYear); // Output the current year    

        try {
            const getclassById = await this.prisma.classLevel.findMany({
                where: {
                    year: currentYear,
                },
                //WITH ALL THIS DATA OUR SITE COULD BE WITH TOOMUCH DATA FLOW UNNECCESSARILY
                // include: {
                //     students: true,
                //     subjects: true,
                // }
            });

            return getclassById;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving classes details for Year: ${currentYear}`, error);
            throw new Error(`Failed to retrieve classes details for class Id: ${currentYear}`);
        }

    }

    async getClassLevelsByYear(Year: string) {
        
        console.log(Year);

        try {
            const getclassById = await this.prisma.classLevel.findMany({
                where: {
                    year: Year,
                },
                // WITH ALL THIS DATA OUR SITE COULD BE WITH TOOMUCH DATA FLOW UNNECCESSARILY
                include: {
                    // students: true,
                    subjects: true,
                }
            });

            return getclassById;
        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving classes details for Year: ${Year}`, error);
            throw new Error(`Failed to retrieve classes details for class Id: ${Year}`);
        }

    }

    async updateClassLevel(dto: editclassDto, classLevelId: string) {

        const classExists = await this.prisma.classLevel.findFirst({
            where: {
                classId: classLevelId
            }
        })

        if (!classExists) {
            throw new Error('"this class does not exitst"')
        }

        const updateClassLevel = await this.prisma.classLevel.update({
            where: {
                // the old classlevel id is passed via teh url
                classId: classLevelId
            },
            data: {
                classId: `${dto.year}-${dto.class}-${dto.combination}-${dto.stream}`,
                year: dto.year,
                class: dto.class,
                combination: dto.combination,
                stream: dto.stream,
                level: dto.level
            }
        })

        if (updateClassLevel) {
            return `successfully updated a class, ${updateClassLevel}`
        }

    }

    async deleteClassLevel(classLevelId: string) {
        const classExists = await this.prisma.classLevel.findFirst({
            where: {
                classId: classLevelId
            }
        })

        if (!classExists) {
            throw new Error('"this class does not exitst"')
        }

        const deleteClass = await this.prisma.classLevel.delete({
            where: {
                classId: classLevelId
            }
        })

        if (deleteClass) {
            return `successfuly deleted class ${deleteClass} `
        }
    }

    // Teachers Endpoint

    async getAllTeachers() {

        try {
            const AllTeachers = await this.prisma.scisUser.findMany({
                where: {
                    roleId: 'teacher',
                }, include: {
                    userProfile: true
                }
            });

            return AllTeachers;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving teachers, ${error}`);
            throw new Error(`Failed to retrieve students`);
        }

    }

    
    async getAllTeachersCount() {

        try {
            const AllTeachers = await this.prisma.scisUser.findMany({
                where: {
                    roleId: 'teacher',
                }, include: {
                    userProfile: true
                }
            });

            return AllTeachers.length;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving teachers, ${error}`);
            throw new Error(`Failed to retrieve students`);
        }

    }


    //parents Enpoints

    async getAllParents() {

        try {
            const AllParents = await this.prisma.scisUser.findMany({
                where: {
                    roleId: 'parent',
                }, include: {
                    userProfile: true
                }
            });

            return AllParents;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving parentss, ${error}`);
            throw new Error(`Failed to retrieve parents`);
        }

    }

    async getParentsOfaStudent(studentId: string){

        try {
            const parents = await this.prisma.parent.findMany({
                where: {
                    studentId: studentId,
                },
                include: {
                    profile: true
                }
            });

            return parents;

        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving Parents of a Student, error`);
            throw new Error(`Failed to retrieve parents`);
        }

    }



    // Grade Endpoints

    async createGrade() {
        // TODO: Implement createGrade method
    }

    async getGradeById(gradeId: number) {
        // TODO: Implement getGradeById method
    }

    async updateGrade(gradeId: number) {
        // TODO: Implement updateGrade method
    }

    async deleteGrade(gradeId: number) {
        // TODO: Implement deleteGrade method
    }

}
