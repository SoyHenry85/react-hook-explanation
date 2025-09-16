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
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🔢</span>
                useState Demo
            </h4>
            <p className="mb-4 text-lg">Hello, {name}! Count: {count}</p>
            <div className="flex gap-3 mb-4 flex-wrap">
                <button 
                    onClick={() => setCount(count + 1)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    Increment
                </button>
                <button 
                    onClick={() => setCount(count - 1)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    Decrement
                </button>
            </div>
            <input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
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
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                useEffect Demo
            </h4>
            <p className="mb-2 text-lg">Count: {count} (check document title)</p>
            <p className="mb-4 text-lg font-mono bg-white/20 px-3 py-1 rounded">🕐 {time}</p>
            <button 
                onClick={() => setCount(count + 1)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
            >
                Increment Count
            </button>
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
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🌐</span>
                useContext Demo
            </h4>
            <div className="space-y-3 mb-4">
                <p className="text-lg bg-white/20 px-3 py-2 rounded">🎨 Theme: {theme}</p>
                <p className="text-lg bg-white/20 px-3 py-2 rounded">👤 User: {user.name}</p>
            </div>
            <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
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
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🔄</span>
                useReducer Demo
            </h4>
            <p className="mb-4 text-2xl font-bold text-center bg-white/20 py-3 rounded">Count: {state.count}</p>
            <div className="flex gap-3 flex-wrap justify-center">
                <button 
                    onClick={() => dispatch({ type: 'increment' })}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    ➕ Increment
                </button>
                <button 
                    onClick={() => dispatch({ type: 'decrement' })}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    ➖ Decrement
                </button>
                <button 
                    onClick={() => dispatch({ type: 'reset' })}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    🔄 Reset
                </button>
            </div>
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
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">📞</span>
                useCallback Demo
            </h4>
            <p className="mb-3 text-lg">Count: {count}</p>
            <div className="space-y-3">
                <button 
                    onClick={() => setCount(count + 1)}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    Increment Count
                </button>
                <input 
                    value={value} 
                    onChange={e => setValue(e.target.value)} 
                    placeholder="Type to test re-renders"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button 
                    onClick={memoizedCallback}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    Show Count Alert
                </button>
                <p className="text-sm opacity-80 bg-white/10 p-3 rounded">
                    The callback function only changes when count changes, not on every render
                </p>
            </div>
        </div>
    );
}

function UseMemoDemo() {
    const [number, setNumber] = useState(1);
    const [inc, setInc] = useState(0);
    
    const factorial = useMemo(() => {
        console.log('🧮 Calculating factorial...');
        return calculateFactorial(number);
    }, [number]);
    
    function calculateFactorial(n) {
        if (n <= 1) return 1;
        return n * calculateFactorial(n - 1);
    }
    
    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🧠</span>
                useMemo Demo
            </h4>
            <div className="space-y-4">
                <input 
                    type="number" 
                    value={number} 
                    onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <p className="text-lg bg-white/20 p-3 rounded">
                    Factorial of <span className="font-bold">{number}</span> is: <span className="font-bold text-yellow-300">{factorial}</span>
                </p>
                <button 
                    onClick={() => setInc(inc + 1)}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    Force Re-render ({inc})
                </button>
                <p className="text-sm opacity-80 bg-white/10 p-3 rounded">
                    📝 Check console to see when factorial is recalculated
                </p>
            </div>
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
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">📌</span>
                useRef Demo
            </h4>
            <div className="space-y-4">
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type something"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button 
                    onClick={focusInput}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    🎯 Focus Input
                </button>
                <p className="text-lg bg-white/20 p-3 rounded">
                    Component rendered <span className="font-bold text-yellow-300">{renderCount.current}</span> times
                </p>
            </div>
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
    
    return (
        <input 
            ref={inputRef} 
            defaultValue="Select me" 
            className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        />
    );
});

function UseImperativeHandleDemo() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current.focusAndSelect();
    };
    
    return (
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🎛️</span>
                useImperativeHandle Demo
            </h4>
            <div className="space-y-4">
                <FancyInput ref={inputRef} />
                <button 
                    onClick={focusInput}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    Focus and Select Text
                </button>
            </div>
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">📐</span>
                useLayoutEffect Demo
            </h4>
            <div ref={divRef} className="bg-white/20 p-4 rounded-lg border border-white/30 mb-4">
                <p className="mb-2">This div is measured synchronously</p>
                <p>useLayoutEffect runs before browser paint</p>
            </div>
            <p className="text-lg bg-white/20 p-3 rounded">
                Width: <span className="font-bold text-yellow-300">{width}px</span>
            </p>
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
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🐛</span>
                useDebugValue Demo
            </h4>
            <div className="space-y-4">
                <p className="text-lg bg-white/20 p-3 rounded">
                    User status: <span className="font-bold text-green-300">{userStatus}</span>
                </p>
                <p className="text-sm opacity-80 bg-white/10 p-3 rounded">
                    🛠️ Check React DevTools to see the debug value
                </p>
            </div>
        </div>
    );
}

function UseIdDemo() {
    const id = useId();
    
    return (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🆔</span>
                useId Demo
            </h4>
            <div className="space-y-4">
                <div>
                    <label htmlFor={id} className="block mb-2 font-semibold">Name:</label>
                    <input 
                        id={id} 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                </div>
                <p className="text-sm bg-white/20 p-3 rounded font-mono">
                    Generated ID: {id}
                </p>
            </div>
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                useTransition Demo
            </h4>
            <div className="space-y-4">
                <input 
                    value={input} 
                    onChange={handleChange} 
                    placeholder="Type to generate 10k items..."
                    className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <div className="flex items-center justify-between bg-white/20 p-3 rounded-lg">
                    <span>{isPending ? '⏳ Processing...' : '✅ Done'}</span>
                    <span>List length: {list.length}</span>
                </div>
            </div>
        </div>
    );
}

function UseDeferredValueDemo() {
    const [input, setInput] = useState('');
    const deferredInput = useDeferredValue(input);
    
    return (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">⏰</span>
                useDeferredValue Demo
            </h4>
            <div className="space-y-4">
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type to see deferred updates..."
                    className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <div className="space-y-2">
                    <p className="bg-white/20 p-3 rounded">Current: "{input}"</p>
                    <p className="bg-white/20 p-3 rounded">Deferred: "{deferredInput}"</p>
                </div>
            </div>
        </div>
    );
}

function UseSyncExternalStoreDemo() {
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
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🏪</span>
                useSyncExternalStore Demo
            </h4>
            <div className="space-y-4">
                <p className="text-2xl bg-white/20 p-3 rounded text-center">
                    Count: {state.count}
                </p>
                <button 
                    onClick={store.increment}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-semibold"
                >
                    Increment External Store
                </button>
            </div>
        </div>
    );
}

function UseInsertionEffectDemo() {
    useInsertionEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .insertion-effect-demo {
                background: linear-gradient(45deg, #10b981, #059669);
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    
    return (
        <div className="insertion-effect-demo text-white p-6 rounded-xl mt-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🎨</span>
                useInsertionEffect Demo
            </h4>
            <p className="text-lg bg-white/20 p-3 rounded">
                This gradient background was injected using useInsertionEffect
            </p>
        </div>
    );
}

// Hook Information Component
const HookInfo = ({ title, version, category, description, realWorldUse, codeExample, DemoComponent, scenario }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        React {version}+
                    </span>
                </div>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {category}
                </span>
            </div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                {description}
            </p>
            
            <div className="mb-6">
                <h4 className="text-xl font-bold text-orange-600 mb-3 flex items-center">
                    <span className="mr-2">💡</span>
                    Real-Life Scenario
                </h4>
                <p className="text-gray-700 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400 leading-relaxed">
                    {scenario}
                </p>
            </div>
            
            <div className="mb-6">
                <h4 className="text-xl font-bold text-green-600 mb-3 flex items-center">
                    <span className="mr-2">🚀</span>
                    How To Use
                </h4>
                <p className="text-gray-700 bg-green-50 p-4 rounded-lg border-l-4 border-green-400 leading-relaxed">
                    {realWorldUse}
                </p>
            </div>
            
            <div className="mb-6">
                <h4 className="text-xl font-bold text-purple-600 mb-3 flex items-center">
                    <span className="mr-2">💻</span>
                    Code Example
                </h4>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed border">
                    <code>{codeExample}</code>
                </pre>
            </div>
            
            {DemoComponent && (
                <div>
                    <h4 className="text-xl font-bold text-indigo-600 mb-3 flex items-center">
                        <span className="mr-2">🎮</span>
                        Interactive Demo
                    </h4>
                    <DemoComponent />
                </div>
            )}
        </div>
    );
};

// Main App Component
function ReactHooksDemo() {
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
                <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100">
                    <div className="container mx-auto px-4 py-8 max-w-6xl">
                        <header className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-3xl shadow-2xl">
                            <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Complete React Hooks Guide</h1>
                            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                                Learn all React Hooks with practical examples and real-world scenarios.
                                Understand how and when to use each hook in your applications.
                            </p>
                        </header>
                        
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button 
                                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    activeCategory === 'basic' 
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25' 
                                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                                }`}
                                onClick={() => { setActiveCategory('basic'); setActiveTab('useState'); }}
                            >
                                Basic Hooks
                            </button>
                            <button 
                                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    activeCategory === 'additional' 
                                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/25' 
                                        : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                                }`}
                                onClick={() => { setActiveCategory('additional'); setActiveTab('useReducer'); }}
                            >
                                Additional Hooks
                            </button>
                            <button 
                                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    activeCategory === 'concurrent' 
                                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-500/25' 
                                        : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                                }`}
                                onClick={() => { setActiveCategory('concurrent'); setActiveTab('useTransition'); }}
                            >
                                Concurrent Hooks
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {hooks.map(hook => (
                                <button
                                    key={hook.id}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                        activeTab === hook.id 
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25' 
                                            : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200'
                                    }`}
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
                        
                        <footer className="text-center mt-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-3xl shadow-2xl">
                            <p className="text-lg font-semibold mb-2">Complete React Hooks Guide &copy; 2024</p>
                            <p className="opacity-80">Practice using these hooks to become proficient in React development!</p>
                        </footer>
                    </div>
                </div>
            </UserProvider>
        </ThemeProvider>
    );
}

export default ReactHooksDemo;