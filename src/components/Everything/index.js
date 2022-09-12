import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import key  from "../api/key.json";
import style from "./style.module.css"
const Everything = () => {
    
    var d = new Date();
    d = d.toISOString().split('T')[0]
    const apiKey = key.key;
    const [news, setNews] = useState([]);
    const [language, setLanguage] = useState("")
    const [pageSize, setPageSize] = useState(20);
    const [q, setQ] = useState("")
    const [fromdate, setFromdate] = useState(d)
    const [todate, setTodate] = useState(d);
    const [sortBy, setSortBy] = useState("publishedAt");

    const suporetedSorts = ["relevancy", "popularity", "publishedAt" ]
    const supporetedLangs = ["", "ar","de","en","es","fr","he","it","nl","no","pt","ru","sv","zh"]
    const namesoflangs = ["all", "arabic", "german", "english","spanish",  "French", "Hebrew", "Italian", "Dutch","Norwegian", "Portuguese","Russian","Swedish","Chinese" ]
    
    useEffect( ()=> {
        //set news
        if(q !==""){
            axios.get('https://newsapi.org/v2/everything', {
            params:{
                apiKey,
                q,
                from : fromdate, 
                to : todate, 
                language,
                pageSize,
                sortBy,
            }
        })
        .then((response)=>{
            console.log(response);
            setNews(response.data.articles)
        })
        .catch((error) => {
            console.log(error);
        })
        }
    }, [q, pageSize, apiKey, fromdate, todate, sortBy, language ]);

    // JSX Part 
    let articlesJSX = news.map((article, index) => {
        const {url, urlToImage, title, description} = article;
        return (
            <div key={index} className={style.articleCard}>
                <img src={urlToImage} alt="" />
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        )
    })
    let langsElement = 
        <select defaultValue ={language} 
            onChange={e => { setLanguage(e.target.value)}} name="language" id="language"
        >
            {supporetedLangs.map( (l, index)  => { 
                return <option key={index} value={l} > 
                    <p>{namesoflangs[index]}</p>
                </option>
                }   
            )}
        </select>
    let sortsElement =
        <select name="sorts" id="sorts" value={sortBy}  onChange={(e) => {setSortBy(e.target.value)}}>
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
            {q === "" && <div className={style.search}>Morate uneti pojam za pretragu</div>} 
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
                    <input type="date" name="from" id="from" value={fromdate} onChange={(e)=> setFromdate(e.target.value)} />
                    <p>to:</p>
                    <input type="date" name="to" id="to" value={todate} onChange={(e)=> setTodate(e.target.value)} />
                    
                </div>
                <section className={style.grid}>
                    {articlesJSX}
                </section>
            </main>
        </Layout> 
    );
}

export default Everything;