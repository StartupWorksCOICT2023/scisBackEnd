import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSubjectDto, createTestDto, createclassDto, createstudentDto, createstudentResultDto, editSubjectDto, editTestDto, editclassDto, editstudentDto, updateStudentResultDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { test } from 'node:test';


@Injectable()
export class GradebookService {

    constructor(private prisma: PrismaService) { }

    // Test Endpoints
    async getAllTest() {
        const allTests = await this.prisma.test.findMany({
            select: {
                name: true,
                subjectId: true,
            },
        });
        return allTests;
    }

    async createTest(dto: createTestDto) {
        // TODO: Implement createTest method
        const testExists = await this.prisma.test.findFirst({
            where: {
                // what do we compare tests with
                testId: dto.testId
            }
        })

        if (testExists) {
            return "This test arleady exists";
        }

        const testCreated = await this.prisma.test.create({
            data: {
                testId: dto.testId,
                name: dto.testName,
                subject: {
                    connect: { subjectId: dto.subjectId } // Update this line
                }
            },
        });

        // Handle the created test, return it, or perform any additional operations
        return testCreated;
    }

    async getTestById(testId: string) {
        const test = await this.prisma.test.findFirst({
            where: {
                testId: testId,
            },
        });

        if (!test) {
            return "This test does not exists";

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
            return "This test does not exists";
        }

        const updatedTest = await this.prisma.test.update({
            where: {
                testId: passedtestId,
            },
            data: {
                name: dto.testName,
                subjectId: dto.subjectId,
                // Include other fields to be updated from the updateTestDto
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
            return "cannot delete, This test does not exists";
        }

        const deletedTest = await this.prisma.test.delete({
            where: {
                testId: passedtestId,
            },
        });

        return deletedTest;
    }



    // Subject Endpoints
    async createSubject(dto: createSubjectDto) {

        const subjectExists = await this.prisma.subject.findFirst({
            where: {
                subjectId: dto.subjectId,
            },
        });

        // If user exists or UserID is already in use, return an error
        if (subjectExists) {
            return "This subject exists or subjectId is already in use";
        }

        if (!subjectExists) {
            console.log(dto.subjectId)
            console.log(dto.name)

            const createdSubject = await this.prisma.subject.create({
                data: {
                    subjectId: dto.subjectId,
                    name: dto.name,
                }
            });

            return createdSubject
        }

    }

    async getAllSubjects() {
        const allSubjects = await this.prisma.subject.findMany({
            select: {
                subjectId: true,
                name: true,
                // teacher: true,
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

    async getStudentResultByStudentId(studentId: string) {
        try {
            const studentResultsById = await this.prisma.studentResults.findMany({
                where: {
                    studentId: studentId,
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
            });

            return studentResultsByTestId;
        } catch (error) {
            // Handle the error appropriately
            console.error(`Error retrieving student results for testId: ${testId}`, error);
            throw new Error(`Failed to retrieve student results for testId: ${testId}`);
        }
    }

    async updateStudentResult(dto: updateStudentResultDto) {

        const isResultEntryPresent = await this.prisma.studentResults.findFirst({
            where: {
                studentId: dto.studentId,
                testId: dto.testId,
                marksObtained: dto.currentTestMarks,
            }
        })

        if (isResultEntryPresent) {
            throw new Error('"this result is present, please confirm or edit arleady present entry"')
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
            return updatedResultEntry;
        }


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

            const createnewClass = await this.prisma.classLevel.create({
                data: {
                    classId: `${dto.year}-${dto.class}-${dto.combination}-${dto.stream}`,
                    year: dto.year,
                    class: dto.class,
                    combination: dto.combination,
                    stream: dto.stream,
                    level: dto.level
                }
            })

            if (createnewClass) {
                return 'new class create succesfully'
            }
        }
    }

    async getClassLevelById(classLevelId: string) {

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
