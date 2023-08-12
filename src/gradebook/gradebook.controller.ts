import { Controller, Get, Req, Param, Patch, Delete, Post, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
// import services
// import dto
import { GetUserprofile } from '../auth/decorator';
import { createSubjectDto, createTestDto, createclassDto, createstudentDto, createstudentResultDto, editSubjectDto, editTestDto, editclassDto, editstudentDto, updateBatchStudentResultDto, updateStudentResultDto } from './dto';
import { GradebookService } from './gradebook.service';

@UseGuards(JwtGuard)
@Controller('gradebook')

export class GradebookController {
  constructor(
    private GradebookService: GradebookService,
  ) { }



  // Test Endpoints:

  @Get('test')
  getAllTests() {
    return this.GradebookService.getAllTest()
  }

  @Post('test')
  createTests(
    @Body() dto: createTestDto
  ) {
    return this.GradebookService.createTest(dto)
  }

  @Get('test/:id')
  getTestById(
    @Param('id') testId: string
  ) {
    return this.GradebookService.getTestById(testId)
  }

  @Patch('test/:id')
  updateTestDetails(
    @Body() dto: editTestDto,
    @Param('id') testId: string
  ) {
    return this.GradebookService.updateTest(dto, testId)
  }

  @Delete('test/:id')
  deleteTest(
    @Param('id') testId: string
  ) {
    return this.GradebookService.deleteTest(testId)
  }






  // Subject Endpoints:

  @Post('subjects')
  createSubject(
    @Body() dto: createSubjectDto
  ) {
    return this.GradebookService.createSubject(
      dto
    )
  }

  @Get('subjects')
  getAllSubjects() {
    return this.GradebookService.getAllSubjects()
  }

  @Get('subjects/:subjectId')
  getSubjectById(
    @Param('subjectId') subjectId: string
  ) {
    return this.GradebookService.getSubjectById(subjectId)
  }

  @Patch('subjects/:subjectId')
  updateSubjectById(
    @Param('subjectId') subjectId: string,
    @Body() dto: editSubjectDto
  ) {
    return this.GradebookService.updateSubject(subjectId, dto)
  }

  @Delete('subjects/:subjectId')
  deleteSubjectById(
    @Param('subjectId') subjectId: string
  ) {
    return this.GradebookService.deleteSubject(subjectId)
  }


  // StudentResult Endpoints:

  @Post('studentResults')
  createstudentResult(
    @Body() dto: createstudentResultDto
  ) {
    return this.GradebookService.createStudentResult(dto)
  }




















  @Post('uploadStudentResults')
  uploadStudentResults() {
    return this.GradebookService.uploadResultsbyExcelFiles()
  }



















  @Get('studentResults/student/:studentId')
  getstudentResultsbyStudentId(
    @Param('studentId') studentId: string
  ) {
    return this.GradebookService.getStudentResultByStudentId(studentId)
  }

  @Get('studentResults/test/:testId')
  getstudentResultsbyTestId(
    @Param('testId') testId: string
  ) {
    return this.GradebookService.getStudentResultByTestId(testId)
  }

  @Patch('studentResults')
  updateStudentResults(
    @Body() dto: updateStudentResultDto
  ) {
    return this.GradebookService.updateStudentResult(dto)
  }
  
  @Patch('studentResults/batch')
  updateBatchStudentResults(
    @Body() dtoList: updateBatchStudentResultDto[]
  ) {
    return this.GradebookService.updateBatchStudentResult(dtoList)
  }

  @Delete('studentResults')
  deleteSubject(
    @Body() dto: createstudentResultDto
  ) {
    return this.GradebookService.deleteStudentResult(dto)
  }




  // Student ednpoints:

  @Post('student')
  createStudent(
    @Body() dto: createstudentDto
  ) {
    return this.GradebookService.createStudent(dto)
  }


  @Get('student/:studentId')
  getStudentById(
    @Param('studentId') studentId: string
  ) {
    return this.GradebookService.getStudentById(studentId)
  }

  // this is crap
  @Patch('student')
  editStudentById(
    @Body() dto: editstudentDto
  ) {
    return this.GradebookService.updateStudent(dto)
  }


  @Delete('student/:studentId')
  deleteStudentById(
    @Param('studentId') studentId: string
  ) {
    return this.GradebookService.deleteStudent(studentId)
  }





  // ClassLevel Endpoints:

  @Post('classlevel')
  createClassLevel(
    @Body() dto: createclassDto
  ) {
    return this.GradebookService.createClassLevel(dto)
  }

  @Get('classlevel/:classLevelId')
  getClassLevelById(
    @Param('classLevelId') classLevelId: string
  ) {
    return this.GradebookService.getClassLevelById(classLevelId)
  }

  @Get('classlevel/currentyear')
  getClassLevelsOfCurrentYear(
  ) {
    return this.GradebookService.getClassLevelsOfCurrentYear()
  }



  @Get('classlevel/year/:year')
  getClassLevelsByYear(
    @Param('year') year: string
  ) {
    return this.GradebookService.getClassLevelsByYear(year)
  }

  @Patch('classlevel/:classLevelId')
  updateClassLevel(
    @Param('classLevelId') classLevelId: string,
    @Body() dto: editclassDto
  ) {
    return this.GradebookService.updateClassLevel(dto, classLevelId)
  }

  @Delete('classlevel/:classLevelId')
  deleteClassLevel(
    @Param('classLevelId') classLevelId: string,
  ) {
    return this.GradebookService.deleteClassLevel(classLevelId)
  }



}





// Grade Endpoints:
// Create Grade: POST /grades
// Get Grade by ID: GET /grades/{gradeId}
// Update Grade: PUT /grades/{gradeId}
// Delete Grade: DELETE /grades/{gradeId}
