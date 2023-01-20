/*
 * @Author: 原野 841322557@qq.com
 * @Date: 2023-01-19 17:29:43
 * @LastEditors: 原野 841322557@qq.com
 * @LastEditTime: 2023-01-19 18:43:56
 * @FilePath: \nestJS\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';

import { AppModule } from './app.module';
// 统一响应体格式 全局统一响应结构
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';

import { generateDocument } from './doc';
declare const module: any;
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // 接口化版本管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2', '3'],
    type: VersioningType.URI,
  });

  //  统一响应体
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 创建文档
  generateDocument(app);

  // 热更新的配置
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}
bootstrap();
