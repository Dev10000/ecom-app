import React, { useEffect, useState } from 'react';

type IProductProps = Partial<IProductModel>;

const Details: React.FC<IProductProps> = (props) => {
    const details = props;
    const [information, setInformation] = useState<string | undefined>(details.description);
    const [reviewCount, setReviewCount] = useState<number | undefined>(undefined);
    const [specs, setSpecs] = useState<IProductSpecs | undefined>(undefined);
    useEffect(() => {
        setInformation(details.description);
    }, [details]);

    const showDescription = () => {
        setInformation(details.description);
        setReviewCount(undefined);
        setSpecs(undefined);
    };
    const showSpecs = () => {
        setSpecs(details.specs);
        setInformation(undefined);
        setReviewCount(undefined);
    };
    const showReviews = () => {
        setReviewCount(details.reviews_count);
        setInformation(undefined);
        setSpecs(undefined);
    };
    return (
        <div className="flex flex-col mt-10 bg-gray-100 border rounded w-full h-64">
            <div className="flex flex-row items-center space-x-10 border-b-2 border-gray-200">
                <button
                    type="button"
                    onClick={showDescription}
                    className="border-b-2 px-4 py-4 hover:border-blue-500 hover:text-blue-400"
                >
                    Product information
                </button>
                <button
                    type="button"
                    onClick={showReviews}
                    className="border-b-2 m-0 px-2 py-4 hover:border-blue-500 hover:text-blue-400"
                >
                    Reviews
                </button>
                <button
                    type="button"
                    onClick={showSpecs}
                    className="border-b-2 m-0 px-2 py-4 hover:border-blue-500 hover:text-blue-400"
                >
                    Specifications
                </button>
            </div>
            <div className="w-3/4 mt-5 mx-4">
                {information ? <div>{information}</div> : ''}
                {reviewCount ? <div>Number of reviews: {reviewCount}</div> : ''}
                {specs ? (
                    <div className="w-full">
                        <div>Brand: {specs.Brand}</div>
                        <div>Color: {specs.Color}</div>
                        <div>Model: {specs.Model}</div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Details;
