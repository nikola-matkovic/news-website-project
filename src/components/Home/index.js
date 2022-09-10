import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Layout from "../Layout";
import key  from "../api/key.json";
import style from "./style.module.css"
import { MyContext } from "../../App";


const Home = () => {
    let context = useContext(MyContext);
    let {q, setQ} = context
    const apiKey = key.key;
    const [news, setNews] = useState([]);
    const [country, setCountry] = useState("")
    const [category, setCategory] = useState("technology");
    const [pageSize, setPageSize] = useState(20);
    const supporetdCountries = ["ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de","eg","fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt","lv","ma","mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs","ru","sa","se","sg","si","sk","th","tr","tw","ua","us","ve","za"]
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
    }, [country]);

    // JSX Part 
    let articlesJSX = news.map((article, index) => {
        const {author, urlToImage, title, description} = article;
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
            onChange={e => setCountry(e.target.value)} name="country" id="country"
        >
            {supporetdCountries.map( (c, index)  => { 
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
        
    return (
        <Layout>
            <main>
                <input type="checkbox" name="check" id="check" className={style.check}/>
                <div id="filters" className={style.filters}>
                    <p>Select country</p>
                    {countriesSelectElement}
                    <p>Select category</p>
                </div>
                <section className={style.grid}>
                    {articlesJSX}
                </section>
            </main>
        </Layout> 

    );
}

export default Home;