export interface Session {
    logged_in: boolean;
    user?: number;
    error?: string;
}

export interface Todo {
    id: number;
    title: string;
    tags: string[];
    done: boolean;
    deadline: string;
    created_at: string;
}

export interface TagObject {
    value: string;
    label: string;
}