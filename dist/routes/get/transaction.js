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
router.get('/transaction/:q', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.q;
    const bigData = [];
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, firestore_1.getDocs)((0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'data'), (0, firestore_1.where)("uid", "==", uid), (0, firestore_1.orderBy)("detail.hour", "desc"), (0, firestore_1.orderBy)("detail.minute", "desc")));
        for (let i = 0; i <= 2; i++) {
            const listData = [];
            data.forEach((item) => {
                const eachRawData = item.data();
                if (eachRawData.detail.day == parseInt((0, functions_1.today)().split('-')[2]) - i && eachRawData.detail.month == parseInt((0, functions_1.today)().split('-')[1]) && eachRawData.detail.year == parseInt((0, functions_1.today)().split('-')[0])) {
                    const eachData = {
                        id: item.id,
                        icon: "🏥",
                        category: eachRawData.category,
                        description: eachRawData.description,
                        time: eachRawData.detail.hour + ":" + eachRawData.detail.minute,
                        amount: eachRawData.amount,
                        color: "hm"
                    };
                    listData.push(eachData);
                }
            });
            const eachDate = {
                id: i + 1,
                date: parseInt((0, functions_1.today)().split('-')[2]) - i + "/" + parseInt((0, functions_1.today)().split('-')[1]) + "/" + parseInt((0, functions_1.today)().split('-')[0]),
                data: listData
            };
            bigData.push(eachDate);
        }
        return bigData;
    });
    res.json({
        status: "success",
        message: "Data fetched successfully",
        data: yield getData()
    });
}));
exports.default = router;
