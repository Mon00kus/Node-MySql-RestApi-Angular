"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'Default API is in /api/index' });
    }
}
exports.indexController = new IndexController;
