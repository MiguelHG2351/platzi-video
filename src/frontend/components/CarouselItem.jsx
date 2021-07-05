import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFavorite, deleteFavorite } from 'actions/index'
import 'assets/styles/components/CarouselItem.scss'
import playIcon from 'assets/icons/play-icon.png'
import plusIcon from 'assets/icons/plus-icon.png'
import removeIcon from 'assets/icons/remove-icon.png'

const CarouselItem = (props) => {
    const { title, year, contentRating, duration, cover, id, isList } = props
    const handleSetFavorite = () => {
        props.setFavorite({
            title,
            year,
            contentRating,
            duration,
            cover,
            id,
        })
    }

    const handleDeleteFavorite = (id) => {
        props.deleteFavorite(id)
    }

    return (
        <div className="carousel-item">
            <img className="carousel-item__img" src={cover} alt={title} />
            <div className="carousel-item__details">
                <div>
                    <Link to={`/player/${id}`}>
                        <img
                            className="carousel-item__details--img"
                            src={playIcon}
                            alt="Play Icon"
                        />
                    </Link>
                    {isList ? (
                        <img
                            className="carousel-item__details--img"
                            alt="Remove Icon"
                            src={removeIcon}
                            onClick={() => handleDeleteFavorite(id)}
                        />
                    ) : (
                        <img
                            className="carousel-item__details--img"
                            src={plusIcon}
                            alt="Plus Icon"
                            onClick={handleSetFavorite}
                        />
                    )}
                </div>
                <p className="carousel-item__details--title">{title}</p>
                <p className="carousel-item__details--subtitle">
                    {year} {contentRating} {duration} minutos
                </p>
            </div>
        </div>
    )
}

CarouselItem.propTypes = {
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number,
    cover: PropTypes.string,
}

const mapDispatchToProps = {
    setFavorite,
    deleteFavorite,
}

export default connect(null, mapDispatchToProps)(CarouselItem)
