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
const firebase_1 = require("../../lib/firebase");
const functions_1 = require("../../lib/functions");
const firestore_1 = require("firebase/firestore");
const router = (0, express_1.Router)();
router.patch('/transaction/:q', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.q;
    const { amount, description, category, date } = req.body;
    try {
        var preUpdate = {};
        console.log(query);
        const userRef = (0, firestore_1.doc)(firebase_1.db, 'data', query);
        const docSnap = yield (0, firestore_1.getDoc)(userRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);
            preUpdate = {
                amount: !amount || amount == null ? data.amount : amount,
                category: !category || category == "" ? data.category : category,
                date: !date || date == "" ? data.date : date,
                description: !description || description == "" ? data.description : description,
                updated_at: (0, functions_1.today)()
            };
        }
        else {
            console.log("No such document!");
        }
        console.log(preUpdate);
        (0, firestore_1.updateDoc)(userRef, preUpdate);
        res.json({
            status: "success",
            message: "Data updated successfully",
            data: preUpdate
        });
    }
    catch (error) {
        res.json({
            status: "error",
            message: "Failed to update data",
            error
        });
    }
}));
exports.default = router;
