import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate;

    useEffect(() => {
        dispatch({ type:  PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login');
        } 

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts())
        }
        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct ])

    const deleteHandler = (productId) => {
        dispatch(deleteProduct(productId))
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className="align-items-center">
                <Col><h1>Products</h1></Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}><i className="fas fa-plus"></i> Create Product</Button>
                </Col>
            </Row>
            
            {error && <Message variant='danger'>{error}</Message>}
            {(loading || loadingCreate || loadingDelete) && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}><i className="fas fa-trash"></i></Button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </Table>
        </>
    )
}

export default ProductListScreen