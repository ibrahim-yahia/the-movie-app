import {DateRange} from './date-range.model';

export interface Page<T> {
  results: T[];
  dates: DateRange;
  page: number;
  total_results: number;
  total_pages: number;
}
