import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import key  from "../api/key.json";
import style from "./style.module.css"
const Home = () => {
    const apiKey = key.key2;
    const [news, setNews] = useState([]);
    const [country, setCountry] = useState("")
    const [category, setCategory] = useState("technology");
    const [pageSize, setPageSize] = useState(20);
    const [q, setQ] = useState("")

    const supporetedCountries = ["ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de","eg","fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt","lv","ma","mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs","ru","sa","se","sg","si","sk","th","tr","tw","ua","us","ve","za"]
    const supporetdCategories = ["business", "entertainment" , "health", "science", "sports", "technology"] 
    
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    
    useEffect( ()=> {
        //set country 
        if(country === ""){
            axios.get('https://ipapi.co/json/')
            .then((response) => {
                let data = response.data;
                setCountry(data.country_code);
            })
        }
        //set news
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
    }, [country, q, category, pageSize, apiKey]);

    // JSX Part 
    let articlesJSX = news.map((article, index) => {
        const {urlToImage, title, description} = article;
        return (
            <div key={index} className={style.articleCard}>
                <img src={urlToImage} alt="" />
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        )
    })
    //get flag emojy
    function getFlagEmoji(code) {
        const codePoints = code.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }
    let countriesSelectElement = 
        <select defaultValue ={country.toLowerCase()} 
            onChange={e => { setCategory(""); setCountry(e.target.value)}} name="country" id="country"
        >
            {supporetedCountries.map( (c, index)  => { 
                if(index === 4) return  <option key={index} value={c} > 
                   <p><i>{getFlagEmoji(c) }</i> {regionNames.of(c.toUpperCase())}</p>
                </option>
                else{
                    return <option key={index} value={c} > 
                        <p><i>{getFlagEmoji(c) }</i> {regionNames.of(c.toUpperCase())}</p>
                    </option>
                }    
            })}
        </select>
    
    let categoriesElement =
        <select name="" id="" value={category}  onChange={(e) => {setCategory(e.target.value) ; setCountry("") } }>
            {
                supporetdCategories.map( (cat, index) =>{
                    return <option value={cat} key={index}>
                        {cat}
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
                    {countriesSelectElement}
                    <p>Select category</p>
                    {categoriesElement}
                    <p>Number of results</p>
                    <input  value={pageSize} type="number" min={20} max={20} step="5"  onChange={(e) => setPageSize(e.target.value)}  />
                </div>
                <section className={style.grid}>
                    {articlesJSX}
                </section>
            </main>
        </Layout> 
    );
}

export default Home;