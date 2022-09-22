import style from './style.module.css';

const Footer = () => {
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return (
        <footer className={style.footer}>
            ©️ <a href ="https://github.com/anonymousvegan"> github.com / anonymousvegan </a> {`${d}-${m}-${y}`}
        </footer> 
    );
}
export default Footer;