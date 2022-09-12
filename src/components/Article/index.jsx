import Layout from "../Layout";
import {useLocation} from 'react-router-dom';

const Articel = () => {
    const location = useLocation();
    console.log(location);
    return (
        <Layout> 
            <div>test</div>
        </Layout>
    )
}

export default Articel;