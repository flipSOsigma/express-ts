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
const auth_1 = require("firebase/auth");
const functions_1 = require("../../lib/functions");
const firebase_1 = require("../../lib/firebase");
const router = (0, express_1.Router)();
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, username, password)
        .then((userCredential) => {
        try {
            const user = userCredential.user;
            const tokenString = JSON.stringify(user);
            const token = (0, functions_1.encodeBase64)(tokenString);
            res.json({
                status: "success",
                message: 'Sign in successfully',
                token
            });
        }
        catch (error) {
            console.log(error);
            res.json({
                status: "error",
                message: error.code,
            });
        }
    })
        .catch((error) => {
        res.json({
            status: "error",
            message: error.code,
        });
    });
}));
exports.default = router;
