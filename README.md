<h1 align="center">react-floco</h1>
<p align="center">Declarative flow control library for React</p>

<p align="center">
  <a href="https://travis-ci.org/dacre-denny/react-floco">
    <img src="https://travis-ci.org/dacre-denny/react-floco.svg?branch=master" alt="build">
  </a>
  <a href="https://coveralls.io/github/dacre-denny/react-floco?branch=master">
    <img src="https://coveralls.io/repos/github/dacre-denny/react-floco/badge.svg?branch=master" alt="Coverage Status">
  </a>
  <a href="https://www.npmjs.com/package/react-floco">
    <img src="https://img.shields.io/npm/dm/react-svg" alt="Downloads">
  </a>
  <a href="https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dacre-denny/react-floco&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/ddc6850a2f2b4f94a621ab40ce22e557"/></a>
</p>

---

## Quick Start

```
npm install --save react-floco
```

```
import { Switch, Case, Default } from 'react-floco';

/* 
Renders a status based on color prop 
*/
function Status (props) {

    return (<Switch value={props.color}>
        <Case for={"red"}>Danger!</Case>
        <Case for={"orange"}>Warning!</Case>
        <Case for={"green"}>All's well</Case>
        <Default>Unknown</Default>
    </Switch>);
}
```

## Features

-   Declarative flow control:
    -   [Switch statements](###Switch-statements)
    -   [Conditional statements](###Conditional-statements)
    -   [Count controlled loop](###Count-controlled-loops)

-   Support for [asynchronous evaluation and rendering](##Asynchronous-support)

-   Typescript support

## Library

### Switch statements

Use the `<Switch>` and `<Case>` components to render a badge name from a number of known code. The `<Default>` component is used to render a result in the case of no value match:

```jsx
import { Switch, Case, Default } from 'react-floco';

function UserBadge (props) {

    return (<Switch value={props.user.badgeCode}>
        <Case for={"p"}>Platinum badge</Case>
        <Case for={"g"}>Gold badge</Case>
        <Case for={"s"}>Silver badge</Case>
        <Case for={"b"}>Bonze badge</Case>
        <Default>No badge earned</Default>
    </Switch>);
}
```

The `<Switch>` and `<Case>` components allow matching across mixed value types on the `for` prop of `<Case>` components:

```jsx
<Switch value={data}>
    <Case for={1}>Data {data} is a number</Case>
    <Case for={true}>Data {data} is a boolean</Case>
    <Case for={'foo'}>Data {data} is a string</Case>
</Switch>
```

### Conditional statements

The `<If>` and `<Else>` components to perform conditional rendering declaratively:

```jsx
import { If, Else } from 'react-floco';

function RenderResponse (props) {

    return (<If condition={ props.response.ok }>
        Got successful response. Everything worked as expected.
        <Else>Something went wrong. Error code: {props.response.code}</Else>
    </If>);
}
```

### Count controlled loops

Components can be rendered multiple times using the `<Repeat>` component. Unlike other components in this library, `<Repeat>` renders children by a callback function. The callback is passed a unique numerical `key` prop that corresponds to the current render iteration:

```jsx
import { Repeat, If, Else } from 'react-floco';

function ItemsOrPlaceholders (props) {

    return (<If condition={props.loading}>
        <Repeat times={5}>{ ({ key }) => <Placeholder key={key} /> }</Repeat>
        <Else>{ props.items.map(item => <Item item={item} />) }</Else>
    </If>);
}
```

The `<Repeat>` component will automatically pass any `props` that are applied to it, through to the render callback:

```jsx
<Repeat times={5} name={userName} age={userAge}>
    { (props) => <UserItem {...props} /> {/* props contains name and age */} }
</Repeat>
```

## Asynchronous support

The `<Switch>` and `<If>` components support asynchronous evaluation and rendering. If a callback function that returns a `Promise` is supplied to the `value` prop of the `<Switch>` component, the resolved value will be used to determine the `<Case>` to render:

```jsx
<Switch value={() => fetchUserStatus()}>
    <Case for={"offline"}>User has left the building!</Case>
    <Case for={"online"}>The user is online</Case>
</Switch>
```

If an asynchronous `value` fails to resolve then any `<Default>` blocks that are present will be rendered:

```jsx
<Switch value={Promise.reject()}>
    <Case for={true}>Impossible!</Case>
    <Default>Either no matching case exists, or the value promise was rejected..</Default>
</Switch>
```

The `<Loading>` component can be used in tandem with asynchronous rendering. The `<Loading>` component(s) are only rendered while the `Promise` on the `value` prop is in a pending state:

```jsx
<Switch value={() => fetchEmotion()}>
    <Loading>I'm busy figuring someone out..</Loading>
    <Case for={'happy'}>I figured out they're happy!</Case>
    <Case for={'sad'}>I think they're sad!</Case>
    <Default>I couldn't read them..</Default>
</Switch>
```

Asynchronous rendering is possible in the same way for the `<If>` component:

```jsx
<If value={() => fetchIsHeadsFromTails()}>
    <Loading>The coin is spinning..</Loading>
    <>Landed on heads!</>
    <Else>Landed on tails!</Else>
</If>
```

## Duplicate branching

Duplicate branching is supported for `<If>` and `<Switch>` components:

```jsx
<Switch value={userAge}>
    <Case for={1}>You're one year old</Case>
    <Case for={45}>You're forty five</Case>
    <Case for={100}>You're one hundred</Case>
    <hr />
    <Case for={1}>You are a baby</Case>
    <Case for={45}>You are an adult</Case>
    <Case for={100}>You are old</Case>
    <Default>I don't know what to say</Default>
</Switch>

<If condition={isSunny}>
    {/* Rendered when sunny */}
    <>It's sunny</> 
    <Else>It's not sunny</Else>
    <hr/>
    {/* Also rendered when sunny */}
    <>(Wear sunscreen)</>
</If>
```

## API

| Component | Prop      | Type           | Required | Description                                                                                                                                                                                                                                                                                                                                                                            |
| --------- | --------- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Switch    | value     | object         | yes      | Controls rendering of one or more matching child Case components of the Switch statement. If a function is provided, it is invoked and the result is used for Case matching. If an asynchronous value is encountered, any Loading children components will be rendered while the asynchronous function is in a pending state. If a value is resolved it will be used for Case matching and, if the promise is rejected, any Default blocks that are present will be rendered.|
| Case      | for       | object         | yes      | The value for which this Case is rendered.                                                                                                                                                                                                                                                                                                                                                   |
| If        | condition | bool, function | yes      | Controls the rendering result of the If statement where falsey will render the contents of any child Else components, and truthy will render non-Else children components. If a function is supplied, it is invoked and the result is interpreted as truthy or falsey to determine the rendered result of the If component. If the condition is asynchronous, any Loading components present will be rendered while the asynchronous function is in a pending state. A promise that resolves to a truthy value causes the If content to be rendered, otherwise a falsey value or rejected promise will cause any Else children to be rendered if present. |
| Repeat    | times     | number         | yes      | The number of times that children components are rendered                                                                                                                                                                                                                                                                                                                              |

## Run tests

```bash
$ npm run test
```

## Run examples

```bash
$ docker-compose up
```

## License

Licensed under MIT
