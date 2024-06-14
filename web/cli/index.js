#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora"; // 加载指示器
import chalk from "chalk"; // 文本颜色和样式

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args[0] !== "g") {
  console.log(chalk.red("Invalid arguments."));
  process.exit(1);
}
const pageName = args[2];
const typeName = args[1];

const dir = path.resolve(__dirname, "..", "src/views");
const spinner = ora(`Building directory for ${pageName}`).start();

// 构建page目录
const pageFolder = path.resolve(dir, pageName);

if (typeName) {
  fileTransport(pageName, typeName);
} else {
  console.log(chalk.red("Invalid arguments."));
}

async function fileTransport(pageName, typeName) {
  try {
    const pageFolderPath = path.resolve(__dirname, pageFolder);
    // 显示进度
    spinner.text = `Creating directory for ${pageName}`;

    // 创建页面目录
    await fs.mkdir(pageFolderPath, { recursive: true });

    // 定义模板文件路径
    const templatePath = path.resolve(__dirname, `./template/${typeName}`);
    await fileInit(templatePath, pageFolder, pageName);

    spinner.succeed(chalk.green(`Transport for ${pageName} completed.`));
  } catch (err) {
    spinner.fail(chalk.red(`Error during file transport: ${err}`));
    process.exit(1);
  }
}

async function fileInit(templatePath, targetPath = templatePath, pageName) {
  try {
    const files = await fs.readdir(templatePath);
    for (const file of files) {
      const filePath = path.join(templatePath, file);
      const targetFilePath = path.join(targetPath, file.replace(/{pageName}/g, pageName));

      const isDirectory = (await fs.stat(filePath)).isDirectory();
      if (isDirectory) {
        // 如果是目录，则递归调用自身，并保持目标路径的一致性
        await fs.mkdir(targetFilePath, { recursive: true });
        await fileInit(filePath, targetFilePath, pageName);
      } else {
        // 替换文件内容中的{pageName}
        let content = await fs.readFile(filePath, "utf-8");
        content = content.replace(/\{pageName}/g, pageName);

        // 写入新文件
        await fs.writeFile(targetFilePath, content, "utf-8");

        spinner.text = chalk.blue(`${targetFilePath} created successfully!`);
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
