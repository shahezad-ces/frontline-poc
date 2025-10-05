import "@testing-library/jest-dom";
import React from "react";

// ✅ Polyfill for TextEncoder/TextDecoder (Apollo needs this)
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// ✅ Polyfill for TransformStream (Apollo streaming)
if (typeof (global as any).TransformStream === "undefined") {
  (global as any).TransformStream = class {
    readable: any;
    writable: any;
    constructor() {
      this.readable = {};
      this.writable = {};
    }
  };
}

// ✅ Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => React.createElement("img", props),
}));

// ✅ Mock Next.js Link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href }, children),
}));

// ✅ Mock Apollo Next.js Integration (registerApolloClient)
jest.mock("@apollo/client-integration-nextjs", () => ({
  ApolloNextAppProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
  registerApolloClient: jest.fn(() => ({
    getClient: jest.fn(),
    query: jest.fn(),
    PreloadQuery: jest.fn(),
  })),
}));

// ✅ Silence DOM nesting warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (args[0]?.includes("validateDOMNesting")) return;
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});
