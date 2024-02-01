import { GenerateTestFile } from "./generateTestFile";
import { mergeSortedFiles } from "./mergeSortedFiles";
import { splitFile } from "./splitFile";

//Создание файла для теста

async function main(fileSizeMb = 1) {
  const filePath = await GenerateTestFile("dist/random_file.txt", fileSizeMb);
  //const filePath = "dist/random_file.txt";

  // Вызываем функцию для разбиения файла
  const initQueue = (await splitFile(filePath, 1024 * 1024)) || [];

  mergeSortedFiles(initQueue);
}

main(10);
