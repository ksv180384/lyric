import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import store from '../../store';

import { addTime } from '../../store/actions/timesActions';
import { addMarkInText } from '../../store/actions/textActions';
import { initPlayer, setPlay } from '../../store/actions/playerActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faUpload, faPause, faVolumeUp, faThumbtack } from '@fortawesome/free-solid-svg-icons';

class Player extends Component{

    constructor(props){
        super(props);

        this.time_interval = null;

        this.state = {
            upload_file: false,
            time_track: null,
        };

        this.openFile = () => {
            if(this.state.audio){
                this.stop();
            }
            const input = document.getElementById('openFile');
            input.click();
        };

        this.uploadFile = (e) => {

            if(typeof e.target.files[0] === 'undefined'){
                return true;
            }
            const file_type =  e.target.files[0].type;
            if (file_type.indexOf('audio') !== -1){
                this.audioFileInit(e.target.files[0]);
            }
        };

        this.audioFileInit = (file) => {
            const sound = URL.createObjectURL(file);
            const audio = new Audio(sound);

            audio.onloadedmetadata = (event) => {
                const time_track = moment(audio.currentTime*1000).format('mm:ss') + ' / ' + moment(audio.duration*1000).format('mm:ss');
                this.props.initPlayer(audio);
                this.setState({
                    ...this.state,
                    upload_file: true,
                    time_track: time_track,
                });
            };


        };

        this.play = (e) => {
            if(!this.props.player){
                return true;
            }
            if(this.props.play){
                store.dispatch(setPlay(false));
                this.props.player.pause();
                clearTimeout(this.time_interval);
            }else{
                store.dispatch(setPlay(true));
                this.props.player.play();
            }

            const vTime = document.getElementById('vTime');
            //const timeInfo = document.getElementById('timeInfo');
            this.time_interval = setInterval(() => {
                const time_percent = parseFloat(this.props.player.currentTime) / (parseFloat(this.props.player.duration)/100);
                vTime.style.width = time_percent + '%';

                const time_track = moment(this.props.player.currentTime*1000).format('mm:ss') + ' / ' + moment(this.props.player.duration*1000).format('mm:ss');
                this.setState({
                    ...this.state,
                    time_track: time_track,
                });
            }, 30);
        };

        this.stop = () => {
            if(this.state.audio){
                store.dispatch(setPlay(false));
                this.props.player.pause();
                this.props.player.currentTime = 0;
                clearTimeout(this.time_interval);
            }
        };

        this.clickTime = (e) => {
            if(!this.props.player){
                return true;
            }
            const el = e.currentTarget;
            const width_full = window.getComputedStyle(el).width;

            const x_click = e.clientX;
            const width_percent = parseFloat(x_click) / (parseFloat(width_full)/100);
            this.props.player.currentTime = width_percent * (parseFloat(this.props.player.duration)/100);


            const time_track = moment(this.props.player.currentTime*1000).format('mm:ss') + ' / ' + moment(this.props.player.duration*1000).format('mm:ss');
            this.setState({
                ...this.state,
                time_track: time_track,
            });
        };

        this.markTime = (e) => {
            if(!this.props.player){
                return true;
            }
            const mark_time = moment(this.props.player.currentTime*1000).format('mm:ss.SS');
            this.props.addTime(mark_time);

            const index = this.props.times.length;
            //console.log(index);
            //console.log(this.props.text[index]);

            this.props.addMarkInText(index, mark_time);

        }
    }

    render(){

        const { time_track } = this.state;
        const { play } = this.props;

        return(
            <React.Fragment>
                <div className="player-control-panel">
                    <ul>
                        <li className={ play ? 'pause-state' : 'play-state'} onClick={ this.play }>
                            <span className="play-btn">
                                <FontAwesomeIcon icon={ faPlay }/>
                            </span>
                            <span className="pause-btn">
                                <FontAwesomeIcon icon={ faPause }/>
                            </span>
                        </li>
                        <li onClick={ this.stop }>
                            <FontAwesomeIcon icon={ faStop }/>
                        </li>
                        <li onClick={ this.openFile }>
                            <FontAwesomeIcon icon={ faUpload }/>
                        </li>
                        <li className="ml-30" onClick={ this.markTime } title="Добавить временной маркер">
                            <FontAwesomeIcon icon={ faThumbtack }/>
                        </li>
                    </ul>
                    <input id="openFile" className="hidden" onChange={ this.uploadFile } type="file" accept="audio/mpeg, audio/ogg, audio/wav"/>

                    <span id="timeInfo" className="time-info">{ time_track }</span>
                </div>
                <div className="player-info-panel" onClick={ this.clickTime }>
                    <div className="visual-time" id="vTime">

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        times: state.timesReducer.times,
        text: state.textReducer.text,
        player: state.playerReducer.player,
        play: state.playerReducer.play,
    }
};

export default connect(mapStateToProps, { addTime, addMarkInText, initPlayer, setPlay })(Player);