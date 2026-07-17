import css from './SearchBox.module.css';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
    onSearch: (query: string) => void;}

export default function SearchBox({onSearch}: SearchBoxProps) {

    const handleChange = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => 
            onSearch(event.target.value),
        3000
    )
    return (
        <input
            onChange = {handleChange}
            className={css.input}
            type="text"
            placeholder="Search notes"
        />

    )
}