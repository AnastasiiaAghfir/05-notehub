import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { useState } from 'react';
import { fetchNotes } from '../../services/noteService';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { deleteNote } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
// import type { Note } from '../../types/note';

export default function App() {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data} = useQuery({
        queryKey: ['notes', query, currentPage],
        queryFn: () => fetchNotes(query, currentPage),
        placeholderData: keepPreviousData,
    })

 
    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);
    
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            })
        }
    })
    
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox
                    onSearch={(value) => {
                        setQuery(value);
                        setCurrentPage(1);
                    }} 
                />
                {data && data.totalPages > 0 && <Pagination totalPages={data.totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
                {/* Кнопка створення нотатки */}
                <button onClick={openModal} className={css.button}>Create note +</button>
                {isModalOpen && <Modal onClose={closeModal}>
                    <NoteForm onClose={ closeModal } /> </Modal>}
            </header>
            {data && data.notes.length > 0 && <NoteList notes={data.notes} onDelete={deleteMutation.mutate}  />}
        </div>
    )
}