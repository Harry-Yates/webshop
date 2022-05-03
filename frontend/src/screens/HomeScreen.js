import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
    //useState is a hook, pass what we want to call the state "products" then the function "setProducts" which manipulates state
    const [products, setProducts] = useState([]);

    //useEffect makes a request to the backend, what we put in there, will run as soon as the component loads
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/api/products");
            //res has a data object assigned to it, here it is destructed.

            setProducts(data);
            //This is what was defined above to change state.
        };
        fetchProducts();
    }, []);
    //[] is a second argument to useeffect an Array of dependences. Anything you want to useEfect to fire of and make changes

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
