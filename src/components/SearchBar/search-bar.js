import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// icons
import { ReactComponent as SearchIcon } from "../../static/icons/search.svg";
import { ReactComponent as ClearIcon } from "../../static/icons/clear.svg";

// actions
import { setKeyword, clearKeyword } from "./actions";

// styles
import "./search-bar.scss";

const mapStateToProps = state => ({
    keyword: state.keyword
});

const mapDispatchToProps = dispatch => ({
    updateKeyword: keyword => dispatch(setKeyword(keyword)),
    clearkeyword: () => dispatch(clearKeyword())
});

function SearchBar(props) {
    const { clearkeyword, keyword, updateKeyword } = props;

    let textInput = React.createRef();

    const handleChange = event => {
        updateKeyword(event.target.value);
    };
    const handleClearKeyword = event => {
        clearkeyword();
        textInput.current.focus();
    };
    const handleClickPlaceholder = event => {
        textInput.current.focus();
    }

    React.useEffect(() => {
        textInput.current.focus();
    }, []);

    return (
        <div className="search-bar">
            <div className="content">
                <div className="search-box">
                    <input
                        type="text"
                        value={keyword}
                        onChange={handleChange}
                        ref={textInput}
                    />
                    {!keyword && <PlaceHolder onClick={handleClickPlaceholder} />}
                    {keyword && <ClearKeyword onClick={handleClearKeyword} />}
                </div>
            </div>
        </div>
    );
}

const PlaceHolder = props => {
    const { onClick } = props;
    const handleOnClick = event => {
        onClick(event);
    }
    return (
        <span className="placeholder" onClick={handleOnClick}>
            <SearchIcon />
            搜尋
        </span>
    );
};

const ClearKeyword = props => {
    const { onClick } = props;
    const handleOnClick = event => {
        onClick(event);
    };
    return (
        <span className="clear-keyword" onClick={handleOnClick}>
            <ClearIcon />
        </span>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string,
    updateKeyword: PropTypes.func,
    clearKeyword: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);