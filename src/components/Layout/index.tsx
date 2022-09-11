import Nav from "../Nav";
import Footer from "../Footer";
const Layout = ( props: any ) => {
    return (
        <>
            <Nav/>
                {props.children}
            <Footer/>
        </> 
    );
}

export default Layout;