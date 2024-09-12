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
exports.deleteItem = exports.edit = exports.create = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../../models/task.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    const status = req.query.status;
    if (status) {
        find["status"] = status;
    }
    const sort = {};
    const sortKey = `${req.query.sortKey}`;
    const sortValue = req.query.sortValue;
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    let skip = 0;
    let limitItems = 2;
    if (req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    }
    ;
    let page = 1;
    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }
    skip = (page - 1) * limitItems;
    if (req.query.keyword) {
        const regex = new RegExp(`${req.query.keyword}`, 'i');
        find["title"] = regex;
    }
    ;
    const tasks = yield task_model_1.default
        .find(find)
        .skip(skip)
        .limit(limitItems)
        .sort(sort);
    res.json(tasks);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield task_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.json(task);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        yield task_model_1.default.updateMany({
            _id: { $in: ids }
        }, {
            status: req.body.status
        });
        res.json({
            message: "Cập nhật thành công!"
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "Not Found 404"
        });
    }
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.createdBy = req["user"].id;
        const newTask = new task_model_1.default(req.body);
        yield newTask.save();
        res.json({
            message: "Thêm mới sản phẩm thành công!"
        });
    }
    catch (e) {
        res.json({
            message: "404 Not Found"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id
        }, req.body);
        res.json({
            message: "Cập nhật task thành công!"
        });
    }
    catch (e) {
        res.json({
            message: "404 Not Found"
        });
    }
});
exports.edit = edit;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        yield task_model_1.default.deleteMany({
            _id: { $in: ids }
        });
        res.json({
            message: "Xóa công việc thành công!"
        });
    }
    catch (e) {
        res.json({
            message: "404 Not Found"
        });
    }
});
exports.deleteItem = deleteItem;
