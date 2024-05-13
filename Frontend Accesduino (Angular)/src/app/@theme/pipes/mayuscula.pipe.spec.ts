import {MayusculasPipe} from './mayusculas.pipe';


describe('mayusculaPipe', () => {
  const pipe = new MayusculasPipe();

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });
  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  })
});
