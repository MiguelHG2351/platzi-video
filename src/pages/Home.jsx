import React from 'react'
import Search from 'components/Search'
import Categories from 'components/Categories'
import Carousel from 'components/Carousel'
import CarouselItem from 'components/CarouselItem'
import useInitialState from 'hooks/useInitialState'

const Home = () => {
    const videos = useInitialState('http://localhost:3001/initalState')

    console.log(videos)
    return (
        <div>
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
        </div>
    )
}

export default Home
