import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Layout from "../Layout";
import key  from "./../api/key.json";

const Home = () => {
    const [news, setNews] = useState([]);

    useEffect( ()=> {
        axios.get('https://newsapi.org/v2/top-headlines',{
            params:{
                q:"name",
                sortBy:"filter",
                pageSize:"page",
                from:"fromDate",
                to:"toDate",
                apiKey:key.key
            }
           }).then((response)=>{
            setNews(response.data.articles)
           })
    }, [])

    return (
        <Layout>
            {console.log(news)}
        </Layout> 
    );
}

export default Home;