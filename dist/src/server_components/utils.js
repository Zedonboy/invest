"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function returnError(res, status, mssg) {
    res.statusMessage = mssg;
    res.status(status).end();
}
exports.returnError = returnError;
//# sourceMappingURL=utils.js.map