import React from 'react'
import { connect } from 'react-redux'
import Search from 'components/Search'
import Categories from 'components/Categories'
import Carousel from 'components/Carousel'
import CarouselItem from 'components/CarouselItem'

const Home = ({ myList, trends, originals }) => {
    return (
        <div>
            <Search />
            {
                <Categories title="Mi lista">
                    <Carousel>
                        {myList.length > 0 &&
                            myList.map((item, key) => (
                                <CarouselItem key={key} {...item} isList />
                            ))}
                    </Carousel>
                </Categories>
            }
            {
                <Categories title="Tendencias">
                    <Carousel>
                        {trends.length > 0 &&
                            trends.map((item, key) => (
                                <CarouselItem key={key} {...item} />
                            ))}
                    </Carousel>
                </Categories>
            }
            {
                <Categories title="Originales de Platzi">
                    <Carousel>
                        {originals.length > 0 &&
                            originals.map((item, key) => (
                                <CarouselItem key={key} {...item} />
                            ))}
                    </Carousel>
                </Categories>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        myList: state.myList,
        trends: state.trends,
        originals: state.originals,
    }
}

export default connect(mapStateToProps, null)(Home)
