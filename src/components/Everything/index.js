import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import key  from "../api/key.json";
import style from "./style.module.css"
const Everything = () => {
    const apiKey = key.key2;
    const [news, setNews] = useState([]);
    const [lang, setLang] = useState("")
    const [pageSize, setPageSize] = useState(20);
    const [q, setQ] = useState("")
    const [fromdate, setFromdate] = useState("");
    const [todate, setTodate] = useState("");
    const [SortBy, setSortBy] = useState("publishedAt");

    const suporetedSorts = ["relevancy", "popularity", "publishedAt" ]
    const supporetedLangs = ["", "ar","de","en","es","fr","he","it","nl","no","pt","ru","sv","ud","zh"]
    const namesoflangs = ["arabic", "german", "english", "French", "Hebrew", "Italian", "Dutch","Norwegian", "Portuguese","Russian","Swedish","Chinese" ]

    
    useEffect( ()=> {
        //set news
        axios.get('https://newsapi.org/v2/everything', {
            params:{
                apiKey,
                q,
                fromdate, 
                todate, 
                lang,
                pageSize,
                SortBy,
            }
        })
        .then((response)=>{
            setNews(response.data.articles)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [q, pageSize, apiKey, fromdate]);

    // JSX Part 
    let articlesJSX = news.map((article, index) => {
        const {url, urlToImage, title, description} = article;
        console.log(url);
        return (
            <div key={index} className={style.articleCard}>
                <img src={urlToImage} alt="" />
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        )
    })
    let langsElement = 
        <select defaultValue ={lang} 
            onChange={e => { setLang(e.target.value)}} name="lang" id="lang"
        >
            {supporetedLangs.map( (l, index)  => { 
                return <option key={index} value={l} > 
                    <p>{namesoflangs[index]}</p>
                </option>
                }   
            )}
        </select>
    let sortsElement =
        <select name="sorts" id="sorts" value={SortBy}  onChange={(e) => {setSortBy(e.target.value)}}>
            {
                suporetedSorts.map( (s, index) =>{
                    return <option value={s} key={index}>
                        {s}
                    </option>
                })
            }
        </select>
    return (
        <Layout  q = {q} setQ={setQ}>
            <main>
                <input type="checkbox" name="check" id="check" className={style.check}/>
                <div id="filters" className={style.filters}>
                    <p>Select country</p>
                    {langsElement}
                    <p>Select category</p>
                    {sortsElement}
                    <p>Number of results</p>
                    <input  value={pageSize} type="number" min={20} max={20} step="5"  onChange={(e) => setPageSize(e.target.value)}  />
                    <p>from:</p>
                    <input type="date" name="from" id="from" />
                    <p>to:</p>
                    <input type="date" name="to" id="to" />
                </div>
                <section className={style.grid}>
                    {articlesJSX}
                </section>
            </main>
        </Layout> 
    );
}

export default Everything;