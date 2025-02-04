import {Button, Stack} from "react-bootstrap"
import {useShoppingCart} from "../contexts/ShoppingCartContext.tsx"
import storeItems from "../data/items.json"
import {formatCurrency} from "../utilities/formatCurrency.ts"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({id, quantity}: CartItemProps) {
    const {removeFromCart, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.image}
                style={{width: "125px", height: "75px", objectFit: "cover"}}
                alt={item.name}
            />
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{fontSize: ".65rem"}}>
              x{quantity}
            </span>
                    )}
                </div>
                <div className="text-muted" style={{fontSize: ".75rem"}}>
                    {formatCurrency(item.price)}
                </div>
                <div className="d-flex align-items-center" style={{gap: "0.5rem"}}>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => decreaseCartQuantity(id)}
                    >
                        -
                    </Button>
                    <span>{quantity}</span>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => increaseCartQuantity(id)}
                    >
                        +
                    </Button>
                </div>
            </div>

            <div> {formatCurrency(item.price * quantity)}</div>

            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}