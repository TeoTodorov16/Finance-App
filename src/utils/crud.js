import {
    getRef,
    createRecord,
    updateRecord
} from './firebase';

export const createCategory = (userID) => {
    const category = {
        name: 'Savings',
        balance: 45.56,
    }
    createRecord(`categories/${userID}`, category).then((x)=>console.log(x));
}
