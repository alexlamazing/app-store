import React from "react";

// styles
import "./star.scss";

const Star = ({ selected = false, onClick = f => f }) => (
    <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars, numOfSelectedStars }) => {
    const [starsSelected, selectStar] = React.useState(numOfSelectedStars || 0);
    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={i < starsSelected}
                    onClick={() => selectStar(i + 1)}
                />
            ))}
        </div>
    );
};

export default StarRating;