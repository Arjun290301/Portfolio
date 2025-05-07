import React from 'react'
import { useRef } from 'react';
import myImage from '../../assets/photo.jpeg'
import "./Home.css"
import DecryptedText from '../DecryptedText/DecryptedText'

const Home = () => {

    const containerRef = useRef(null);
    return <>
        <div className="hero">
            <div className="photo">
                <img className='pic' src={myImage} alt='MyImage'></img>
            </div>
            <div className="title">

                <div
                    ref={containerRef}
                    style={{ position: 'relative' }}
                >
                    <div className="title-text">Arjun S</div>
                    <DecryptedText
                        label={'Full-Stack Developer'}

                        className={'variable-proximity-demo'}
                        fromFontVariationSettings="'wght' 600, 'opsz' 9"
                        toFontVariationSettings="'wght' 1000, 'opsz' 40"
                        containerRef={containerRef}
                        radius={300}
                        falloff='linear'

                    />
                </div>
            </div>
        </div>


    </>
}

export default Home
