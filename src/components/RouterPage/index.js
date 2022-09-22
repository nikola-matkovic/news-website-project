import { Route, Routes } from "react-router-dom";
import Home from '../Home/index.js'
import Article from "../Article/index.jsx";
import Everything from "../Everything/index.js";

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/article" element={<Article/>} />
            <Route path="/Everything" element={<Everything/>} />
            <Route path="*" element={<p>  404 </p>} />
        </Routes>
    );
}

export default RouterPage;