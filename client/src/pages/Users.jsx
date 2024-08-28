import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";
const { VITE_BACKEND_URL } = import.meta.env;

// All users page for Admin
function Users() {
    const store = useContext(contextStore);
    const { userId, userType } = store.userStore.userData;
    const [users, usersDispatch] = useReducer(useStateReducer, []);
    const [error, errorDispatch] = useReducer(useStateReducer, "");
    const { token, getToken } = store.tokenStore;
    async function getUsers() {
        try {
            const response = await axios.post(
                `${VITE_BACKEND_URL}/getusers`,
                {
                    userId,
                    userType
                },
                {
                    headers: { 'Authorization': `JWT ${token}` }
                }
            )
            if (response.status === 201) {
                if (Object.values(response.data)[0].length) {
                    usersDispatch(Object.values(response.data)[0])
                }
                else {
                    errorDispatch("No users found.")
                }
            }
        }
        catch (error) {
            if (Object.values(error.response.data)[0]) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    useEffect(
        () => {
            if (userType === "admin") {
                getUsers()
            }
            getToken()
        }, []
    )

    return (
        <>
            {
                error
                    ?
                    <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" textClass={"fs-3"} />
                    :
                    users.length
                        ?
                        <Container className="py-4">
                            <Table >
                                <thead>
                                    <tr className="border-0 border-bottom border-2">
                                        <th>User ID</th>
                                        <th className="d-none d-lg-table-cell">Name</th>
                                        <th className="d-none d-sm-table-cell">Email</th>
                                        <th className="d-none d-md-table-cell">Phone</th>
                                        <th className="d-none d-md-table-cell">Status</th>
                                        <th className="d-none d-lg-table-cell">User Type</th>
                                        <th className="text-end">ACTIONS</th>
                                    </tr>
                                </thead >
                                <tbody>
                                    {
                                        users.map(
                                            ({ userId, userType, firstName, lastName, email, phone, isActive }, index) => {
                                                let userStatus = "Inactive";
                                                if (isActive) {
                                                    userStatus = "Active";
                                                }
                                                return (
                                                    <tr key={index}>
                                                        <td className="d-none d-sm-table-cell">{userId}</td>
                                                        <td className="w-100 d-sm-none" style={{ maxWidth: "210px" }}><p className="text-truncate">{userId}</p></td>
                                                        <td className="d-none d-lg-table-cell">{`${firstName}  ${lastName}`}</td>
                                                        <td className="d-none d-sm-table-cell">{email}</td>
                                                        <td className="d-none d-md-table-cell">{phone}</td>
                                                        <td className="d-none d-md-table-cell">{userStatus}</td>
                                                        <td className="d-none d-lg-table-cell">{userType}</td>
                                                        <td className="text-end"><Link to={`/profile/${userId}`} className="border-bottom btn btn-light border-0" key={index}>Edit</Link></td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Container >
                        :
                        <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
            }
        </>
    )
}

export default Users;