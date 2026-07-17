import css from './NoteList.module.css';
import type { Note } from '../../types/note';

interface NoteListProps {
    notes: Note[];
    onDelete: (id: string) => void;
}

export default function NoteList(props: NoteListProps) {
    return (
        <ul className={css.list}>
            {props.notes.map((note) => 
            {return (
                <li className={css.listItem} key={note.id}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                        <button className={css.button} onClick={() => props.onDelete(note.id)}>Delete</button>
                </div>
            </li>
            )}
            )}
            
        </ul>

    )
}