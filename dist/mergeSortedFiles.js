"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSortedFiles = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline_1 = __importDefault(require("readline"));
const merge = (queue) => {
    return new Promise((resolve) => {
        //сортировка очереди
        queue.sort((queueItem1, queueItem2) => {
            const line1 = (queueItem1 === null || queueItem1 === void 0 ? void 0 : queueItem1.line) || "";
            const line2 = (queueItem2 === null || queueItem2 === void 0 ? void 0 : queueItem2.line) || "";
            return line1.localeCompare(line2);
        });
        if (Math.round(queue[0].lineIndex / 1000) === queue[0].lineIndex / 1000) {
            console.clear();
            console.table(queue);
        }
        //добавление минимальной строки в файл с результатом
        const outputStream = fs.createWriteStream(path.resolve("dist", "result.txt"), { flags: "a" });
        const L = queue[0].line;
        try {
            outputStream.write(L + "\n", () => {
                outputStream.close();
            });
        }
        finally {
            outputStream.close(); // закрыть поток даже в случае исключения
        }
        //чтение части по минимальному индексу из очереди
        const readStream = fs.createReadStream(queue[0].file, {
            encoding: "utf-8",
        });
        const rl = readline_1.default.createInterface({
            input: readStream,
            crlfDelay: Infinity, // Ожидаем символ переноса строки для завершения строки
        });
        //-------чтение записи
        let LineIndex = 0;
        rl.on("line", (line) => {
            var _a;
            //нашли запись нужного индекса
            if (LineIndex == ((_a = queue[0]) === null || _a === void 0 ? void 0 : _a.lineIndex) + 1 && LineIndex != -1 && line) {
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
const mergeSortedFiles = (queue) => __awaiter(void 0, void 0, void 0, function* () {
    while ((queue === null || queue === void 0 ? void 0 : queue.length) > 0) {
        queue = yield merge(queue);
    }
});
exports.mergeSortedFiles = mergeSortedFiles;
//# sourceMappingURL=mergeSortedFiles.js.map