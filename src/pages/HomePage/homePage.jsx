import { Carousel } from 'antd';
import Header from '../../components/Header/header';

const HomePage = () => {
    const contentStyle = {
        height: '100vh',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        width: '100%'
    };
    return (<>
        <Header></Header>
        <Carousel autoplay>
            <div>
                <img style={contentStyle} src="https://levents.asia/wp-content/uploads/IMG_0879.jpeg-1-1200x988.jpg" alt="" />

            </div>
            <div>
                <img src="https://levents.asia/wp-content/uploads/elementor/thumbs/homepage-ngang-4-1-scaled-prlzs731tmqluu3qoxoodpyzvmm53nywlrfokljhu8.jpg" style={contentStyle}></img>
            </div>
            <div>
                <img src="https://levents.asia/wp-content/uploads/elementor/thumbs/homepage-ngang-2-1-scaled-prlzqw34bwy9qc00bddbx1ty6d1sessbratekrh6hc.jpg" style={contentStyle}></img>
            </div>

        </Carousel>
    </>)

}

export default HomePage;