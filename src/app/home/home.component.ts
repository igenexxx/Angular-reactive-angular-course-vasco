import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {identity, Observable, pipe, UnaryFunction} from 'rxjs';
import {filter, map, switchMap, toArray} from 'rxjs/operators';
import {CoursesService} from '../services/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private coursesService: CoursesService) {

  }

  ngOnInit() {
   this.reloadCourses();
  }

  private getCoursesByCategory(category: 'BEGINNER' | 'ADVANCED'): UnaryFunction<Observable<Course[]>, Observable<Course[]>> {
    return pipe(switchMap(identity), filter(course => course.category === category), toArray());
  }

  private reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(map(courses => courses.sort(sortCoursesBySeqNo)));
    this.beginnerCourses$ = courses$.pipe(this.getCoursesByCategory('BEGINNER'));
    this.advancedCourses$ = courses$.pipe(this.getCoursesByCategory('ADVANCED'));
  }

  onCoursesChanges() {
    this.reloadCourses();
  }
}




