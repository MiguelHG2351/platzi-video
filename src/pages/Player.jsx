import React, { useState, useEffect } from 'react'
import { getVideoSource } from 'actions/index'
import { connect } from 'react-redux'
import 'assets/styles/pages/Player.scss'
import { Redirect } from 'react-router-dom'

const Player = (props) => {
    const [loading, setLoading] = useState({})
    const { id } = props.match.params

    useEffect(() => {
        props.getVideoSource(id)
    }, [])

    useEffect(() => {
        console.log(props.playing)
        setLoading(props.playing)
    }, props.playing)

    return (
        <>
            {loading === null && <Redirect to="/" />}
            {loading != null && Object.keys(loading).length > 0 && (
                <div className="Player">
                    <video controls autoPlay>
                        <source src={props.playing.source} type="video/mp4" />
                    </video>
                    <div className="Player-back">
                        <button onClick={() => props.history.goBack()}>
                            Regresar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        playing: state.playing,
    }
}
const mapDispathToProps = {
    getVideoSource,
}

export default connect(mapStateToProps, mapDispathToProps)(Player)
