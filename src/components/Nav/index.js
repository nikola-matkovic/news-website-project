import style from './style.module.css'
import { Link } from 'react-router-dom';


const Nav = (props) => {
    let {q, setQ} = props
    return (
        <nav className={style.nav}>
            <label htmlFor="check">
                <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="30" height="30"viewBox="0 0 30 30" ><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path></svg>
            </label>
            <div className="logo">NEWS-API/ANONYMOUSVEGAN</div>
            <div className="right">
                <Link to="/"> News</Link>   
                <Link to="/everything">Everything</Link>   
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)}  placeholder="Search News" />
            </div>
        </nav> 
    );
}

export default Nav;