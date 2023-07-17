import { Controller, Get, Req, Param, Patch, Delete, Post, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
// import services
// import dto
import { GetUserprofile } from '../auth/decorator';
import { createSubjectDto, createTestDto, editSubjectDto, editTestDto } from './dto';
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
    @Body () dto: editTestDto,
    @Param('id') testId: string
  ){
    return this.GradebookService.updateTest(dto, testId)
  }


  @Delete('test/:id')
  deleteTest(
    @Param('id') testId: string
  ){
    return this.GradebookService.deleteTest(testId)
  }





  // Subject Endpoints:

@Post('subjects')
createSubject(
  @Body() dto: createSubjectDto 
){
    return this.GradebookService.createSubject(
      dto
    )
}

@Get('subjects')
getAllSubjects(){
    return this.GradebookService.getAllSubjects()
}

@Get('subjects/:subjectId')
getSubjectById(
  @Param('subjectId') subjectId: string
){
    return this.GradebookService.getSubjectById(subjectId)
}

@Patch('subjects/:subjectId')
updateSubjectById(
  @Param('subjectId') subjectId: string,
  @Body () dto: editSubjectDto
){
    return this.GradebookService.updateSubject(subjectId, dto)
}

@Delete('subjects/:subjectId')
deleteSubjectById(
  @Param('subjectId') subjectId: string
){
    return this.GradebookService.deleteSubject(subjectId)
}

  
}






// StudentResult Endpoints:

// Create StudentResult: POST /student-results
// Get StudentResult by ID: GET /student-results/{resultId}
// Update StudentResult: PUT /student-results/{resultId}
// Delete StudentResult: DELETE /student-results/{resultId}
// ClassLevel Endpoints:

// Create ClassLevel: POST /class-levels
// Get ClassLevel by ID: GET /class-levels/{classLevelId}
// Update ClassLevel: PUT /class-levels/{classLevelId}
// Delete ClassLevel: DELETE /class-levels/{classLevelId}
// Student Endpoints:



// Create Grade: POST /grades
// Get Grade by ID: GET /grades/{gradeId}
// Update Grade: PUT /grades/{gradeId}
// Delete Grade: DELETE /grades/{gradeId}



// Create Student: POST /students
// Get Student by ID: GET /students/{studentId}
// Update Student: PUT /students/{studentId}
// Delete Student: DELETE /students/{studentId}
// Grade Endpoints: