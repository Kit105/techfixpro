import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "alert alert-error" : "offscreen"
    const validTitleClass = !title ? "input-error" : ''
    const validTextClass = !text ? "input-error" : ''

    const content = (
        <>
            <div className="w-4/5 justify-center m-auto p-auto">

                <p className={errClass}>{error?.data?.message}</p>

                <form className="form-control" onSubmit={onSaveNoteClicked}>

                    <label className="form-control" htmlFor="title">
                        <div className="label">

                            <span className="label-text">Title:</span>
                        </div>

                        <input
                            className={`input input-bordered w-full ${validTitleClass}`}
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />
                    </label>

                    <label className="form-control" htmlFor="text">
                        <div className="label">

                            <span className="label-text">Text:</span>
                        </div>
                        <textarea
                            className={`textarea textarea-bordered w-full ${validTextClass}`}
                            id="text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                        />
                    </label>
                    <label className="form-control" htmlFor="username">
                    <div className="label">

<span className="label-text">Assigned to:</span>
</div>
                    <select
                        id="username"
                        name="username"
                        className="select select-bordered"
                        value={userId}
                        onChange={onUserIdChanged}
                    >
                        {options}
                    </select>
                    </label>
                    <div className="form-control flex flex-row justify-start align-middle my-4">
                        <div className="form__action-buttons">
                            <button
                                className="btn btn-success text-2xl"
                                title="Save"
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} /> Save
                            </button>
                        </div>
                    </div>

                </form>
            </div>

        </>
    )

    return content
}

export default NewNoteForm