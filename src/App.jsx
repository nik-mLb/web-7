import React, { useState } from 'react';
import "./style.css"

const HelloRequest = () => {
    alert('Hello, World!');
};

function App() {

    const [requestResult, setRequestResult] = useState({
        hello: null,
        query: null,
        count: null,
        counter: null,
    });

    const [query, setQuery] = useState('');
    const [count, setCount] = useState('');

    function FetchHelloRequest(){
        fetch("http://localhost:8082").then((response) => response.text()).then((result) => {
            setRequestResult(prev => ({
                ...prev,
                hello:{
                    result,
                }
            }))
        }).catch((err) => {
            console.log(err);
        })
    }

    function ClearHelloRequest(){
        setRequestResult(prev => ({
            ...prev,
            hello: null,
        }));
    }

    function FetchQueryRequest() {
        const url = `http://localhost:8083?name=${encodeURIComponent(query)}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.text())
            .then((result) => {
                setRequestResult(prev => ({
                    ...prev,
                    query: {
                        result,
                    }
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function ClearQuery() {
        setRequestResult(prev => ({
            ...prev,
            query: null,
        }));
        setQuery('');
    }

    function FetchGetCountRequest(){
        fetch("http://localhost:8081", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.text())
            .then((result) => {
                setRequestResult(prev => ({
                    ...prev,
                    counter: {
                        result,
                    }
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    function FetchPostCountRequest(){
        fetch("http://localhost:8081", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `count=${encodeURIComponent(count)}`,
        })
            .then((response) => response.text())
            .then((result) => {
                setRequestResult(prev => ({
                    ...prev,
                    count: {
                        result,
                    }
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    function ClearCount() {
        setRequestResult(prev => ({
            ...prev,
            counter: null,
        }));
    }

    return (
        <div className='cont'>

            <div className='card'>
                <button onClick={FetchHelloRequest}>
                    Get Response
                </button>
                <div className='response-field'>
                    <span className='response-label'>Result:</span>
                    {requestResult.hello && requestResult.hello.result}
                </div>
                <button onClick={ClearHelloRequest}>
                    Clear
                </button>
            </div>

            <div className='card'>
                <input
                    type='text'
                    placeholder='Enter query'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={FetchQueryRequest}>
                        Get Response
                </button>
                <div className='response-field'>
                    <span className='response-label'>Result:</span>
                    {requestResult.query && requestResult.query.result}
                </div>
                <button onClick={ClearQuery}>
                    Clear
                </button>
            </div>
            
            <div className='card'>
                <button onClick={FetchGetCountRequest}>
                    Get Counter
                </button>
                <div className='response-field'>
                    <span className='response-label'>Counter:</span>
                    {requestResult.counter && requestResult.counter.result}
                </div>
                <button onClick={ClearCount}>
                    Clear 
                </button>
            </div>

            <div className='card'>
                <input
                    type='number'
                    placeholder='Enter count'
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                />
                <div className='response-field'>
                    <span className='response-label'>Result:</span>
                    {requestResult.count && requestResult.count.result}
                </div>
                <button onClick={FetchPostCountRequest}>
                    Update Counter
                </button>
            </div>
        </div>
    );
};

export default App;