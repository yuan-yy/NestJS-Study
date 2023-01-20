/*
 * @Author: 原野 841322557@qq.com
 * @Date: 2023-01-19 18:08:42
 * @LastEditors: 原野 841322557@qq.com
 * @LastEditTime: 2023-01-19 18:13:42
 * @FilePath: \nestJS\src\common\interceptors\transform.interceptor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        status: 0,
        extra: {},
        message: 'success',
        success: true,
      })),
    );
  }
}
