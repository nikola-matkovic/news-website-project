import Nav from "../Nav";
import Footer from "../Footer";
const Layout = ( props ) => {

    let {q, setQ} = props
    return (
        <>
            <Nav q={q} setQ ={setQ}  />
                {props.children}
            <Footer/>
        </> 
    );
}

export default Layout;