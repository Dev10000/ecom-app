/* eslint-disable radix */
import React from 'react';

interface IStarRatingProps {
    value: number;
}

const StarRating: React.FC<IStarRatingProps> = ({ value }): JSX.Element => {
    const getStars = () => {
        const stars = [];
        const [whole, part] = parseFloat(value.toString()).toString().split('.');
        for (let i = 0; i < parseInt(whole); i++) stars.push(100);
        if (part) stars.push(50);
        for (let i = parseInt(whole); i < (parseInt(part) ? 4 : 5); i++) stars.push(0);
        return stars;
    };
    return (
        <div className="w-full flex flex-row items-center">
            <div className="flex flex-row items-center">
                {getStars().map((val, idx) => (
                    <img
                        // eslint-disable-next-line react/no-array-index-key
                        key={`s-${idx}`}
                        className="w-4 h-4 m-0 -mr-1 p-0"
                        alt={`${val}`}
                        src={`../../../../assets/thumbnails/${val}.png`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StarRating;
