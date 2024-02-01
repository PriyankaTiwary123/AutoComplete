# 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The difference between normal component and Pure component are as follows:
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
import React, { Component } from "react";
import NonPureComponent from "./NonPureComponent";
import PureComp from "./PureComponent";

class PrentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 100,
    };
  }
  handleBtnClick = () => {
    this.setState({ data: 100 });
  };
  render() {
    return (
      <>
        <div className="pure-comp">
          <NonPureComponent value={this.state.data}></NonPureComponent> //this will
          always get render
          <button onClick={this.handleBtnClick}></button>
        </div>

        <div className="impure-comp">
          <PureComp value={this.state.data}></PureComp>// this won't get render as
          the state is not changing.
          <button onClick={this.handleBtnClick}></button>
        </div>
      </>
    );
  }
}
```

`Scenario when the Pure Component fails`
In the above code snippet if we have state as a nested value then Pure react component won't help with UI update (will not render PureComp) even if the state value in Parent Component changes as it only does shallow comparison of state and props (the object points to same reference in case of mutation).
for eg in case of the following nested state value Pure Component won't work.

```javascript
this.state = {
  data: {
    details: {
      firstName: "Priyanka",
      lastName: "Tiwary",
    },
  },
};
```

## To address this issue we need to do deep comparison of object value.
---------------------------------------------------------------------------------------------------------------------------------

# 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
`Context helps to manage states across application and when the value of state changes then all the components subscribed to this context also renders and if the component also has `ShouldComponentUpdate` for rendering then this context state change might effect/overrides the re-rendering of `ShouldComponentUpdate` `

---------------------------------------------------------------------------------------------------------------------------------

# 3. Describe 3 ways to pass information from a component to its PARENT.

`1.React Context API`:
When the component is deeply nested it's better to use React Context API. This allows to create a context in Parent component, provide a context provider, and use the context in the child component.
We can also use external React library such as `Redux` which does the same work as React Context on a bigger level such as to manage state of the application and pass the data from child to parent using `useDispatch()` and `UseSelector()` hook of Redux.

`2. Passing the function as a prop from parent to child`

```javascript
import React from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const handleChildData = (data) => {
    console.log(`Data from child: ${data}`);
  };

  return <ChildComponent childDataFn={handleChildData} />;
};

export default ParentComponent;
```

```javascript
import React from "react";

const ChildComponent = ({ childDataFn }) => {
  const onHandleClick = () => {
    const data = "Priyanka";
    childDataFn(data);
  };

  return (
    <div>
      <button onClick={onHandleClick}>
        Pass the value to parent on Click of Button
      </button>
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

---------------------------------------------------------------------------------------------------------------------------------

## 4. Give 2 ways to prevent components from re-rendering.

`1. Usimg React Pure component for class component or React.memo`
The code snippets for this already explained while answering question 1.

`2. Usimg UseMemo and UseCallback hooks for functional component`

```javascript
import React, { useMemo } from "react";

const MyComponent = (data) => {
  const data = [1, 2, 3, 4, 5, 6, 7];
  const sqrRoot = (data) => {
    return data.map((item) => Math.sqrt(item));
  };
  const memoizedResult = useMemo(() => sqrRoot(data), [data]);
  return <div>{memoizedResult}</div>;
};
```
---------------------------------------------------------------------------------------------------------------------------------

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is a syntax in react which helps to group multiple elements without adding extra element to the DOM tree.It helpt o write cleaner code and avoid unnecessary DOM nesting

```javascript
import React from "react";

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

when we are using CSS selector to give style to the element (mostly nested elements where the style is being given to a particular element) then with frgament in place the structure of DOM changes and the styling of application gets disturb.

---------------------------------------------------------------------------------------------------------------------------------

# 6.Give 3 examples of the HOC pattern.

1. Translation and Language Switching :
   HOC can be used to add Translation and language switching.

```javascript
import React, { useState } from "react";
const i18n = {
  en: {
    search: "Search",
    gptSearchPlaceholder: "What would you like to watch today?",
  },
  hn: {
    search: "खोज",
    gptSearchPlaceholder: "आज आप क्या देखना चाहेंगे?",
  },
  es: {
    search: "buscar",
    gptSearchPlaceholder: "¿Qué te gustaría ver hoy?",
  },
};

const withTranslation=(WrappedComponent, translation)=> {
  // HOC
  return function (props) {
    const [language, setLanguage] = useState("en");

    const translate = (key) => translation[lang][key] || key;

    const changeLanguage = (lang) => {
      setLanguage(lang);
    };

    return (
      <WrappedComponent
        {...props}
        t={translate}
        language={language}
        changeLanguage={changeLanguage}
      />
    );
  };
}

const LanguageDropDownComp = ({ t, language, changeLanguage }) => {
  return (
    <div>
      <p>Current language: {language}</p>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("hn")}>Hindi</button>
      <button onClick={() => changeLanguage("es")}>Spanish</button>
    </div>
  );
};

const LanguageDropDownCompTranslation = withTranslation(
  LanguageDropDownComp,
  i18n
);

export default function App() {
  return (
    <div className="App">
      <LanguageDropDownCompTranslation />
    </div>
  );
}
```

2. Authentication
3. Toggle Functionality

```javascript
import React, { useState } from "react";

const withToggle = (WrappedComponent) => (props) => {
  const [isToggled, setToggled] = useState(false);

  const toggle = () => {
    setToggled((prevToggled) => !prevToggled);
  };

  return <WrappedComponent {...props} isToggled={isToggled} toggle={toggle} />;
};

const ToggleComponent = ({ isToggled, toggle }) => (
  <div>
    <p>{isToggled ? "Toggled On" : "Toggled Off"}</p>
    <button onClick={toggle}>Toggle</button>
  </div>
);

const TogglComponentWithToggle = withToggle(ToggleComponent);

function App() {
  return (
    <div>
      <h1>Toggle Example</h1>
      <TogglComponentWithToggle />
    </div>
  );
}

export default App;
```

--------------------------------------------------------------------------------------------------------------------------------
# 7.What's the difference in handling exceptions in promises, callbacks and async...await?
`All the above are used to handle asynchronous operation in javascript but they differ in the way of handling async operations`

### 1. Callbacks: A callback is a function which is passed as an argument to another function. When dealing with multiple async operations it can lead to callback hell (This can freeze the browser) because of nesting of multiple callbacks

```javascript
let cart = ['iphone11', 'samsungGalaxy', 'One Plus 12']
createOrder(cart, function(orderId){
  proceedToPayment(orderId, function(paymentInfo){
    showOrderSummary(paymentInfo)
  })
})
```
### 2. Promise: The Promise is an object that holds the value of asynchronous operation.As soon as the promise object is filled with the asyn data upon its successfull completion it attaches itself with the callback function with `.then() method`. 
Promise has 3 states:
`1. Pending`
`2. Fulfilled`
`3. Rejected`
Initially the Promise is always in Pending state and as soon as we get the value of the async call the state changes to either fulfilled or Rejected.
The next async calls only happens once we get the value of previous async call which helps to keep the program in our control and overcomes the issue of callback hell.
```javascript
 let promise =  createOrder(cart)
 promise
 .then(function(orderId){
   proceedToPayment(orderId)
 }).then(function(paymentInfo){
   showOrderSummary(paymentInfo)
   })
 })
 ```
### 3. Async Await: The async await handles an asynchronous operation in a synchronous manner and is more readable syntax of handling promise.

```javascript
const orderManagementSystem = async () => {
  try {
    const orderId = await createOrder(cart);
    const paymentInfo = await proceedToPayment(orderId);
    showOrderSummary(paymentInfo);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

--------------------------------------------------------------------------------------------------------------------------------

# 8. How many arguments does setState take and why is it async.

SetState can take 2 arguments which are:

1. newState : This can be either an `Object`or a`function` with prevState as a parameter. If its an Object then react will perform shallow merge and if function then it will compare with prevState and then update the state.

2. callback: This is an optional argument and can be executed once the state has been updated and component has been re-rendered.

```javascript
setState(object | (prevState: object) => object, callback?: () => void)
```

SetState is asyn because because of the single threaded nature of Javascript. React make sure that its not blocking the main thread and batches all state changes into single update. It uses the event loop and task queue to manage asynchronous tasks.This helps in performance optimization.

---------------------------------------------------------------------------------------------------------------------------------

# 9. List the steps needed to migrate a Class to Function Component.

First of all we need to import React in function based component contrary to class based where we were extending React.Component.

1. Update the class based syntanx with functional syntax
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

  componentDidMount() {}

  render() {
    <div>{this.state.data}</div>;
  }
}

// Function Component.
import React, { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  return <div>{data}</div>;
};
```

---------------------------------------------------------------------------------------------------------------------------------

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

### 3. Tailwind CSS( Tailwind is my personal favourite and an example of this is demonstrated in the autocomplete application)

### 4. Styled Components

```javascript
import styled from "styled-components";

const Wrapper = styled.div`
  color: black;
`;

const ParentComponent = () => {
  return <Wrapper>Lorem Ipsum....</Wrapper>;
};
export default ParentComponent;
```

### 5. Global Styles

Along with CSS types mentioned above we can also use some libraries like `Bootsratp` and CSS properties like `flexbox`, `breakpoints` with` media query` to achieve responsiveness.

---------------------------------------------------------------------------------------------------------------------------------

# 11.How to render an HTML string coming from the server.

There are few methods to render an HTML string coming from the server :

1. Using `Dompurify` Library
2. Using `ReactHtmlParser` library
3. using `dangerouslySetInnerHTML` attribute of HTML element.
