import { v4 as uuidv4 } from 'uuid';
import { addDocument } from '../../firebase/services';

const category = [
    { id: uuidv4(), name: 'Áo thun' },
    { id: uuidv4(), name: 'Áo polo' },
    { id: uuidv4(), name: 'Áo sơ mi' },
    { id: uuidv4(), name: 'Quần jean' },
    { id: uuidv4(), name: 'Quần short' },
    { id: uuidv4(), name: 'Quần lót' },
];

export const pushData = () => {
    category.forEach((item) => addDocument('categories', item));
};
export const getAllCategories = () => category;

export default category;
