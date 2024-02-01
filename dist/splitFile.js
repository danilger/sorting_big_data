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
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitFile = void 0;
const fs = __importStar(require("fs"));
// Функция для разбиения файла на части
function splitFile(filePath = "dist/random_file.txt", partSize = 1024 * 1024) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const readStreamFromHugeFile = fs.createReadStream(filePath, {
                encoding: "utf-8",
                highWaterMark: partSize,
            });
            let partNumber = 1;
            let writingProcessStatus = 0;
            let initialQueue = [];
            readStreamFromHugeFile.on("data", (chunk) => __awaiter(this, void 0, void 0, function* () {
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
            }));
            return new Promise((resolve, reject) => {
                readStreamFromHugeFile.on("end", () => {
                    setTimeout(() => {
                        if (writingProcessStatus == 0) {
                            console.log("Разделение файла завершено.");
                            resolve(initialQueue);
                        }
                    }, 100);
                });
                readStreamFromHugeFile.on("error", (error) => {
                    console.error("Ошибка при чтении файла:", error);
                    reject(error);
                });
            });
        }
        catch (error) {
            console.error("Ошибка при разделении файла:", error);
        }
    });
}
exports.splitFile = splitFile;
//# sourceMappingURL=splitFile.js.map