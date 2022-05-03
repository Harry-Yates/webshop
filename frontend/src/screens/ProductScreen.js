import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = props => {
    // Grab id param from url
    const { id } = useParams();
    // If props is not an empty object, spread props in product - else set product to empty object
    const [product, setProduct] = useState(
        Object.entries(props).length !== 0 ? { ...props } : {},
    );

    //TODO Not Working :(
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5050/api/products/${id}`);
                console.log("Fetched product");
                return await response.json();
            } catch (err) {
                console.log(err);
                console.log("Product couldn't be found.");
            }
        };

        // If product is empty, fetch product from API
        if (Object.entries(product).length === 0) {
            getProduct().then(data => {
                // Update product with fetched data
                setProduct(data);
            });
        }
    }, [id, product]);

    console.log(product);
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup varient='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroupItem>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup varient='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>
                                            {product.countInStock > 0
                                                ? "in Stock"
                                                : "Out of Stock"}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
