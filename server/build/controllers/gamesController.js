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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query('SELECT * FROM games');
                const games = result;
                if (games.length > 0) {
                    return res.json(games[0]);
                }
                else {
                    return res.status(404).json({ message: "Games doesn't exists" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: "An error occurred" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query('INSERT INTO games set ?', [req.body]);
                res.json({ message: 'Game saved' });
            }
            catch (error) {
                res.json({ message: 'An error occurs saving Game--> ' + error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [result] = yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            console.log(result); // Log the result to see its structure
            // Check if any rows were affected
            if (result.affectedRows > 0) {
                res.json({ message: "The game was deleted" });
            }
            else {
                res.json({ message: "No game found with the provided ID" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldGame = req.body;
            if (!oldGame.title || !oldGame.description) {
                res.status(400).json({ message: "Missing required fields: title and description" });
            }
            const [games] = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            if (games.length === 0) {
                return res.status(404).json({ message: "Game not found" });
            }
            const [result] = yield database_1.default.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "No game updated" });
            }
            return res.json({ message: "The game was updated" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
                const games = result[0];
                if (games.length > 0) {
                    return res.json(games[0]);
                }
                else {
                    return res.status(404).json({ message: "The game doesn't exist" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: "An error occurred" });
            }
        });
    }
}
const gamesController = new GamesController;
exports.default = gamesController;
