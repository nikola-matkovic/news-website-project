import axios from "axios";
import { useState, useEffect, /*useContext*/ } from "react";
import Layout from "../Layout";
import key  from "./../api/key.json";
import style from "./style.module.css"

const Home = () => {
    const apiKey = key.key;
    const [news, setNews] = useState([]);
    const [country, setCountry] = useState("")
    const [category, setCategory] = useState("technology");
    const [q, setQ] = useState("");
    const [pageSize, setPageSize] = useState(20);
    useEffect( ()=> {
        if(country === ""){
            axios.get('https://ipapi.co/json/')
            .then((response) => {
                let data = response.data;
                setCountry(data.country_code);
            })
        }
        axios.get('https://newsapi.org/v2/top-headlines', {
            params:{
                apiKey,
                q,
                pageSize,
                country,
                category,
            }
        })
        .then((response)=>{
            setNews(response.data.articles)
            console.log(news);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [country]);

    let article = news[0];
    console.log(article);

    return (
        <Layout> 
            <section className={style.articleCard}>
                
            </section>
        </Layout> 
    );
}

export default Home;