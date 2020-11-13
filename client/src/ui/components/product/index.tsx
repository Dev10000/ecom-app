import React from 'react';

type IProductProps = IProduct;

const Product: React.FC<IProductProps> = (props: IProduct): JSX.Element => {
    const { id, title } = props;
    // const [visibleButtons, setVisibleButtons] = useState(false);

    return (
        <div key={id} className="max-w-2xl bg-gray-300 rounded-md flex flex-col">
            <div className="flex items-center h-40 ">
                <span className="w-full text-center">Image here</span>
                <span className="w-full text-center">Options</span>
            </div>
            <div className="bg-white m-1 flex flex-1 flex-col">
                <div className="text-center text-lg text-blue-900 font-extrabold py-2 flex-1">{title}</div>
                <div className="text-center py-2 text-sm">Rating here</div>
                <div className="text-center py-2 space-x-2 flex-end">
                    <span className="font-extrabold text-blue-400">$299,43</span>
                    <span className="text-gray-700 line-through">$534,33</span>
                    <span className="font-bold text-red-500">24% Off</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
