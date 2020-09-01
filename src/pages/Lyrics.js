import React, { Component } from 'react';

import Player from '../components/player/Player';
import SongText from '../components/song_text/SongText';
import SearchInput from '../components/search/SearchInput';
import SearchResult from '../components/search/SearchResult';

import './Lyrics.css';

class Lyrics extends Component{

    render(){

        return(
            <div className="Lyrics">
                <div className="Lyrics-content">
                    <div className="Lyrics-left">
                        <SongText/>
                    </div>
                    <div className="Lyrics-center">
                        <SearchInput/>
                        <SearchResult/>
                    </div>
                </div>
                <div className="Lyrics-bottom">
                    <Player/>
                </div>
            </div>
        );
    }
}

export default Lyrics;