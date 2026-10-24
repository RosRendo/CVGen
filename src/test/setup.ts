import "@testing-library/jest-dom";

// Mock window.print
if (typeof window !== "undefined") {
  window.print = () => {};
}
