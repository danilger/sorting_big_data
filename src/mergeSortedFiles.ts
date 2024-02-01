import * as fs from "fs";
import * as path from "path";
import readline from "readline";
import { queueItem } from "./interfaces";

const merge = (queue: queueItem[]): Promise<queueItem[]> => {
  return new Promise((resolve) => {
    //сортировка очереди
    queue.sort((queueItem1, queueItem2) => {
      const line1 = queueItem1?.line || "";
      const line2 = queueItem2?.line || "";
      return line1.localeCompare(line2);
    });

    if (Math.round(queue[0].lineIndex / 1000) === queue[0].lineIndex / 1000) {
      console.clear();
      console.table(queue);
    }

    //добавление минимальной строки в файл с результатом
    const outputStream = fs.createWriteStream(
      path.resolve("dist", "result.txt"),
      { flags: "a" }
    );

    const L = queue[0].line;
    try {
      outputStream.write(L + "\n", () => {
        outputStream.close();
      });
    } finally {
      outputStream.close(); // закрыть поток даже в случае исключения
    }

    //чтение части по минимальному индексу из очереди
    const readStream = fs.createReadStream(queue[0].file, {
      encoding: "utf-8",
    });
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity, // Ожидаем символ переноса строки для завершения строки
    });

    //-------чтение записи
    let LineIndex = 0;

    rl.on("line", (line) => {
      //нашли запись нужного индекса
      if (LineIndex == queue[0]?.lineIndex + 1 && LineIndex != -1 && line) {
        queue[0].lineIndex = LineIndex;
        queue[0].line = line;
        LineIndex = -1;
        rl.close();
      }
      if (line == "/end") {
        queue.shift();
        LineIndex = -1;
      }

      if (LineIndex > -1) {
        LineIndex++;
      }
    });

    //конец чтения файла удаление из очереди если часть закончилась
    rl.on("close", () => {
      readStream.close(() => {
        resolve(queue);
      });
    });
  });
};

export const mergeSortedFiles = async (queue: queueItem[]) => {
  while (queue?.length > 0) {
    queue = await merge(queue);
  }
};
