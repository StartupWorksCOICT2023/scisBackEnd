import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSubjectDto, createTestDto, createstudentResultDto, editSubjectDto, editTestDto, updateStudentResultDto } from './dto';
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

    async getStudentResultByTestId(testId: string){
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




    // ClassLevel Endpoints

    async createClassLevel() {
        // TODO: Implement createClassLevel method
    }

    async getClassLevelById(classLevelId: number) {
        // TODO: Implement getClassLevelById method
    }

    async updateClassLevel(classLevelId: number) {
        // TODO: Implement updateClassLevel method
    }

    async deleteClassLevel(classLevelId: number) {
        // TODO: Implement deleteClassLevel method
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





    // Student Endpoints

    async createStudent() {
        // TODO: Implement createStudent method
    }

    async getStudentById(studentId: number) {
        // TODO: Implement getStudentById method
    }

    async updateStudent(studentId: number) {
        // TODO: Implement updateStudent method
    }

    async deleteStudent(studentId: number) {
        // TODO: Implement deleteStudent method
    }



}
