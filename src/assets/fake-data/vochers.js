import { addDocument } from '../../firebase/services';

const vochers = [
    {
        code: 'discount10/1',
        discount: 0.1,
    },
    {
        code: 'discount10/2',
        discount: 0.1,
    },
    {
        code: 'discount20/1',
        discount: 0.2,
    },
    {
        code: 'discount20/2',
        discount: 0.2,
    },
];

export const pushData = () => {
    vochers.forEach((item) => addDocument('vouchers', item));
};
