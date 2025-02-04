import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import { useShoppingCart } from "../contexts/ShoppingCartContext.tsx";
import { Link } from "react-router-dom";

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
};

export function StoreItem({ id, name, price, image, description, category }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();
    const quantity = getItemQuantity(id);

    return (
        <Card
            className="text-center h-100"
            border="primary"
            style={{ width: "18rem" }}
        >
            {/* Wrap only the image with the Link */}
            <Link to={`/store/product/${id}`}>
                <Card.Img
                    variant="top"
                    src={image}
                    height="180px"
                    className="mb-2"
                    style={{ objectFit: "cover", cursor: "pointer" }} // Add cursor pointer for better UX
                />
            </Link>

            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
                    <span className="ms-3 fw-bold">{name}</span>
                    <span className="ms-2 text-bg-danger">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mb-2">
                    <span className="badge bg-secondary me-4">{category}</span>
                </div>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
                            Add To Cart
                        </Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: ".5rem" }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: ".5rem" }}
                            >
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-5">{quantity}</span> in cart
                                </div>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button
                                onClick={() => removeFromCart(id)}
                                variant="danger"
                                size="sm"
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}