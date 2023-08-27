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
exports.router = void 0;
const express_1 = require("express");
const mongoDB_1 = require("./mongoDB");
exports.router = (0, express_1.Router)();
exports.router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, mongoDB_1.getRoom)(id);
        res.json(response);
    }
    catch (e) {
        res.status(400).json('Error');
    }
}));
exports.router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield (0, mongoDB_1.deleteRoom)(id);
        res.status(200).json('Ok');
    }
    catch (e) {
        res.status(404).json('Error');
    }
}));
//# sourceMappingURL=router.js.map