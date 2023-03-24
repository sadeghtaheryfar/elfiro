import React, { useState } from 'react';
import { Slider } from 'antd';

const PriceRangeSlider = () => {
    const [priceRange, setPriceRange] = useState([0, 10]);

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    return (
        <div className='width-max' dir='rtl'>
            <div className='box-header-range-sidbar'>
                <span>از {priceRange[0]} تا  {priceRange[1]} میلیون تومان</span>
            </div>

            <Slider range defaultValue={priceRange} onChange={handlePriceRangeChange} min={0} max={10} step={1} />
        </div>
    );
};

export default PriceRangeSlider;
