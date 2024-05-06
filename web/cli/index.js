#!/usr/bin/env node

import fs from "fs";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args[0] !== "g") {
  console.log("Invalid arguments.");
  process.exit(1);
}
const pageName = args[2];
const typeName = args[1];
const dir = path.resolve(__dirname, "../src/views");
// 构建page目录
const pageFolder = path.resolve(dir, pageName);

if (typeName) {
  fileTransport(pageName, typeName);
} else {
  console.log("Invalid arguments.");
}

function fileTransport(pageName, typeName) {
  if (!fs.existsSync(pageFolder)) {
    fs.mkdirSync(pageFolder);
  }

  // 定义模板文件路径
  const templatePath = path.resolve(__dirname, `./template/${typeName}`);
  fileInit(templatePath);
}

function fileInit(templatePath) {
  fs.readdir(templatePath, (err, files) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    files.forEach((file) => {
      console.log(file.includes("{pageName}"));
      if (file.includes("{pageName}")) {
        const filePath = path.resolve(templatePath, file);
        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          const result = data.replace(/\{pageName}/g, pageName);
          const fileName = file.replace("{pageName}", pageName);
          fs.writeFile(path.resolve(pageFolder, fileName), result, "utf-8", (err) => {
            if (err) {
              console.log(err);
              process.exit(1);
            }
            console.log(`${fileName} created successfully!`);
          });
        });
      } else {
        fileInit(path.resolve(templatePath, file));
      }
    });
  });
}
