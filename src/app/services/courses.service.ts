import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<{ payload: Course[] }>('/api/courses').pipe(
      map(({ payload }) => payload),
      shareReplay(),
    );
  }
}
