import React from 'react';
import { connect } from 'react-redux';

// actions
import { search } from '../../store/actions/searchActions';

const SearchInput = (props) => {

    const search = (e) => {
        const el = e.target;
        const text = el.value;
        if(text.length < 3){
            return true;
        }

        props.search(text);
    };


    return(
        <div className="search-text">
            <input type="text" placeholder="Введите текст даля поиска не короче 2-х символов" onKeyUp={ search }/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{};
};

export default connect(mapStateToProps, { search })(SearchInput);