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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_CustomerPortal = exports.Get_CusName = exports.Get_AcctNumber = void 0;
var stripe_1 = require("stripe");
var StripeAPIKey = require('../../config.json').StripeAPIKey;
// @ts-ignore
var stripe_conn = new stripe_1.Stripe(StripeAPIKey);
function Get_AcctNumber(data) {
    return __awaiter(this, void 0, void 0, function () {
        var email, customers, customer, CusID, CusBal, CusCurrency, CusDelinquent, CusEmail, CusName, CusAddressObj, CusCity, CusAddr, CusZip, CusState;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = data[0].email;
                    return [4 /*yield*/, stripe_conn.customers.search({
                            query: 'email:\'' + email + '\'',
                        })];
                case 1:
                    customers = _a.sent();
                    customer = customers.data[0];
                    CusID = customer.id;
                    CusBal = customer.balance;
                    CusCurrency = customer.currency;
                    CusDelinquent = customer.delinquent;
                    CusEmail = customer.email;
                    CusName = customer.name;
                    CusAddressObj = customer.address;
                    CusCity = CusAddressObj.city;
                    CusAddr = CusAddressObj.line1;
                    CusZip = CusAddressObj.postal_code;
                    CusState = CusAddressObj.state;
                    // @ts-ignore
                    return [2 /*return*/, CusID];
            }
        });
    });
}
exports.Get_AcctNumber = Get_AcctNumber;
function Get_CusName(data) {
    return __awaiter(this, void 0, void 0, function () {
        var email, customers, customer, CusID, CusBal, CusCurrency, CusDelinquent, CusEmail, CusName, CusAddressObj, CusCity, CusAddr, CusZip, CusState;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = data[0].email;
                    return [4 /*yield*/, stripe_conn.customers.search({
                            query: 'email:\'' + email + '\'',
                        })];
                case 1:
                    customers = _a.sent();
                    customer = customers.data[0];
                    CusID = customer.id;
                    CusBal = customer.balance;
                    CusCurrency = customer.currency;
                    CusDelinquent = customer.delinquent;
                    CusEmail = customer.email;
                    CusName = customer.name;
                    CusAddressObj = customer.address;
                    CusCity = CusAddressObj.city;
                    CusAddr = CusAddressObj.line1;
                    CusZip = CusAddressObj.postal_code;
                    CusState = CusAddressObj.state;
                    // @ts-ignore
                    return [2 /*return*/, CusName];
            }
        });
    });
}
exports.Get_CusName = Get_CusName;
function Get_CustomerPortal(data) {
    return __awaiter(this, void 0, void 0, function () {
        var session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, stripe_conn.billingPortal.sessions.create({
                        // @ts-ignore
                        customer: data,
                        return_url: 'https://example.com/account',
                    })];
                case 1:
                    session = _a.sent();
                    // @ts-ignore
                    if (session === null) {
                        return [2 /*return*/, false];
                    }
                    else {
                        return [2 /*return*/, session.url];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.Get_CustomerPortal = Get_CustomerPortal;
