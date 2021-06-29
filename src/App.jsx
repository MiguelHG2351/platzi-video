import { hot } from 'react-hot-loader/root'
import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import Search from 'components/Search'
import Categories from 'components/Categories'
import Carousel from 'components/Carousel'
import CarouselItem from 'components/CarouselItem'
import Footer from 'components/Footer'

const App = () => {
    const [videos, setVideo] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/initalState')
            .then((response) => response.json())
            .then((data) => setVideo(data))
    }, [])

    console.log(videos)
    return (
        <div>
            <Header />
            <Search />
            {videos &&
                Object.keys(videos).map((keyValue, key) => {
                    return (
                        <Categories title={keyValue} key={key}>
                            <Carousel title={keyValue}>
                                {videos[keyValue].map((video, key) => (
                                    <CarouselItem
                                        key={key}
                                        title={video.title}
                                        year={video.year}
                                        contentRating={video.contentRating}
                                        duration={video.duration}
                                        cover={video.cover}
                                    />
                                ))}
                            </Carousel>
                        </Categories>
                    )
                })}
            <Footer />
        </div>
    )
}

export default hot(App)
