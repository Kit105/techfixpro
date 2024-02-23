import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const NotesList = () => {
    useTitle('techFix Pro : Notes List')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

        content = (
            <div className="overflow-x-auto m-20">

                <table className="table table-zebra">
                    <thead className="table-zebra font-extrabold">
                        <tr>
                            <th scope="col" className="table__th note__status">Status</th>
                            <th scope="col" className="table__th note__created">Created</th>
                            <th scope="col" className="table__th note__updated">Updated</th>
                            <th scope="col" className="table__th note__title">Title</th>
                            <th scope="col" className="table__th note__username">Owner</th>
                            <th scope="col" className="table__th note__edit">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        )
    }

    return content
}
export default NotesList