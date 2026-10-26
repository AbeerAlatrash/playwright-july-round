import _ from '../utils/lodash.bundle.js';
import { test } from '@playwright/test';


test('Verify Lodash bundle is loaded and working', async () => {
    const arr = [1, 1, 2, 1, 2, 3, 1, 3, 2, 1, 2, 3];
    const uniqueArr = _.uniq(arr);
    console.log('Unique array:', uniqueArr);
});