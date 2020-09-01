import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../../store';

import {addMarkInText, addText, changeTime} from '../../store/actions/textActions';
import { setPlay } from '../../store/actions/playerActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class SongText extends Component{

    constructor(props){
        super(props);

        this.state = {
            rows: 3,
        };

        this.changeText = (e) => {
            const el = e.currentTarget;
            const text = el.value;
            const lines = text.split(/\n/);
            const count_lines = lines.length;
            //console.log(lines);
            this.setState({
                ...this.state,
                rows: (count_lines + 2),
            });
            props.addText(text);
        };

        this.selectTextarea = () => {
            const textTextarea = document.getElementById('textTextarea');
            textTextarea.focus();
        };

        this.changeItemTime = (e) => {
            const el = e.currentTarget;
            const times_list = Array.prototype.slice.call(el.parentNode.parentNode.childNodes);
            const time_item = el.parentNode;
            const index = times_list.indexOf(time_item);

            props.changeTime(index, el.value);
        };

        this.playPoint = (e) => {
            const el = e.currentTarget;
            const input = el.parentNode.querySelector('input');
            const arr_time = input.value.split(':');

            let time = 0;
            if(arr_time[0] === '00'){
                time = parseFloat(arr_time[1]);
            }else{
                time = ((parseFloat(arr_time[0]) * 60) + parseFloat(arr_time[1]));
            }
            //console.log(time);

            this.props.player.currentTime = time;
            store.dispatch(setPlay(true));
            this.props.player.play();
        };

    }

    render(){

        const { times_list, text } = this.props;
        const { rows } = this.state;

        return(
            <React.Fragment>
                <div className="times-list">
                    {
                        times_list.length > 0
                            ?
                            Object.keys(times_list).map((key) => {
                                return (
                                    <div key={ key } className="mark-time-item" data-time={ times_list[key] }>
                                        <span onClick={ this.playPoint }>
                                            <FontAwesomeIcon icon={ faPlay }/>
                                        </span>
                                        <input type="text" defaultValue={ times_list[key] } onChange={ this.changeItemTime }/>
                                    </div>
                                )
                            })
                            :
                            <span>временные маркеры</span>
                    }
                </div>
                <div className="text-block" onClick={ this.selectTextarea }>
                    <textarea id="textTextarea" rows={ rows } onChange={ this.changeText } value={ text } placeholder="Ведите текст песни, загрузите файл с песней и начните воспроизведение аудиофайла. Добавляйте временные маркеры в нужных местах"></textarea>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        times_list: state.timesReducer.times,
        text: state.textReducer.text,
        player: state.playerReducer.player,
        play: state.playerReducer.play,
    };
};

export default connect(mapStateToProps, { changeTime, addText, addMarkInText, setPlay })(SongText);