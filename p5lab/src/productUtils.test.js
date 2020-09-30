import { filterByName, filterByStocked } from './productUtils'
import { PRODUCTS } from './mockData'

describe('Filters should work', () => {
    test('Check by name', () => {
        const substr = 'ball';
        let count = 0;
        for (let o of PRODUCTS) {
            if (o.name.indexOf(substr) !== -1) {
                count++;
            }
        }

        let newList = filterByName(PRODUCTS, 'ball');
        expect(newList.length).toBe(count);
    })

    test ('check only stocked', () => {
        let count = 0;
        for (let o of PRODUCTS) {
            if (o.stocked){
                count++;
            }
        }
        let newList = filterByStocked(PRODUCTS, true);
        expect(newList.length).toBe(count);
    })

    test ('check all stocked', () => {
        let newList = filterByStocked(PRODUCTS, false);
        expect(newList.length).toBe(PRODUCTS.length);
    })

})