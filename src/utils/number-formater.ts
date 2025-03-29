const toDollar = (val: number): string => {

    if(val === undefined || val === null)
        return "";

    if(val === 0)
        return "$ 0.00";

    if(val < 0)
        return `-$ ${Math.abs(val).toFixed(2)}`;

    return `$ ${val.toFixed(2)}`;
};

const toPercent = (val: number): string => {

    if(val === undefined || val === null)
        return "";

    if(val === 0)
        return "0.00%";

    if(val < 0)
        return `- ${Math.abs(val * 100).toFixed(2)}%`;

    return `${(val * 100).toFixed(2)}%`;
};

const toShortNumber = (val: number): string => {

    if (val === undefined || val === null)
        return "";

    if (val >= 1000000000000)
        return `${(val / 1000000000000).toFixed(2)}T`;

    if (val >= 1000000000)
        return `${(val / 1000000000).toFixed(2)}B`;

    if (val >= 1000000)
        return `${(val / 1000000).toFixed(2)}M`;

    if (val >= 1000)
        return `${(val / 1000).toFixed(2)}K`;

    return val.toString();
};

export { toDollar, toPercent, toShortNumber };