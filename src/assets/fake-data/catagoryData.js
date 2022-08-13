import { v4 as uuidv4 } from 'uuid';
import { addDocument } from '../../firebase/services';

const category = [
    { id: uuidv4(), name: 'Áo thun' },
    { id: uuidv4(), name: 'Áo somi' },
    { id: uuidv4(), name: 'Quần jean' },
];

export const pushData = () => {
    category.forEach((item) => addDocument('categories', item));
};
export const getAllCategories = () => category;

export default category;
