import React from 'react';
import { connect } from 'react-redux';

const SearchResult = (props) => {

    return(
        <div className="search-result-block">

            {
                props.search.map((item) => {
                    return(
                        <div dangerouslySetInnerHTML={{__html: item }}/>
                    );
                })
            }

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        search: state.searchReducer.search_result,
    };
};

export default connect(mapStateToProps, {})(SearchResult);