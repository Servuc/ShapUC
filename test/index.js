import assert from 'assert';
import shapUc from '../lib';

describe('shap-uc', function () {
  it('should have unit test!', function () {
    assert(typeof shapUc.VERSION !== 'undefined', 'The Project should have a VERSION, whatever the actual version.');
  });
});
