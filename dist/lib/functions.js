"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = exports.expiresMaker = exports.decryptingText = exports.encryptingText = exports.makeDetailedDate = exports.detailedToday = exports.secondYesterday = exports.yesterday = exports.today = void 0;
const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    const second = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
exports.today = today;
const yesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    const second = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
exports.yesterday = yesterday;
const secondYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    const second = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
exports.secondYesterday = secondYesterday;
const detailedToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    const second = `0${date.getSeconds()}`.slice(-2);
    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    };
};
exports.detailedToday = detailedToday;
const makeDetailedDate = (dateTime) => {
    const splittedDate = dateTime.split('T') || dateTime.split(' ');
    console.log(splittedDate[0], splittedDate[1]);
    const date = splittedDate[0].split('-');
    const time = splittedDate[1].split(':');
    return {
        year: parseInt(date[0]),
        month: parseInt(date[1]),
        day: parseInt(date[2]),
        hour: parseInt(time[0]),
        minute: parseInt(time[1]),
        second: parseInt(time[2])
    };
};
exports.makeDetailedDate = makeDetailedDate;
const encryptingText = (text, shift) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-./,;|:;<=>?@[]{}';
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char);
        const shifter = parseInt(shift);
        if (index !== -1) {
            const shiftedIndex = (index + shifter) % alphabet.length;
            encryptedText += alphabet[shiftedIndex];
        }
        else {
            encryptedText += char;
        }
    }
    return encryptedText;
};
exports.encryptingText = encryptingText;
const decryptingText = (text, shift) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-./,;|:;<=>?@[]{}';
    let decryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char);
        const shifter = parseInt(shift);
        if (index !== -1) {
            const shiftedIndex = (index - shifter + alphabet.length) % alphabet.length;
            decryptedText += alphabet[shiftedIndex];
        }
        else {
            decryptedText += char;
        }
    }
    return decryptedText;
};
exports.decryptingText = decryptingText;
const expiresMaker = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
exports.expiresMaker = expiresMaker;
const encodeBase64 = (text) => {
    return Buffer.from(text, 'utf8').toString('base64');
};
exports.encodeBase64 = encodeBase64;
const decodeBase64 = (base64Text) => {
    return Buffer.from(base64Text, 'base64').toString('utf8');
};
exports.decodeBase64 = decodeBase64;
