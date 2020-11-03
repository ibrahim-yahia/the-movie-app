import {Injectable} from '@angular/core';
import {HttpService} from '../common/http.service';
import {Config} from '../../model/config.model';

@Injectable()
export class ConfigApiService {
  private readonly apiController: string = 'configuration';
  private config: Config;

  constructor(private api: HttpService) {
  }

  get data(): Config {
    return this.config;
  }

  load(): Promise<any> {
    return this.api.get(this.apiController)
      .toPromise()
      .then(config => {
        this.config = config;
        return config;
      });
  }

  getPosterImageBaseUrl(): string {
    const imagesConfig = this.config.images;
    const posterSize = imagesConfig.poster_sizes.length > 2 ? imagesConfig.poster_sizes.length - 3 : imagesConfig.poster_sizes.length - 1;
    return imagesConfig.base_url.concat(imagesConfig.poster_sizes[posterSize]);
  }
}
