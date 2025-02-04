import { useEffect, useState } from 'react';
import {
    Button,
    Container,
    Nav,
    Navbar as NavbarBs,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle,
    Form,
} from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useShoppingCart } from "../contexts/ShoppingCartContext.tsx";
import { ShoppingCart } from "./ShoppingCart.tsx";

export function Navbar() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialSearchText = searchParams.get('search') || '';
    const [searchText, setSearchText] = useState(initialSearchText);

    const {
        cartQuantity,
        isOpen,
        setIsOpen,
    } = useShoppingCart();

    useEffect(() => {
        setExpanded(false);
    }, [location]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);
        navigate(`/store?search=${searchValue}`);
    };

    const handleSearchIconClick = () => {
        navigate(`/store?search=${searchText}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            navigate(`/store?search=${searchText}`);
            setSearchText(''); // Clear the search input
        }
    };

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <NavbarBs
                sticky="top"
                bg="dark"
                data-bs-theme="dark"
                expand="lg"
                className="mb-4 shadow"
                expanded={expanded}
            >
                <Container>
                    <NavbarBrand as={NavLink} to="/" onClick={() => setExpanded(false)}>
                        <img
                            style={{ width: '65px', height: '50px' }}
                            src="/images/logo.jpg"
                            alt="Furniture Store"
                            className="d-inline-block align-top"
                        />
                    </NavbarBrand>

                    <div className="d-flex order-lg-2 ms-auto">
                        <Form className="me-2 d-none d-lg-flex" style={{ width: '300px' }}>
                            <Form.Control
                                placeholder="Search for item..."
                                size="sm"
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                onKeyPress={handleKeyPress}
                            />
                            <Button
                                variant='outline-secondary'
                                onClick={handleSearchIconClick}
                            >
                                <FaSearch />
                            </Button>
                        </Form>

                        <Button
                            variant="outline-primary"
                            className="rounded-circle me-2"
                            style={{ width: "3rem", height: "3rem", position: "relative" }}
                            onClick={() => setIsOpen(true)}
                        >
                            <BsFillCartCheckFill size='1.7rem' />
                            {cartQuantity > 0 && (
                                <div
                                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                    style={{
                                        color: "white",
                                        width: "1.5rem",
                                        height: "1.5rem",
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        transform: "translate(25%, 25%)",
                                    }}
                                >
                                    {cartQuantity}
                                </div>
                            )}
                        </Button>

                        <NavbarToggle
                            aria-controls="basic-navbar-nav"
                            onClick={handleToggle}
                        />
                    </div>

                    <NavbarCollapse id="basic-navbar-nav" className="order-lg-1" role={undefined}>
                        <Nav className="me-auto">
                            <Nav.Link to="/" as={NavLink} onClick={() => setExpanded(false)}>
                                Home
                            </Nav.Link>
                            <Nav.Link to="/blog" as={NavLink} onClick={() => setExpanded(false)}>
                                Blog
                            </Nav.Link>
                            <Nav.Link to="/gallery" as={NavLink} onClick={() => setExpanded(false)}>
                                Gallery
                            </Nav.Link>
                            <Nav.Link to="/store" as={NavLink} onClick={() => setExpanded(false)}>
                                Store
                            </Nav.Link>
                        </Nav>

                        <Form className="d-lg-none mt-2">
                            <Form.Control
                                placeholder="Search for item..."
                                size="sm"
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                onKeyPress={handleKeyPress}
                            />
                        </Form>
                    </NavbarCollapse>
                </Container>
            </NavbarBs>

            <ShoppingCart isOpen={isOpen} />
        </>
    );
}