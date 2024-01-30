# 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
The difference between normal component and Pure component lies in how they handle updates and re-rendering.
`Normal Component`: The Normal component re-renders whenever its render method is called, it does not implement " shouldComponentUpdate" by default which means it will re-render even if the new state has same value as the previous state which further states then if the parent component renders the child component always re-renders.

`Pure Component`: The Pure component performs a shallow comparison between current and the next props and state before deciding to re-render and this avoid unnecessary re-rendering of application.The Pure component helps in performaance optimization by avoiding unecessary re-renders.In functional component Reac.memo does the same job as Pure component in class compoent which is if we wrap our function with React.memo then our function will not re-render if state and props has not changed.

`Code Snippet Example:`

`Child Components`
```javascript
import React, { Component } from 'React';

class NonPureComp extend Component {
    render(){
        console.log('render non pure component'); //this will get printed everytime the parent component is rendered//
        return (
            <div>{this.props.data}</div>
        )
    }
}
```

```javascript

import React, { PureComponent } from 'React';

class PureComp extend PureComponent {
    render(){
        console.log('render a pure component');
        return (
            <div>{this.props.data}</div>
        )
    }
}
```

`Parent Component`
```javascript
import React, { Component } from 'react';
import NonPureComponent from './NonPureComponent';
import PureComp from './PureComponent';

class PrentComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : 100
        }
    }
    handleBtnClick = () => {
        this.setState({data:100 });
    }
  render() {
    return (
        <>
        <div className ='pure-comp'>
        <NonPureComponent value = {this.state.data}></NonPureComponent> //this will always get render
          <button onClick ={this.handleBtnClick}></button>
         </div>

         <div className='impure-comp'>
        <PureComp value = {this.state.data}></PureComp>// this won't get render as the state is not changing.
          <button onClick ={this.handleBtnClick}></button>
        </div>
        </>      

    )
  }
}
```
`Scenario when the Pure Component fails`
In the above code snippet if we have state as a nested value then Pure react component won't help with UI update (will not render PureComp) even if the  state value in Parent Component changes as it only does shallow comparison of state and props (the object points to same reference in case of mutation).
for eg in case of the  following nested state value Pure Component won't work. 

```javascript
            this.state = {
            data : {
                details:{
                    firstName: 'Priyanka',
                    lastName: 'Tiwary'
                }
            }
        }
```
To address this issue we need to do deep comparison of object value.
--------------------------------------------------------------------------------------------------------------------------------

 # 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
 --------------------------------------------------------------------------------------------------------------------------------
# 3. Describe 3 ways to pass information from a component to its PARENT.

`1.React Context API`:
When the component is deeply nested it's better to use React Context API. This allows to create a context in Parent component, provide a context provider, and use the context in the child component.
We can also use external React library such as `Redux` which does the same work as React Context on a bigger level such as to manage state of the application and pass the data from child to parent using `useDispatch()` and `UseSelector()` hook of Redux.

`2. Passing the function as a prop from parent to child`

```javascript
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {

  const handleChildData = (data) => {
    console.log(`Data from child: ${data}`);
  };

  return <ChildComponent childDataFn={handleChildData} />;
};

export default ParentComponent;
```

```javascript
import React from 'react';

const ChildComponent = ({ childDataFn }) => {

  const onHandleClick = () => {
    const data = 'Priyanka';
    childDataFn(data);
  };

  return (
    <div>
      <button onClick={onHandleClick}>Pass the value to parent on Click of Button</button>
    </div>
  );
};

export default ChildComponent;
```
`3. Using UseRef and ForwardRef `

`Parent component`
```javascript
import React, { useRef } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const refValue = useRef();
  const onHandleClick = () => {
    const data = childRef.current.getData();
    console.log(`child data ${data}`);
  };

  return (
    <div>
      <ChildComponent ref={refValue} />
      <button onClick={onHandleClick}>Parent Button</button>
    </div>
  );
};

export default ParentComponent;

`Child component`
import React, { forwardRef, useImperativeHandle } from 'react';
const ChildComponent = forwardRef((props, ref) => {

  const getData = () => {
    return 'priyanka';
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));

  return <div>Child Component</div>;
});

export default ChildComponent;
```
--------------------------------------------------------------------------------------------------------------------------------

## 4. Give 2 ways to prevent components from re-rendering.
`1. Usimg React Pure component for class component or React.memo`
The code snippets for this already explained while answering question 1.

`2. Usimg UseMemo and UseCallback hooks for functional component`
 ```javascript
 import React, { useMemo } from 'react';

const MyComponent = (data) => {
  const data = [1,2,3,4,5,6,7];
  const sqrRoot = (data) => {
    return data.map(item => Math.sqrt(item));
  }
  const memoizedResult = useMemo(() => sqrRoot(data), [data]);
  return <div>{memoizedResult}</div>;
};
```
--------------------------------------------------------------------------------------------------------------------------------

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
Fragment is a syntax in react which helps to group multiple elements without adding extra element to the DOM tree.It helpt o write cleaner code and avoid unnecessary DOM nesting
```javascript
import React from 'react';

const MyComponent = () => {
  return (
    <>
      <h1>Heading</h1>
      <div>
      <p>Paragraph Text</p>
      </div>
    </>
  );
};
```
`Scenario where Fragment is not recommended`

 when we are using CSS selector to give style to the element (mostly nested elements where the style is being given to a particular element) then with frgament in place the structure of DOM changes and the styling of  application gets disturb.

 --------------------------------------------------------------------------------------------------------------------------------

# 6.Give 3 examples of the HOC pattern.
 --------------------------------------------------------------------------------------------------------------------------------

# 8. How many arguments does setState take and why is it async.

SetState can take 2 arguments which are 
`1. newState : This can be either an `Object` or a `function` with prevState as a parameter. If its an Object then react will perform shallow merge.`
`2. callback: This is an optional argument and can be executed once the state has been updated and component has been re-rendered`.
```javascript
setState(object | (prevState: object) => object, callback?: () => void)
```
SetState is asyn because because of the single threaded nature of Javascript. React make sure that its not blocking the main thread and batches all state changes into single update. It uses the event loop and task queue to manage asynchronous tasks.This helps in performance optimization.

 --------------------------------------------------------------------------------------------------------------------------------
# 9. List the steps needed to migrate a Class to Function Component.
  First of all we need to import React in function based component contrary to class based where we were extending React.Component.
  1. Update the class based  syntanx with functional syntax 
  2. Remove the `render` method and return JSX directly from the function component
  3. The state variable needs to be declared with `useState` hook  
  4. Replace the `lifecycle methods` like (componentDidMount, componentDidUpdate, componentWillUnmount) with the `useEffect` hook wherever its needed.
  5. Access the props directly in the functional component parameter. 
`
  ```javascript
  //Class based component.
class MyComponent extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
  }

  render() {
    <div>{this.state.data}</div>
  }
}

// Function Component.
import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  }, []);

  return (
    <div>{data}</div>
  )

};
```
--------------------------------------------------------------------------------------------------------------------------------
# 10. List a few ways styles can be used with components.
 ### 1. Inline Style
 ### 2. CSS Modules
 ```javascript

 .// styles.module.css
 .style {
  color: #fff;
}

// MyComponent.js
import React from 'react';
import styles from './styles.module.css';

const MyComponent = () => {
  return <div className={styles.style}>Lorem Ipsum....</div>;
};
```
### 3. Tailwind CSS( Tailwind is my personal favourite and an example of it is demonstrated in the autocomplete application)
### 4. Styled Components
```javascript
import styled from 'styled-components';

const Wrapper = styled.div`
  color: black;
`;

const ParentComponent = () => {
  return <Wrapper>Lorem Ipsum....</Wrapper>;
};
export default ParentComponent
```
### 5. Global Styles 

We can also use some libraries like `Bootsratp` and CSS properties like `flexbox`, `breakpoints` with` media query` to achieve responsiveness. 

--------------------------------------------------------------------------------------------------------------------------------

# 11.How to render an HTML string coming from the server.

There are few motheods to render an HTML string coming from the server :
1. Using `Dompurify` Library
2. Using `ReactHtmlParser` library
