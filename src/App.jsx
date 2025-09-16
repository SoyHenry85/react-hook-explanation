import React, { 
    useState, 
    useEffect, 
    useContext, 
    useReducer, 
    useCallback, 
    useMemo, 
    useRef, 
    useImperativeHandle, 
    useLayoutEffect, 
    useDebugValue,
    useId,
    useTransition,
    useDeferredValue,
    useSyncExternalStore,
    useInsertionEffect,
    forwardRef,
    createContext
} from 'react';

// Create contexts for the demo
const ThemeContext = createContext();
const UserContext = createContext();

// Demo Components for each hook
function UseStateDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('User');
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useState Demo</h4>
            <p>Hello, {name}! Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
        </div>
    );
}

function UseEffectDemo() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useEffect Demo</h4>
            <p>Count: {count} (check document title)</p>
            <p>Current time: {time}</p>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
        </div>
    );
}

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function UserProvider({ children }) {
    const [user, setUser] = useState({ name: 'John Doe', role: 'admin' });
    
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

function UseContextDemo() {
    const { theme, setTheme } = useContext(ThemeContext);
    const user = useContext(UserContext);
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useContext Demo</h4>
            <p>Current theme: {theme}</p>
            <p>Current user: {user.name}</p>
            <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                style={{
                    backgroundColor: theme === 'light' ? '#fff' : '#333',
                    color: theme === 'light' ? '#333' : '#fff',
                    border: '1px solid #ccc'
                }}
            >
                Toggle Theme
            </button>
        </div>
    );
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
        case 'reset': return { count: 0 };
        default: return state;
    }
}

function UseReducerDemo() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useReducer Demo</h4>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    );
}

function UseCallbackDemo() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");
    
    const memoizedCallback = useCallback(() => {
        alert(`Count value is: ${count}`);
    }, [count]);
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useCallback Demo</h4>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <input value={value} onChange={e => setValue(e.target.value)} placeholder="Type to test re-renders" />
            <button onClick={memoizedCallback}>Show Count</button>
            <p><small>The callback function only changes when count changes, not on every render</small></p>
        </div>
    );
}

function UseMemoDemo() {
    const [number, setNumber] = useState(1);
    const [inc, setInc] = useState(0);
    
    const factorial = useMemo(() => {
        console.log('Calculating factorial');
        return calculateFactorial(number);
    }, [number]);
    
    function calculateFactorial(n) {
        if (n <= 1) return 1;
        return n * calculateFactorial(n - 1);
    }
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useMemo Demo</h4>
            <input 
                type="number" 
                value={number} 
                onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
            />
            <p>Factorial of {number} is: {factorial}</p>
            <button onClick={() => setInc(inc + 1)}>Re-render ({inc})</button>
            <p><small>Check console to see when factorial is recalculated</small></p>
        </div>
    );
}

function UseRefDemo() {
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    const renderCount = useRef(0);
    
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useRef Demo</h4>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type something"
            />
            <button onClick={focusInput}>Focus Input</button>
            <p>Component rendered {renderCount.current} times</p>
        </div>
    );
}

const FancyInput = forwardRef((props, ref) => {
    const inputRef = useRef();
    
    useImperativeHandle(ref, () => ({
        focusAndSelect: () => {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }));
    
    return <input ref={inputRef} defaultValue="Select me" />;
});

function UseImperativeHandleDemo() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current.focusAndSelect();
    };
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useImperativeHandle Demo</h4>
            <FancyInput ref={inputRef} />
            <button onClick={focusInput}>Focus and Select</button>
        </div>
    );
}

function UseLayoutEffectDemo() {
    const [width, setWidth] = useState(0);
    const divRef = useRef();
    
    useLayoutEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, []);
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useLayoutEffect Demo</h4>
            <div ref={divRef} style={{ background: '#f0f0f0', padding: '10px' }}>
                <p>This div is {width}px wide</p>
                <p>useLayoutEffect runs before browser paint</p>
            </div>
        </div>
    );
}

function useDebugValueCustomHook() {
    const [status] = useState('Online');
    useDebugValue(status);
    return status;
}

function UseDebugValueDemo() {
    const userStatus = useDebugValueCustomHook();
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useDebugValue Demo</h4>
            <p>User status: {userStatus}</p>
            <p><small>Check React DevTools to see the debug value</small></p>
        </div>
    );
}

function UseIdDemo() {
    const id = useId();
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useId Demo</h4>
            <label htmlFor={id}>Name:</label>
            <input id={id} type="text" />
            <p>Generated ID: {id}</p>
        </div>
    );
}

function UseTransitionDemo() {
    const [isPending, startTransition] = useTransition();
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    
    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        
        startTransition(() => {
            const l = [];
            for (let i = 0; i < 10000; i++) {
                l.push(value);
            }
            setList(l);
        });
    };
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useTransition Demo</h4>
            <input value={input} onChange={handleChange} />
            <p>{isPending ? 'Loading...' : 'Done'}</p>
            <p>List length: {list.length}</p>
        </div>
    );
}

function UseDeferredValueDemo() {
    const [input, setInput] = useState('');
    const deferredInput = useDeferredValue(input);
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useDeferredValue Demo</h4>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <p>Deferred value: {deferredInput}</p>
            <p>Current value: {input}</p>
        </div>
    );
}

function UseSyncExternalStoreDemo() {
    // Simple store implementation for demo
    const store = useMemo(() => ({
        state: { count: 0 },
        listeners: new Set(),
        subscribe: (listener) => {
            store.listeners.add(listener);
            return () => store.listeners.delete(listener);
        },
        getSnapshot: () => store.state,
        increment: () => {
            store.state = { count: store.state.count + 1 };
            store.listeners.forEach(l => l());
        }
    }), []);
    
    const state = useSyncExternalStore(
        store.subscribe,
        store.getSnapshot
    );
    
    return (
        <div className="demo-area">
            <h4 className="demo-title">useSyncExternalStore Demo</h4>
            <p>Count: {state.count}</p>
            <button onClick={store.increment}>Increment</button>
        </div>
    );
}

function UseInsertionEffectDemo() {
    useInsertionEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .insertion-effect-demo {
                background-color: #e6f7ff;
                padding: 10px;
                border-radius: 5px;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    
    return (
        <div className="demo-area insertion-effect-demo">
            <h4 className="demo-title">useInsertionEffect Demo</h4>
            <p>This style was injected with useInsertionEffect</p>
        </div>
    );
}

// Hook Information Component
const HookInfo = ({ title, version, category, description, realWorldUse, codeExample, DemoComponent, scenario }) => {
    return (
        <div className="hook-section">
            <div className="hook-header">
                <div className="hook-title">
                    {title}
                    <span className="hook-version">React {version}+</span>
                </div>
                <span className="hook-category">{category}</span>
            </div>
            <p className="hook-description">{description}</p>
            
            <div className="scenario">
                <h4>Real-Life Scenario</h4>
                <p>{scenario}</p>
            </div>
            
            <div className="hook-realworld">
                <h4>How To Use</h4>
                <p>{realWorldUse}</p>
            </div>
            
            <div className="code-example">
                <pre>{codeExample}</pre>
            </div>
            
            {DemoComponent && <DemoComponent />}
        </div>
    );
};

// Main App Component
function App() {
    const [activeCategory, setActiveCategory] = useState('basic');
    const [activeTab, setActiveTab] = useState('useState');
    
    const hookCategories = {
        basic: [
            {
                id: 'useState',
                title: 'useState',
                version: '16.8',
                category: 'Basic Hook',
                description: 'Manages state in functional components. Returns a stateful value and a function to update it.',
                scenario: 'You\'re building a registration form. You need to track the values of each input field (name, email, password) as the user types, and update the UI accordingly.',
                realWorldUse: 'Call useState() to declare a state variable. The initial state is passed as an argument. It returns an array with two values: the current state and a function to update it.',
                codeExample: `// Initialize state
const [name, setName] = useState('');

// Update state
setName('John Doe');

// Use state in your component
return <input value={name} onChange={e => setName(e.target.value)} />;`,
                DemoComponent: UseStateDemo
            },
            {
                id: 'useEffect',
                title: 'useEffect',
                version: '16.8',
                category: 'Basic Hook',
                description: 'Handles side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.',
                scenario: 'You need to fetch user data from an API when the component loads, and also set up a subscription to real-time updates that should be cleaned up when the component unmounts.',
                realWorldUse: 'Call useEffect() with a function containing your side effect logic. You can optionally return a cleanup function. Provide a dependency array to control when the effect runs.',
                codeExample: `// Run once on mount (like componentDidMount)
useEffect(() => {
  fetchUserData();
}, []);

// Run when specific values change
useEffect(() => {
  document.title = \`You have \${count} notifications\`;
}, [count]); // Only re-run if count changes

// Run cleanup on unmount
useEffect(() => {
  const subscription = subscribeToUpdates();
  return () => {
    subscription.unsubscribe(); // Cleanup function
  };
}, []);`,
                DemoComponent: UseEffectDemo
            },
            {
                id: 'useContext',
                title: 'useContext',
                version: '16.8',
                category: 'Basic Hook',
                description: 'Accepts a context object and returns the current context value. Allows you to access context without wrapping components in Context.Consumer.',
                scenario: 'Your app has a theme (light/dark mode) that needs to be accessible from many components at different nesting levels without passing props down manually.',
                realWorldUse: 'First create a context with React.createContext(), then wrap your component tree with a Context.Provider. In any child component, call useContext() with the context object to access the provided value.',
                codeExample: `// 1. Create a context
const ThemeContext = React.createContext();

// 2. Provide context value
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consume context value
function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme('dark')}>
      Switch to Dark Mode
    </button>
  );
}`,
                DemoComponent: UseContextDemo
            }
        ],
        additional: [
            {
                id: 'useReducer',
                title: 'useReducer',
                version: '16.8',
                category: 'Additional Hook',
                description: 'An alternative to useState for managing complex state logic. It accepts a reducer function and an initial state, and returns the current state and a dispatch function.',
                scenario: 'You\'re building a shopping cart with multiple actions (add item, remove item, update quantity, clear cart). The state transitions are complex with multiple possible actions.',
                realWorldUse: 'Call useReducer() with a reducer function and initial state. The reducer function receives the current state and an action, and returns the new state. Dispatch actions to update state.',
                codeExample: `// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

// Component using useReducer
function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  
  return (
    <div>
      <button onClick={() => dispatch({
        type: 'ADD_ITEM', 
        item: { id: 1, name: 'Product' }
      })}>
        Add Item
      </button>
    </div>
  );
}`,
                DemoComponent: UseReducerDemo
            },
            {
                id: 'useCallback',
                title: 'useCallback',
                version: '16.8',
                category: 'Additional Hook',
                description: 'Returns a memoized callback function. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.',
                scenario: 'You have a large list of items where each item has a click handler. Without useCallback, each handler would be recreated on every render, causing all items to re-render even when not necessary.',
                realWorldUse: 'Wrap your callback function with useCallback(). Provide a dependency array - the callback will only be recreated when one of the dependencies has changed.',
                codeExample: `function ParentComponent() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  
  // This function is recreated on every render
  const handleClick = () => {
    console.log('Clicked!', count);
  };
  
  // This function is memoized and only recreated when count changes
  const memoizedHandleClick = useCallback(() => {
    console.log('Clicked!', count);
  }, [count]);
  
  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <ChildComponent onClick={memoizedHandleClick} />
    </div>
  );
}`,
                DemoComponent: UseCallbackDemo
            },
            {
                id: 'useMemo',
                title: 'useMemo',
                version: '16.8',
                category: 'Additional Hook',
                description: 'Returns a memoized value. This is useful for expensive calculations that you don\'t want to recompute on every render.',
                scenario: 'You have a component that filters and sorts a large list of products based on user selection. The filtering/sorting is computationally expensive and should only be recalculated when the filters change.',
                realWorldUse: 'Wrap your expensive calculation with useMemo(). Provide a dependency array - the calculation will only be recomputed when one of the dependencies has changed.',
                codeExample: `function ProductList({ products, filter }) {
  // This expensive calculation will only run when products or filter changes
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product => 
      product.category === filter
    ).sort((a, b) => a.price - b.price);
  }, [products, filter]);
  
  return (
    <div>
      {filteredProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}`,
                DemoComponent: UseMemoDemo
            },
            {
                id: 'useRef',
                title: 'useRef',
                version: '16.8',
                category: 'Additional Hook',
                description: 'Returns a mutable ref object whose .current property is initialized to the passed argument. The returned object will persist for the full lifetime of the component.',
                scenario: 'You need to access a DOM element directly to focus an input field, measure its size, or integrate with a third-party library that requires direct DOM access.',
                realWorldUse: 'Call useRef() to create a ref, then attach it to a DOM element via the ref attribute. You can access the DOM node through ref.current.',
                codeExample: `function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Access the DOM element directly
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}`,
                DemoComponent: UseRefDemo
            },
            {
                id: 'useImperativeHandle',
                title: 'useImperativeHandle',
                version: '16.8',
                category: 'Additional Hook',
                description: 'Customizes the instance value that is exposed when using refs. It should be used with forwardRef.',
                scenario: 'You\'re creating a custom input component and want to expose specific methods (like focus, clear) to parent components instead of the entire DOM node.',
                realWorldUse: 'Use with forwardRef to create a component that exposes specific methods to parent components via ref.',
                codeExample: `const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Parent component
function Form() {
  const inputRef = useRef();
  
  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
}`,
                DemoComponent: UseImperativeHandleDemo
            },
            {
                id: 'useLayoutEffect',
                title: 'useLayoutEffect',
                version: '16.8',
                category: 'Additional Hook',
                description: 'Similar to useEffect but fires synchronously after all DOM mutations. Use this to read layout from the DOM and re-render synchronously.',
                scenario: 'You need to measure a DOM element (like its width or height) immediately after rendering and before the browser paints, to adjust the UI accordingly.',
                realWorldUse: 'The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM.',
                codeExample: `function Tooltip() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);
  
  return <div ref={ref}>Tooltip content</div>;
}`,
                DemoComponent: UseLayoutEffectDemo
            },
            {
                id: 'useDebugValue',
                title: 'useDebugValue',
                version: '16.8',
                category: 'Additional Hook',
                description: 'Can be used to display a label for custom hooks in React DevTools.',
                scenario: 'You\'ve created a custom hook and want to make it easier to debug in React DevTools by displaying additional information.',
                realWorldUse: 'Call useDebugValue() inside your custom hook to display a label in React DevTools.',
                codeExample: `function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  
  // Display this label in DevTools next to this Hook
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}`,
                DemoComponent: UseDebugValueDemo
            },
            {
                id: 'useId',
                title: 'useId',
                version: '18.0',
                category: 'Additional Hook',
                description: 'Generates a unique ID that is stable across server and client renders.',
                scenario: 'You need to generate unique IDs for form elements to connect labels with inputs for accessibility purposes.',
                realWorldUse: 'Call useId() to generate a unique ID that remains consistent between server and client rendering.',
                codeExample: `function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  
  return (
    <form>
      <label htmlFor={emailId}>Email:</label>
      <input id={emailId} type="email" />
      
      <label htmlFor={passwordId}>Password:</label>
      <input id={passwordId} type="password" />
    </form>
  );
}`,
                DemoComponent: UseIdDemo
            }
        ],
        concurrent: [
            {
                id: 'useTransition',
                title: 'useTransition',
                version: '18.0',
                category: 'Concurrent Hook',
                description: 'Allows you to mark some state updates as not urgent (non-blocking). Other state updates in the same event are considered urgent by default.',
                scenario: 'You have a large list that gets filtered based on user input. You want to keep the input responsive while the list is being filtered in the background.',
                realWorldUse: 'Call useTransition() to get a startTransition function and a pending state indicator. Wrap non-urgent state updates with startTransition.',
                codeExample: `function FilterList() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // Urgent update
    
    startTransition(() => {
      // Non-urgent update
      setList(filterLargeList(value));
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending ? 'Loading...' : <List items={list} />}
    </div>
  );
}`,
                DemoComponent: UseTransitionDemo
            },
            {
                id: 'useDeferredValue',
                title: 'useDeferredValue',
                version: '18.0',
                category: 'Concurrent Hook',
                description: 'Defers updating a part of the UI. It is similar to debouncing but has better integration with React.',
                scenario: 'You have a search input that triggers expensive search operations. You want to keep the input responsive while deferring the search results update.',
                realWorldUse: 'Call useDeferredValue() with a value to get a deferred version of that value that "lags behind" the original value.',
                codeExample: `function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  // The results will only update when deferredQuery changes,
  // allowing the input to feel more responsive
  const results = useMemo(() => 
    search(deferredQuery), 
    [deferredQuery]
  );
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SearchResults results={results} />
    </div>
  );
}`,
                DemoComponent: UseDeferredValueDemo
            },
            {
                id: 'useSyncExternalStore',
                title: 'useSyncExternalStore',
                version: '18.0',
                category: 'Concurrent Hook',
                description: 'Allows external stores to support concurrent reads by forcing updates to the store to be synchronous.',
                scenario: 'You need to integrate with an external state management library (like Redux or Zustand) in a way that works with React\'s concurrent features.',
                realWorldUse: 'This hook is primarily intended for library authors. It allows external stores to work with React\'s concurrent rendering.',
                codeExample: `// This is typically used by libraries, not directly in application code
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
  
  return isOnline;
}`,
                DemoComponent: UseSyncExternalStoreDemo
            },
            {
                id: 'useInsertionEffect',
                title: 'useInsertionEffect',
                version: '18.0',
                category: 'Concurrent Hook',
                description: 'Designed for CSS-in-JS libraries to inject styles before layout effects read the computed values.',
                scenario: 'You\'re building a CSS-in-JS library and need to inject styles into the DOM before any layout effects run.',
                realWorldUse: 'This hook is primarily for library authors. It runs after the DOM has been mutated but before layout effects read the new layout.',
                codeExample: `function useCSS(rule) {
  useInsertionEffect(() => {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = rule;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  });
  
  return rule;
}`,
                DemoComponent: UseInsertionEffectDemo
            }
        ]
    };
    
    const hooks = hookCategories[activeCategory] || [];
    
    return (
        <ThemeProvider>
            <UserProvider>
                <div className="container">
                    <header>
                        <h1>Complete React Hooks Guide</h1>
                        <p className="intro">
                            Learn all React Hooks with practical examples and real-world scenarios.
                            Understand how and when to use each hook in your applications.
                        </p>
                    </header>
                    
                    <div className="categories">
                        <button 
                            className={`category-btn ${activeCategory === 'basic' ? 'active' : ''}`}
                            onClick={() => { setActiveCategory('basic'); setActiveTab('useState'); }}
                        >
                            Basic Hooks
                        </button>
                        <button 
                            className={`category-btn ${activeCategory === 'additional' ? 'active' : ''}`}
                            onClick={() => { setActiveCategory('additional'); setActiveTab('useReducer'); }}
                        >
                            Additional Hooks
                        </button>
                        <button 
                            className={`category-btn ${activeCategory === 'concurrent' ? 'active' : ''}`}
                            onClick={() => { setActiveCategory('concurrent'); setActiveTab('useTransition'); }}
                        >
                            Concurrent Hooks
                        </button>
                    </div>
                    
                    <div className="tabs">
                        {hooks.map(hook => (
                            <button
                                key={hook.id}
                                className={`tab-btn ${activeTab === hook.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(hook.id)}
                            >
                                {hook.title}
                            </button>
                        ))}
                    </div>
                    
                    {hooks.map(hook => (
                        activeTab === hook.id && (
                            <HookInfo
                                key={hook.id}
                                title={hook.title}
                                version={hook.version}
                                category={hook.category}
                                description={hook.description}
                                realWorldUse={hook.realWorldUse}
                                codeExample={hook.codeExample}
                                DemoComponent={hook.DemoComponent}
                                scenario={hook.scenario}
                            />
                        )
                    ))}
                    
                    <footer>
                        <p>Complete React Hooks Guide &copy; 2024</p>
                        <p>Practice using these hooks to become proficient in React development!</p>
                    </footer>
                </div>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;