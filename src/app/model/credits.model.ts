import {Cast} from './cast.model';
import {Crew} from './crew.model';

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
