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
        })
        .catch((error) => {
            console.log(error);
        })
    }, [country]);

    let articlesJSX = news.map((article, index) => {
        const {author, urlToImage, title, description} = article;
        console.log(description);
        return (
            <div key={index} className={style.articleCard}>
                <img src={urlToImage} alt="" />
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        )
    })
    return (
        <Layout>
            <section className={style.grid}>
                {articlesJSX}
            </section>
        </Layout> 
    );
}

export default Home;