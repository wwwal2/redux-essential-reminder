// ESSENTIAL REDUX v.1
// ///////////////////////////////////////////////////////
const reducerV1 = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state +1
        default: 
            return state
    }
};
let state = reducerV1(state, {type: 'INCREMENT'});
console.log(state); // state = 1
state = reducerV1(state, {type: 'INCREMENT'});
console.log(state); // state = 2

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX v.2
import { createStore } from 'redux';
const reducerV2 = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state +1
        case "DECREMENT":
            return state -1
        default: 
            return state
    }
};
store = createStore(reducerV2);
store.subscribe(() => { 
    console.log(store.getState());
});  //function will call everytime store changes
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'}); 
console.log(store.getState());

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX v.3
import { createStore } from 'redux';
const reducerV3 = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state +1
        case "DECREMENT":
            return state -1
        case "RANDOM":
            return state + action.payload
        default: 
            return state
    }
};
store = createStore(reducerV3);
store.subscribe(() => { 
    console.log(store.getState());
});  //function will call everytime store changes
const randNum1 = Math.floor(Math.random()*10)
store.dispatch({
    type: "RANDOM",
    payload: randNum1
});

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX v.4
import { createStore } from 'redux';
const reducerV4 = reducerV3;
const increment = () => ({type:"INCREMENT"});
const decrement = () => ({type:"DECREMENT"});
const random = (payload) => ({type:"RANDOM", payload});
store = createStore(reducerV4);
store.dispatch(increment());
const randNum2 = Math.floor(Math.random()*10)
store.dispatch(random(randNum2))
// JSX
<button onClick={() => {store.dispatch(decrement())}}></button>

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX v.5
// actions file
export const increment = () => ({type:"INCREMENT"});
export const decrement = () => ({type:"DECREMENT"});
export const random = (payload) => ({type:"RANDOM", payload});
// reducer file
const reducerV5 = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state +1
        case "DECREMENT":
            return state -1
        case "RANDOM":
            return state + action.payload
        default: 
            return state
    }
};
export default reducerV5
// app file
import { createStore } from 'redux';
import { increment, decrement, random } from './actions';
import reducerV5 from './reducer';
store = createStore(reducerV5);

const { dispatch } = store;
dispatch(increment());
const incrementDispatch = () => dispatch(increment());
const decrementDispatch = () => dispatch(decrement());
const randomDispatch = (payload) => dispatch(random(payload));

const randNum2 = Math.floor(Math.random()*10);
dispatch(random(randNum2));

<button onClick={() => {dispatch(decrement())}}></button>
<button onClick={decrementDispatch}></button>
<button onClick={randomDispatch(randNum2)}></button>

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX v.6
// actions file
// reducer file
// app file
import { createStore } from 'redux';
import { increment, decrement, random } from './actions';
import reducerV6 from './reducer';
store = createStore(reducerV6);
const { dispatch } = store;

const bindActionCreator = (creator, dispatch) => (...args) => {
    dispatch(creator(...args))
} 
const incrementDispatch = bindActionCreator(increment, dispatch);
const decrementDispatch = bindActionCreator(decrement, dispatch);
const randomDispatch = bindActionCreator(random, dispatch);
// JSX code ...

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX v.7
// actions file
// reducer file
// app file
import { createStore, bindActionCreators } from 'redux';
import { increment, decrement, random } from './actions';
import reducerV6 from './reducer';
store = createStore(reducerV7);
const { dispatch } = store;

const { incrementDispatch, decrementDispatch, randomDispatch } = bindActionCreators({
    incrementDispatch: increment,
    decrementDispatch: decrement,
    randomDispatch: random
}, dispatch);
// JSX code ...

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX v.8
// actions file
// reducer file
// app file
import { createStore, bindActionCreators } from 'redux';
import * as actions from './actions';
import reducerV6 from './reducer';
store = createStore(reducerV8);
const { dispatch } = store;

const { increment, decrement, random } = bindActionCreators(actions, dispatch);

const randNum3 = Math.floor(Math.random()*10);
<button onClick={increment}></button>
<button onClick={random(randNum3)}></button>

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX, CONNECT v.1
// component file
import { connect } from 'react-redux';
<MyComponent>
</MyComponent>
const mapStateToProps = state => ({acceptedData: state});
const mapDispatchToProps = dispatch => ({
    increment: () => dispatch({type: "INCREMENT"}),
    decrement: () => dispatch({type: "DECREMENT"}),
    random: () => dispatch({type: "RANDOM"}),
})
export default connect(mapStateToProps, mapDispatchToProps)(MyComopnent)

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX, CONNECT v.2
// component file
import { connect } from 'react-redux';
import { increment, decrement, random } from './actions';
<MyComponent>
</MyComponent>
const mapStateToProps = state => ({acceptedData: state});
const mapDispatchToProps = dispatch => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    random: () => {
        const randomNum4 = Math.floor(Math.random())
        dispatch(random(randomNum4))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(MyComopnent)

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX, CONNECT v.3
// component file
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
<MyComponent>
</MyComponent>
const mapStateToProps = state => ({acceptedData: state});
const mapDispatchToProps = dispatch => { 
    const { increment, decrement, random } = bindActionCreators(actions, dispatch);
    return {
    increment,
    decrement,
    random: () => {
        const randomNum5 = Math.floor(Math.random())
        random(randomNum5)
        }
    }   
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComopnent)

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX, CONNECT v.3
// actions modified file
export const increment = () => ({type:"INCREMENT"});
export const decrement = () => ({type:"DECREMENT"});
export const random = () => {
    const randomNum6 = Math.floor(Math.random())
    return {
        type:"RANDOM", 
        payload: randomNum6
    }
};
// component file
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
<MyComponent>
</MyComponent>
const mapStateToProps = state => ({acceptedData: state});
const mapDispatchToProps = dispatch => { 
    const { increment, decrement, random } = bindActionCreators(actions, dispatch);
    return {
    increment,
    decrement,
    random
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComopnent)

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX, CONNECT v.4
// actions modified file
// component file
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
<MyComponent>
</MyComponent>
const mapStateToProps = state => ({acceptedData: state});
const mapDispatchToProps = dispatch => { 
    return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComopnent)

// ///////////////////////////////////////////////////////
// ESSENTIAL REDUX, CONNECT v.5
// actions modified file
// component file
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
<MyComponent>
</MyComponent>
const mapStateToProps = state => ({acceptedData: state});

export default connect(mapStateToProps, actions)(MyComopnent)