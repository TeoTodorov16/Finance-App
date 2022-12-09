import {
    getRef,
    createRecord,
    updateRecord
} from './firebase';

export const createCategory = (userID, category) => {
    createRecord(`categories/${userID}`, category).then((x) => console.log(x));
}
