/*
 * @Author: 原野 841322557@qq.com
 * @Date: 2023-01-19 17:48:32
 * @LastEditors: 原野 841322557@qq.com
 * @LastEditTime: 2023-01-19 19:31:47
 * @FilePath: \nestJS\src\user\user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Version('3')
  findAll2() {
    return 'i`am xiaox';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.userService.findAll();
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.userService.findAll();
  }

  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name + '1231121212122';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
