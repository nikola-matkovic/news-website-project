import Layout from "../Layout";
import axios from "axios";
import { Readability }  from '@mozilla/readability';
// import ReactJSDOM from 'react-jsdom'
import { useEffect } from "react";

const Articel = () => {
    useEffect(() => {
        axios.get("https://smartlife.mondo.rs/tech/uredjaji/a51519/Huawei-nova-10-Pro-cena-specifikacije-i-prodaja.html")
        .then( (r2) => {
            let dom = r2.data 
            console.log(dom);
            let article = new Readability(dom.window.document).parse();
            console.log(article.textContent);
        })
    }, []);
   
    return (
        <Layout>
            <div>
                test
            </div>
        </Layout> 
    );
}

export default Articel;