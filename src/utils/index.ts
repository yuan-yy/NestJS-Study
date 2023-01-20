/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author: 原野 841322557@qq.com
 * @Date: 2023-01-19 19:14:35
 * @LastEditors: 原野 841322557@qq.com
 * @LastEditTime: 2023-01-19 19:33:04
 * @FilePath: \nestJS\utils\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { parse } from 'yaml';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const fs = require('fs');

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
