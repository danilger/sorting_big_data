"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateTestFile_1 = require("./generateTestFile");
const mergeSortedFiles_1 = require("./mergeSortedFiles");
const splitFile_1 = require("./splitFile");
//Создание файла для теста
function main(fileSizeMb = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = yield (0, generateTestFile_1.GenerateTestFile)("dist/random_file.txt", fileSizeMb);
        //const filePath = "dist/random_file.txt";
        // Вызываем функцию для разбиения файла
        const initQueue = (yield (0, splitFile_1.splitFile)(filePath, 1024 * 1024)) || [];
        (0, mergeSortedFiles_1.mergeSortedFiles)(initQueue);
    });
}
main(10);
//# sourceMappingURL=index.js.map