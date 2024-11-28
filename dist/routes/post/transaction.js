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
const express_1 = require("express");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../lib/firebase");
const functions_1 = require("../../lib/functions");
const router = (0, express_1.Router)();
router.post('/transaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, amount, description, category, date } = req.body;
    const data = {
        uid,
        amount,
        description,
        category,
        date,
        created_at: (0, functions_1.today)(),
        updated_at: (0, functions_1.today)(),
        detail: (0, functions_1.makeDetailedDate)(date),
    };
    console.log(data);
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, 'data'), data);
        const docData = Object.assign({ id: docRef.id }, data);
        res.json({
            status: "success",
            message: "Data fetched successfully",
            data: data,
            docRef: docData
        });
    }
    catch (error) {
        res.json({
            status: "error",
            message: error,
        });
    }
}));
exports.default = router;
