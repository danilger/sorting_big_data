import { promises as fs } from "fs";

// Функция для генерации случайной строки заданной длины
function generateRandomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Функция для создания файла с заданным размером и случайными строками
async function createRandomFile(
  filename: string,
  sizeInBytes: number
): Promise<any> {
  const bytesPerLine = 100; // Предполагаемая длина строки
  const numLines = sizeInBytes / bytesPerLine;

  let data = "";
  for (let i = 0; i < numLines; i++) {
    data += generateRandomString(bytesPerLine) + "\n";
  }

  return await fs.writeFile(filename, data);
}

// Создаем файл размером 10 МБ с именем "random_file.txt"
export async function GenerateTestFile(
  filename: string = "dist/random_file.txt",
  sizeMb: number = 10
) {
  const fileSizeInBytes: number = sizeMb * 1024 * 1024; // 10 МБ
  await createRandomFile(filename, fileSizeInBytes);
  //console.log(`Файл ${filename} создан.`);
  return filename;
}
