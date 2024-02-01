import * as fs from "fs";
import { queueItem } from "./interfaces";

// Функция для разбиения файла на части
export async function splitFile(
  filePath: string = "dist/random_file.txt",
  partSize: number = 1024 * 1024
): Promise<queueItem[] | undefined> {
  try {
    const readStreamFromHugeFile = fs.createReadStream(filePath, {
      encoding: "utf-8",
      highWaterMark: partSize,
    });
    let partNumber = 1;
    let writingProcessStatus = 0;
    let initialQueue: queueItem[] = [];

    readStreamFromHugeFile.on("data", async (chunk: Buffer) => {
      const partFileName = filePath + ".part" + partNumber;

      const writeStreamToPartFile = fs.createWriteStream(partFileName);

      writingProcessStatus = 1;

      let payload = chunk
        .toString()
        .split("\n")
        .filter((e) => e != "")
        .sort();

      payload.push("/end");

      initialQueue.push({ file: partFileName, lineIndex: 0, line: payload[0] });

      writeStreamToPartFile.write(payload.join("\n"), () => {
        writingProcessStatus = 0;
        writeStreamToPartFile.end();
      });

      partNumber++;
    });

    return new Promise<queueItem[]>((resolve, reject) => {
      readStreamFromHugeFile.on("end", () => {
        setTimeout(() => {
          if (writingProcessStatus == 0) {
            console.log("Разделение файла завершено.");
            resolve(initialQueue);
          }
        }, 100);
      });
      readStreamFromHugeFile.on("error", (error: any) => {
        console.error("Ошибка при чтении файла:", error);
        reject(error);
      });
    });
  } catch (error) {
    console.error("Ошибка при разделении файла:", error);
  }
}
