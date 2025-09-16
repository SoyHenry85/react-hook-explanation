# React Hooks Guide

> Complete interactive guide to all 15 React hooks with live examples

[![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Features

- **All 15 React hooks** with interactive demos
- **Real-world examples** showing practical usage
- **Beautiful UI** built with Tailwind CSS
- **Copy-paste code** ready for your projects

## Quick Start

```bash
git clone https://github.com/myselfmehedihasan/react-hook-explanation.git
cd react-hooks-guide
npm install
npm start
```

## What's Included

### Basic Hooks
- `useState` - Manage component state
- `useEffect` - Handle side effects
- `useContext` - Access React context

### Additional Hooks
- `useReducer` - Complex state logic
- `useCallback` - Memoized functions
- `useMemo` - Memoized values
- `useRef` - DOM references
- `useImperativeHandle` - Custom ref API
- `useLayoutEffect` - Synchronous effects
- `useDebugValue` - Debug custom hooks
- `useId` - Generate unique IDs

### React 18 Hooks
- `useTransition` - Non-blocking updates
- `useDeferredValue` - Defer expensive updates
- `useSyncExternalStore` - External store integration
- `useInsertionEffect` - CSS-in-JS optimization

## Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## Built With

- React 18
- Tailwind CSS
- Modern JavaScript

## Contributing

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

---

**[Live Demo](https://react-hooks-guide.netlify.app/)** • **[Report Issues](https://github.com/yourusername/react-hooks-guide/issues)**