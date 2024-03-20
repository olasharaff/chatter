// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {TextDecoder, TextEncoder} from 'node:util'
import 'fake-indexeddb/auto'



Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
})

// global.structuredClone = (v) => JSON.parse(JSON.stringify(v))
// Object.assign(global, { TextDecoder, TextEncoder })