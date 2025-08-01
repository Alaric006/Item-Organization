import {supabase} from "../lib/supabase";
import { DatabaseItem, DatabaseUser, DatabaseList, Item } from "../types"

export const loadItems = async (): Promise<any> => {

    const {data, error} = await supabase.from('items').select(`
            id,
            name,
            created_at,
            updated_at,
            assigned_to:users!assigned_to(id, name),
            list_id:lists(id, name, display_name)
        `).order('created_at', {ascending: true});
    if (error) {
        console.error("Error loading items: ", error);
        throw error;
    }

    console.log(data);

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

export const addItem = async (itemName: string, assignedToUserId: string, listId: string): Promise<any> => {
const {data, error} = await supabase
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
return data?.[0];
}

export const removeItem = async (itemId: string): Promise<void> => {
    const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', itemId);

    if (error) {
        console.error("Error removing item: ", error);
        throw error;
    }
}

export const updateItemName = async (itemId: string, newName: string): Promise<any> => {
    const {data, error} = await supabase
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
    return data?.[0];
}

export const updateItemAssignedTo = async (itemId: string, newAssignedToId: string): Promise<any> => {
    const {data, error} = await supabase
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
    
    return data?.[0];
}

export const dateToSQLFormat = (date: Date) => {
    return date.toISOString().slice(0, 19).replace("T", " ")
}