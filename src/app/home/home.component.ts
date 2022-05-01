import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {identity, interval, noop, Observable, of, pipe, throwError, timer, UnaryFunction} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, switchMap, tap, toArray} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {CoursesService} from '../services/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private dialog: MatDialog, private coursesService: CoursesService) {

  }

  ngOnInit() {
    const courses$ = this.coursesService.loadAllCourses().pipe(map(courses => courses.sort(sortCoursesBySeqNo)));
    this.beginnerCourses$ = courses$.pipe(this.getCoursesByCategory('BEGINNER'));
    this.advancedCourses$ = courses$.pipe(this.getCoursesByCategory('ADVANCED'));
  }

  private getCoursesByCategory(category: 'BEGINNER' | 'ADVANCED'): UnaryFunction<Observable<Course[]>, Observable<Course[]>> {
    return pipe(switchMap(identity), filter(course => course.category === category), toArray());
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }

}




