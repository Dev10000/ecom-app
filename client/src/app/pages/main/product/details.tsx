import React, { useEffect, useState } from 'react';

type IProductProps = IProduct;

const Details: React.FC<IProductProps> = (props) => {
    const details = props;
    const [information, setInformation] = useState<string | undefined>(details.description);
    const [reviewCount, setReviewCount] = useState<number | undefined>(undefined);
    const [specifics, setSpecifics] = useState<IProductSpecs | undefined>(undefined);
    useEffect(() => {
        setInformation(details.description);
    }, [details]);

    const showDescription = () => {
        setInformation(details.description);
        setReviewCount(undefined);
        setSpecifics(undefined);
    };
    const showSpecs = () => {
        setSpecifics(details.specs?.find((spec) => spec.product_id === details.product_id));
        setInformation(undefined);
        setReviewCount(undefined);
    };
    const showReviews = () => {
        setReviewCount(details.reviews_count);
        setInformation(undefined);
        setSpecifics(undefined);
    };
    return (
        <div className="flex flex-col mt-10 bg-gray-100 border rounded w-full sm:h-80 h-96 ">
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
                {specifics ? (
                    <div className="w-full">
                        {specifics.specs.Brand ? <div>Brand: {specifics.specs.Brand}</div> : ''}
                        {specifics.specs.Color ? <div>Color: {specifics.specs.Color}</div> : ''}
                        {specifics.specs.Model ? <div>Model: {specifics.specs.Model}</div> : ''}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Details;
