import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"


const EditNoteForm = ({ note, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "alert alert-error" : "offscreen"
    const validTitleClass = !title ? "input-error" : ''
    const validTextClass = !text ? "input-error" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="btn btn-error btn-outline text-2xl mx-2"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} /> Delete
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="w-4/5 justify-center m-auto p-auto grid grid-flow-row grid-rows-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1" onSubmit={e => e.preventDefault()}>
                <div className="w-full flex justify-between">
                    <h5 className="text-4xl">Edit Note #{note.ticket}</h5>
                    <div className="flex flex-row justify-center align-bottom">
                        <button
                            className="btn btn-success text-2xl mx-2"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form-control w-full" htmlFor="note-title">
                    <div className="label">
                        <span className="label-text">Title: </span>
                    </div>
                    <input
                        className={`input input-bordered w-full ${validTitleClass}`}
                        id="note-title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </label>

                <label className="form-control w-full" htmlFor="note-text">
                    <div className="label">
                        <span className="label-text">Text: </span>
                    </div>
                    <textarea
                        className={`input input-bordered w-full ${validTextClass}`}
                        id="note-text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                    />
                </label>
                <div className="form-control">
                    <div className="form-control">
                        <label className="label cursor-pointer" htmlFor="note-username">
                            Assigned to:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="select select-bordered"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                        <label className="label cursor-pointer flex flex-row justify-start" htmlFor="note-completed">
                            <span className="label-text">Completed:</span>
                            <input
                                className="checkbox checkbox-primary mx-3"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal shadow my-5">
                        <p className="stat">Created:<br />{created}</p>
                        <p className="stat">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditNoteForm