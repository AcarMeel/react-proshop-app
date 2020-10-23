import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    // const productUpdate = useSelector((state) => state.productUpdate);
    // const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;

    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setDescription(product.description);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
        }
        
    }, [dispatch, productId, product, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    };

    return (
        <>
            <Link to={`/admin/productList`} className="btn btn-light my-3">Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {/* {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loadingUpdate && <Loader />} */}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Image">
                    <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            label="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Brand">
                    <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            label="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    
                    <Form.Group controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            label="countInStock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            label="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            label="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </>

    );
};

export default ProductEditScreen;
