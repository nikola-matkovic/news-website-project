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
    const supporetdCountries = ["ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de","eg","fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt","lv","ma","mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs","ru","sa","se","sg","si","sk","th","tr","tw","ua","us","ve","za"]
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
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
    function getFlagEmoji(code:string) {
        const codePoints = code.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }
    let countriesSelectElement = 
        <select name="country" id="country">
            {supporetdCountries.map( (country)  => 
                <option value={country}> 
                   <p><i>{getFlagEmoji(country)}</i> {regionNames.of(country.toUpperCase())}</p>
                </option>)
            }
        </select>
    return (
        <Layout>
            <main>
                <div className={style.filters}>
                    <p>Select country</p>
                        {countriesSelectElement}
                </div>
                <section className={style.grid}>
                    {articlesJSX}
                </section>
            </main>
        </Layout> 

    );
}

export default Home;