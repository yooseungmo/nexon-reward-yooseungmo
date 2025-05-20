import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private getBaseUrl(key: string): string {
    const url = this.config.get<string>(key);
    if (!url) throw new InternalServerErrorException(`${key}가 정의되지 않았습니다.`);
    return url;
  }

  async forward(
    envKey: 'AUTH_SERVICE_URL' | 'EVENT_SERVICE_URL',
    method: string,
    path: string,
    data?: any,
    params?: any,
  ) {
    const url = this.getBaseUrl(envKey) + path;
    try {
      const response$ = this.http.request({ method, url, data, params });
      const { data: res } = await firstValueFrom(response$);
      return res;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // target 서비스가 돌려준 status, body 그대로 떨궈주기
        throw new HttpException(err.response.data, err.response.status);
      }
      // 그 밖의 네트워크 오류 등
      throw new InternalServerErrorException('Proxy 요청 중 오류가 발생했습니다.');
    }
  }
}
