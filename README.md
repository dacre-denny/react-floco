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
    <img src="https://img.shields.io/npm/dm/react-floco" alt="Downloads">
  </a>
  <a href="https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dacre-denny/react-floco&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/ddc6850a2f2b4f94a621ab40ce22e557"/></a>
</p>

---

## Quick Start

```bash
npm install --save react-floco
```

```jsx
import { Switch, Case, Default } from 'react-floco';

/* 
Renders a status based on color 
*/
function StatusFromColor (props) {

    return (<Switch value={props.color}>
        <Case for={"red"}>Danger!</Case>
        <Case for={"orange"}>Warning!</Case>
        <Case for={"green"}>All's well</Case>
        <Default>Unknown</Default>
    </Switch>);
}
```

## Features

-   Declarative flow control for:
    -   [Switch statements](#Switch-statements)
    -   [Conditional statements](#Conditional-statements)
    -   [Count controlled loop](#Count-controlled-loops)

-   Support for [asynchronous evaluation and rendering](#Asynchronous-support)

-   Typescript support

## Component library

### Switch statements

The `<Switch>` component controls rendering of child `<Case>` components where the `for` prop matches the current `value` of that `<Switch>`. Together, these components mimic the behavior of [switch-case statements](https://en.wikipedia.org/wiki/Control_flow#Case_and_switch_statements) for component rendering:

```jsx
import { Switch, Case, Default } from 'react-floco';

/**
 * Render a badge type based on the badgeCode prop
 */
function UserBadge (props) {

    return (<Switch value={props.badgeCode}>
        <Case for={"p"}>Platinum badge</Case>
        <Case for={"g"}>Gold badge</Case>
        <Case for={"s"}>Silver badge</Case>
        <Case for={"b"}>Bonze badge</Case>
        <Default>No badge earned</Default>
    </Switch>);
}

```

The `<Switch>` component also allows for matching across mixed value types for `<Case>` components:

```jsx
<Switch value={data}>
    <Case for={1}>Data {data} is a number</Case>
    <Case for={true}>Data {data} is a boolean</Case>
    <Case for={'foo'}>Data {data} is a string</Case>
</Switch>
```

Multiple `<Case>` components for the same `value` case are also possible:

```jsx
<Switch value={data}>
    <Case for={1}>Data is a number</Case>
    <Case for={true}>Data is a boolean</Case>
    <hr/>
    <Case for={true}>Data is not false</Case>
    <Case for={1}>Data is less than 5</Case>
</Switch>
```

The `value` prop also supports callback functions - the switch automatically invokes the function and will use the result for `<Case>` matching. [Asynchronous values and functions](#Asynchronous-support) are also supported:

```jsx
<Switch value={() => getUserStatus()}>
    <Case for={"online"}>User is onboard!</Case>
    <Case for={"offline"}>User isn't around..</Case>
    <Default>Hmm, not sure..</Default>
</Switch>
```

### Conditional statements

The `<If>` component controls rendering of child content when the `condition` prop evaluates "truthy". If `<Else>` child components are present, they will be rendered when `condition` is evaluated "falsey":

```jsx
import { If, Else } from 'react-floco';

/**
 * Render a human friendly message based on responseIsOk prop
 */
function RenderResponse (props) {

    return (<If condition={ props.responseIsOk }>
        Got successful response. Everything worked as expected!
        <Else>Something went wrong.</Else>
    </If>);
}
```

As with the `<Case>` and `<Default>` components, multiple `<Else>` components are allowed for a single `<If>` component. All `<Else>` components will be rendered when `condition` evaluates "falsey":

```jsx
<If condition={isError}>
    <p>Something went wrong!</p>
    <Else>Phew..</Else>
    <hr/>
    <Else>No error. Everything went as expected!</Else>
</If>
```

Like the `value` prop for `<Switch>`, the `condition` prop also supports callback functions as well as [promises](#Asynchronous-support):

```jsx
<If condition={() => isLoggedIn()}>
    <p>Welcome friend!</p>
    <Else>Who goes there?</Else>
</If>
```

### Count controlled loops

The `<Repeat>` component allows a single component to be rendered multiple times. Unlike `<Switch>` and `<If>`, the `<Repeat>` component renders children via a callback function. The render callback passes a unique `key` prop that corresponds to the current iteration index:

```jsx
import { Repeat } from 'react-floco';

/**
 * Renders an annoying list of questions
 */
function AnnoyingList (props) {

    return (<Repeat times={props.count}>
    { ({ key }) => <p key={key}>Are we there yet?</p> }
    </Repeat>);
}
```

The render callback will automatically pass through any additional `props` that are passed to `<Repeat>`:

```jsx
<Repeat times={5} name={'Bob'} age={32}>
    { /* props contains name and age */ }
    { (props) => <UserItem {...props} /> }
</Repeat>
```

## Asynchronous support

The `<Switch>` and `<If>` components support asynchronous evaluation and rendering. If a `Promise` is passed to the `value` prop of the `<Switch>` component, then cases will be matched on the resolved value:

```jsx
<Switch value={fetchUserStatus}>
    <Case for={"offline"}>User has left the building!</Case>
    <Case for={"online"}>The user is online</Case>
</Switch>
```

If an asynchronous `value` is rejected then any `<Default>` blocks that are present will be rendered:

```jsx
<Switch value={Promise.reject()}>
    <Case for={true}>Impossible!</Case>
    <Default>Either no matching case exists, or the value promise was rejected..</Default>
</Switch>
```

The `<Loading>` component can be used in tandem with asynchronous rendering. The `<Loading>` component(s) are only rendered if the `value` props `Promise` is in a pending state:

```jsx
<Switch value={fetchEmotion}>
    <Loading>I'm busy figuring someone out..</Loading>
    <Case for={'happy'}>I figured out they're happy!</Case>
    <Case for={'sad'}>I think they're sad!</Case>
    <Default>I couldn't read them..</Default>
</Switch>
```

The `<If>` component supports asynchronous rendering in the same way:

```jsx
<If value={fetchIsHeadsFromTails}>
    <Loading>The coin is spinning..</Loading>
    <p>Landed on heads!</p>
    <Else>Landed on tails!</Else>
</If>
```

## API

| Component     | Prop        | Type           | Required | Description                                                                                                                                                          |
| ------------- | ----------- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Switch>`    | `value`     | object         | yes      | Specifies the value that Case children will be matched against. If a function is specified, then it is invoked during rendering and the result is used for matching. |
| `<Case>`      | `for`       | object         | yes      | The value that this case is rendered for.                                                                                                                            |
| `<If>`        | `condition` | bool, function | yes      | Determines if the content of the component is rendered. The component is rendered if a truthy value or a function that returns a truthy value, is specified.         |
| `<Repeat>`    | `times`     | number         | yes      | The number of times that children are rendered.                                                                                                                      |

## Run tests

```bash
npm run test
```

## Run examples

```bash
docker-compose up
```

## License

Licensed under MIT
