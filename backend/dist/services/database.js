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
exports.dateToSQLFormat = exports.updateItemAssignedTo = exports.updateItemName = exports.removeItem = exports.addItem = exports.transformDatabaseItemToComponent = exports.loadLists = exports.loadUsers = exports.loadItems = void 0;
const supabase_1 = require("../lib/supabase");
const loadItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase.from('items').select(`
            id,
            name,
            created_at,
            updated_at,
            assigned_to:users!assigned_to(id, name),
            list_id:lists(id, name, display_name)
        `).order('created_at', { ascending: true });
    if (error) {
        console.error("Error loading items: ", error);
        throw error;
    }
    console.log(data);
    return data !== null && data !== void 0 ? data : [];
});
exports.loadItems = loadItems;
const loadUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase
        .from('users')
        .select('id, name')
        .order('name');
    if (error) {
        console.error("Error loading users: ", error);
        throw error;
    }
    return data !== null && data !== void 0 ? data : [];
});
exports.loadUsers = loadUsers;
const loadLists = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase
        .from('lists')
        .select('id, name, display_name')
        .order('name');
    if (error) {
        console.error("Error loading lists: ", error);
        throw error;
    }
    return data !== null && data !== void 0 ? data : [];
});
exports.loadLists = loadLists;
const transformDatabaseItemToComponent = (dbItem) => {
    return {
        id: dbItem.id,
        name: dbItem.name,
        assignedTo: dbItem.assigned_to.name
    };
};
exports.transformDatabaseItemToComponent = transformDatabaseItemToComponent;
const addItem = (itemName, assignedToUserId, listId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase
        .from('items')
        .insert([
        {
            name: itemName,
            assigned_to: assignedToUserId,
            list_id: listId
        }
    ])
        .select(`
        id,
        name,
        created_at,
        updated_at,
        assigned_to:users!assigned_to(id, name),
        list_id:lists(id, name, display_name) 
    `);
    if (error) {
        console.error(error);
        throw error;
    }
    return data === null || data === void 0 ? void 0 : data[0];
});
exports.addItem = addItem;
const removeItem = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase_1.supabase
        .from('items')
        .delete()
        .eq('id', itemId);
    if (error) {
        console.error("Error removing item: ", error);
        throw error;
    }
});
exports.removeItem = removeItem;
const updateItemName = (itemId, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase
        .from('items')
        .update({
        name: newName
    })
        .eq('id', itemId)
        .select(`
            id,
            name,
            created_at,
            updated_at,
            assigned_to:users!assigned_to(id, name),
            list_id:lists(id, name, display_name)
        `);
    if (error) {
        console.error(error);
        throw error;
    }
    return data === null || data === void 0 ? void 0 : data[0];
});
exports.updateItemName = updateItemName;
const updateItemAssignedTo = (itemId, newAssignedToId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase
        .from('items')
        .update({
        assigned_to: newAssignedToId
    })
        .eq('id', itemId)
        .select(`
            id,
            name,
            created_at,
            updated_at,
            assigned_to:users!assigned_to(id, name),
            list_id:lists(id, name, display_name)
        `);
    if (error) {
        console.error("Error updating item assigned_to: ", error);
        throw error;
    }
    return data === null || data === void 0 ? void 0 : data[0];
});
exports.updateItemAssignedTo = updateItemAssignedTo;
const dateToSQLFormat = (date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
};
exports.dateToSQLFormat = dateToSQLFormat;
