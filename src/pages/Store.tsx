import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem.tsx";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function Store() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const filteredItems = useMemo(() => {
        const searchTerm = searchQuery.toLowerCase().trim();
        return storeItems.filter((item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    }, [searchQuery]);

    return (
        <>
            <h1 className="mt-lg-5">Store Page</h1>
            {searchQuery && (
                <h4 className="mb-4">Search results for: "{searchQuery}"</h4>
            )}

            {filteredItems.length === 0 ? (
                <div className="text-center mt-4">
                    <h3>No items found {searchQuery && `matching "${searchQuery}"`}</h3>
                </div>
            ) : (
                <Row xs={1} sm={1} md={2} lg={3} className="g-3">
                    {filteredItems.map((item) => (
                        <Col key={item.id}>
                            {/* Remove the Link wrapper here */}
                            <StoreItem {...item} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}