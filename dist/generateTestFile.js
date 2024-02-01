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
exports.GenerateTestFile = void 0;
const fs_1 = require("fs");
// Функция для генерации случайной строки заданной длины
function generateRandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
// Функция для создания файла с заданным размером и случайными строками
function createRandomFile(filename, sizeInBytes) {
    return __awaiter(this, void 0, void 0, function* () {
        const bytesPerLine = 100; // Предполагаемая длина строки
        const numLines = sizeInBytes / bytesPerLine;
        let data = "";
        for (let i = 0; i < numLines; i++) {
            data += generateRandomString(bytesPerLine) + "\n";
        }
        return yield fs_1.promises.writeFile(filename, data);
    });
}
// Создаем файл размером 10 МБ с именем "random_file.txt"
function GenerateTestFile(filename = "dist/random_file.txt", sizeMb = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileSizeInBytes = sizeMb * 1024 * 1024; // 10 МБ
        yield createRandomFile(filename, fileSizeInBytes);
        //console.log(`Файл ${filename} создан.`);
        return filename;
    });
}
exports.GenerateTestFile = GenerateTestFile;
//# sourceMappingURL=generateTestFile.js.map