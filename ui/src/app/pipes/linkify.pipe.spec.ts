import { LinkifyPipe } from './linkify.pipe';

describe('LinkifyPipe', () => {
  it('create an instance', () => {
    const pipe = new LinkifyPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform() should return a string', () => {
    const pipe = new LinkifyPipe();
    const url = 'https://test.com';
    expect(pipe.transform(url)).toBeInstanceOf(String);
  });

  it('transform() should return an HTML <a> tag string', () => {
    const pipe = new LinkifyPipe();
    const url = 'https://test.com';
    expect(pipe.transform(url)).toEqual('<a href="https://test.com" target="_blank">https://test.com</a>');
  });
});
