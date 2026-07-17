export interface Note {
    id: string;
    title: string;
    content: string;
    tag: 'Todo' | 'Personal' | 'Work' | 'Shopping' | 'Meeting';
    createdAt: string;
    updatedAt: string;
}