import Layout from "../Layout";
import {useLocation} from 'react-router-dom';
import style from './style.module.css';

const Articel = () => {
    const location = useLocation();
    let article = location.state.article;
    let {author, content, description, publishedAt, source, title, url, urlToImage} = article;
    
    publishedAt = publishedAt.substring( 0, publishedAt.indexOf('T'))

    console.log(author, content, description, publishedAt, source, title, url, urlToImage);
    return (
        <Layout> 
            <article className={style.article}>
                <h2>{title}</h2>
                <img src={urlToImage} alt="articleImage" />
                <p>{content}</p>
                <a href={url}> Pročitaj više</a>

                <div className={style.info}> <span>{author} </span>  <span>{publishedAt} </span>  <span> {source.name} </span> </div>
            </article>
        </Layout>
    )
}

export default Articel;