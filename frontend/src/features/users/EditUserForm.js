import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "alert alert-error" : "offscreen"
    const validUserClass = !validUsername ? 'input-error' : ''
    const validPwdClass = password && !validPassword ? 'input-error' : ''
    const validRolesClass = !Boolean(roles.length) ? 'input-error' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form-control w-4/5 justify-center m-auto p-auto mb-5" onSubmit={e => e.preventDefault()}>
                <div className="w-full flex justify-between">
                    <h2 className="text-4xl">Edit User</h2>
                    <div className="flex flex-row justify-center align-bottom">
                        <button
                            className="btn btn-success text-2xl mx-2"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        <button
                            className="btn btn-error btn-outline text-2xl mx-2"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} /> Delete
                        </button>
                    </div>
                </div>
                <label className="form-control w-full my-3" htmlFor="username">
                    <div className="label">
                        <span className="label-text">Username: <span className="badge badge-neutral">[3-20 letters]</span></span>
                    </div>
                    <input
                        className={`input input-bordered w-full ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />
                </label>
                <label className="form-control w-full my-3" htmlFor="password">
                    <div className="label">

                        <span className="label-text">Password:<span className="badge badge-neutral">[4-12 chars incl. !@#$%]</span>
                        </span>
                    </div>
                    <input
                        className={`input input-bordered w-full ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />

                </label>

                <label className="form-control w-full my-3" htmlFor="roles">
                    Assigned Roles:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`select select-bordered select-lg py-2 ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

                <label className="form-control w-full my-3" htmlFor="user-active">
                    <div className="label">
                        <span className="label-text">Active:</span>
                    </div>
                    <input
                        className="checkbox checkbox-primary"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>
            </form>
        </>
    )

    return content
}
export default EditUserForm