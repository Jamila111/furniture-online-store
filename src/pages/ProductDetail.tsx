import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useShoppingCart } from "../contexts/ShoppingCartContext.tsx";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import { getRating } from "../utilities/getRating.ts";

type ProductDetailParams = {
    id: string;
};

export function ProductDetail() {
    const { id } = useParams<ProductDetailParams>();
    const navigate = useNavigate();
    const location = useLocation();
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    const previousSearch = location.state?.previousSearch || '';
    const item = storeItems.find(i => i.id === parseInt(id || '0'));

    if (!item) {
        return (
            <Container className="mt-lg-5">
                <h2>Product not found</h2>
                <Button
                    variant="primary"
                    onClick={() => navigate(previousSearch ? `/store?search=${previousSearch}` : '/store')}
                >
                    Back to Store
                </Button>
            </Container>
        );
    }

    const quantity = getItemQuantity(item.id);
    const rating = getRating(item.rating);

    return (
        <Container className="mt-lg-5 position-relative">
            <Button
                variant="outline-secondary"
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                }}
                onClick={() => navigate(previousSearch ? `/store?search=${previousSearch}` : '/store')}
            >
                &times;
            </Button>

            <Button
                variant="outline-primary"
                className="mb-4"
                onClick={() => navigate(previousSearch ? `/store?search=${previousSearch}` : '/store')}
            >
                Back to Store
            </Button>

            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img
                            variant="top"
                            src={item.image}
                            height="400px"
                            style={{ objectFit: "cover" }}
                        />
                    </Card>
                </Col>
                <Col md={6}>
                    <h1>{item.name}</h1>
                    <h2 className="text-muted mb-4">{formatCurrency(item.price)}</h2>
                    <p className="mb-4">{item.description}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <div className="d-flex align-items-center gap-2">
                        <strong>Rating:</strong>
                        <span className="d-flex align-items-center">
                            {rating} ⭐️
                            <span className="text-muted ms-2">
                                ({item.rating.length} {item.rating.length === 1 ? 'review' : 'reviews'})
                            </span>
                        </span>
                    </div>

                    <div className="mt-4">
                        {quantity === 0 ? (
                            <Button
                                className="w-100"
                                onClick={() => increaseCartQuantity(item.id)}
                            >
                                Add to Cart
                            </Button>
                        ) : (
                            <div className="d-flex align-items-center flex-column">
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                                    <span className="fs-3">{quantity} in cart</span>
                                    <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
