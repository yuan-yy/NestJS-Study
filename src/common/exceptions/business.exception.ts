/*
 * @Author: 原野 841322557@qq.com
 * @Date: 2023-01-19 18:48:16
 * @LastEditors: 原野 841322557@qq.com
 * @LastEditTime: 2023-01-19 18:48:32
 * @FilePath: \nestJS\src\common\exceptions\business.exception.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.codes';

type BusinessError = {
  code: number;
  message: string;
};

export class BusinessException extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
      message: '抱歉哦，您无此权限！',
    });
  }
}
