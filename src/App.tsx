import {Navbar} from "./components/Navbar.tsx";
import {Container} from "react-bootstrap";
import {Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Blog} from "./pages/Blog.tsx";
import {Gallery} from "./pages/Gallery.tsx";
import {Store} from "./pages/Store.tsx";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.tsx";
import { ProductDetail } from "./pages/ProductDetail.tsx";



function App() {

    return (
        <ShoppingCartProvider>
            <Navbar/>

            <Container className="mb-3">

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/store" element={<Store/>}/>
                    <Route path="/store/product/:id" element={<ProductDetail/>}/>
                </Routes>

            </Container>
        </ShoppingCartProvider>
    );
}

export default App;
