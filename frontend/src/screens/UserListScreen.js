import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList;
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])

    const deleteHandler = (userId) => {

    }

    return (
        <>
            <h1>Users</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? (
                                <i className="fas fa-check" style={{ color: 'green'}}></i>
                            ) : (
                                <i className="fas fa-times" style={{ color: 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}><i className="fas fa-trash"></i></Button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </Table>
        </>
    )
}

export default UserListScreen
