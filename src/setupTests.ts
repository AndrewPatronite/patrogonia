import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

const { TextDecoder, TextEncoder, ReadableStream } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});

const storage: { [key: string]: string } = {};

const FakeLocalStorage = {
  length: 0,

  clear() {
    Object.keys(storage).forEach((key) => {
      delete storage[key];
    });
    this.length = 0;
  },

  getItem(key: string) {
    return storage[key] || null;
  },

  setItem(key: string, value: string) {
    storage[key] = value;
    this.length = Object.keys(storage).length;
  },

  removeItem(key: string) {
    delete storage[key];
    this.length = Object.keys(storage).length;
  },

  key(index: number) {
    return index >= 0 ? Object.keys(storage)[index] : null;
  },
};

Object.defineProperty(global, 'localStorage', { value: FakeLocalStorage });
