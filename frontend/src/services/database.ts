import {supabase} from "../lib/supabase";
import { DatabaseItem, DatabaseUser, DatabaseList, Item } from "../types"

export const loadItems = async (): Promise<DatabaseItem[]> => {
    const {data, error} = await supabase.from('items').select(`
            id,
            name,
            created_at,
            updated_at,
            assigned_to:users(id, name),
            list_id:lists(id, name, display_name)
        `).order('created_at', {ascending: true});
    if (error) {
        console.error("Error loading items: ", error);
        throw error;
    }

    return data ?? [];
}

export const loadUsers = async (): Promise<DatabaseUser[]> => {
    const {data, error} = await supabase
        .from('users')
        .select('id, name')
        .order('name');
    if (error) {
        console.error("Error loading users: ", error);
        throw error;
    }

    return data ?? [];
}

export const loadLists = async (): Promise<DatabaseList[]> => {
    const {data, error} = await supabase
        .from('lists')
        .select('id, name, display_name')
        .order('name');
    if (error) {
        console.error("Error loading lists: ", error);
        throw error;
    }

    return data ?? [];
}

export const transformDatabaseItemToComponent = (dbItem: DatabaseItem): Item => {
    return {
        id: dbItem.id,
        name: dbItem.name,
        assignedTo: dbItem.assigned_to.name
    }
};