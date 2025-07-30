export interface DatabaseItem {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    assigned_to: {
        id: string;
        name: string;
    };
    list_id: {
        id: string;
        name: string;
        display_name: string;
    };
}

export interface DatabaseUser {
    id: string;
    name: string;
}

export interface DatabaseList {
    id: string;
    name: string;
    display_name: string;
}