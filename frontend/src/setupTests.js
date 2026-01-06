import '@testing-library/jest-dom'

// Minimal global mocks if needed
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

