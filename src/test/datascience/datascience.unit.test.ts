// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import { assert } from 'chai';

import { formatStreamText } from '../../client/datascience/common';
import { InputHistory } from '../../datascience-ui/history-react/inputHistory';

suite('Data Science Tests', () => {

    test('formatting stream text', async () => {
        assert.equal(formatStreamText('\rExecute\rExecute 1'), 'Execute 1');
        assert.equal(formatStreamText('\rExecute\r\nExecute 2'), 'Execute\nExecute 2');
        assert.equal(formatStreamText('\rExecute\rExecute\r\nExecute 3'), 'Execute\nExecute 3');
        assert.equal(formatStreamText('\rExecute\rExecute\nExecute 4'), 'Execute\nExecute 4');
        assert.equal(formatStreamText('\rExecute\r\r \r\rExecute\nExecute 5'), 'Execute\nExecute 5');
        assert.equal(formatStreamText('\rExecute\rExecute\nExecute 6\rExecute 7'), 'Execute\nExecute 7');
        assert.equal(formatStreamText('\rExecute\rExecute\nExecute 8\rExecute 9\r\r'), 'Execute\n');
        assert.equal(formatStreamText('\rExecute\rExecute\nExecute 10\rExecute 11\r\n'), 'Execute\nExecute 11\n');
    });

    test('input history', async () => {
        let history = new InputHistory();
        history.add('1');
        history.add('2');
        history.add('3');
        history.add('4');
        assert.equal(history.completeDown('5'), '5');
        history.add('5');
        assert.equal(history.completeUp(''), '5');
        history.add('5');
        assert.equal(history.completeUp('5'), '4');
        assert.equal(history.completeUp('4'), '3');
        assert.equal(history.completeUp('2'), '2');
        assert.equal(history.completeUp('1'), '1');
        assert.equal(history.completeUp(''), '');

        // Add should reset position.
        history.add('6');
        assert.equal(history.completeUp(''), '6');
        assert.equal(history.completeUp(''), '5');
        assert.equal(history.completeUp(''), '4');
        assert.equal(history.completeUp(''), '3');
        assert.equal(history.completeUp(''), '2');
        assert.equal(history.completeUp(''), '1');
        history = new InputHistory();
        history.add('1');
        history.add('2');
        history.add('3');
        history.add('4');
        assert.equal(history.completeDown('5'), '5');
        assert.equal(history.completeDown(''), '');
        assert.equal(history.completeUp('1'), '4');
        assert.equal(history.completeDown('4'), '4');
        assert.equal(history.completeDown('4'), '4');
        assert.equal(history.completeUp('1'), '3');
        assert.equal(history.completeUp('4'), '2');
        assert.equal(history.completeDown('3'), '3');
        assert.equal(history.completeDown(''), '4');
        assert.equal(history.completeUp(''), '3');
        assert.equal(history.completeUp(''), '2');
        assert.equal(history.completeUp(''), '1');
        assert.equal(history.completeUp(''), '');
        assert.equal(history.completeUp('1'), '1');
        assert.equal(history.completeDown('1'), '2');
        assert.equal(history.completeDown('2'), '3');
        assert.equal(history.completeDown('3'), '4');
        assert.equal(history.completeDown(''), '');
        history.add('5');
        assert.equal(history.completeUp('1'), '5');
        assert.equal(history.completeUp('1'), '4');
        assert.equal(history.completeUp('1'), '3');
        assert.equal(history.completeUp('1'), '2');
        assert.equal(history.completeUp('1'), '1');
        assert.equal(history.completeUp('1'), '1');
        assert.equal(history.completeDown('1'), '2');
    });

});
