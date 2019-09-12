<h1 align="center">react-floco</h1>
<p align="center">Declarative flow control library for React</p>

<p align="center">
  <a href="https://travis-ci.org/dacre-denny/react-floco">
    <img src="https://api.travis-ci.org/dacre-denny/react-svg?branch=master" alt="build">
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

  * Declarative rendering primitives that mimic flow control for
      * Switch statements
      * Conditional if statements
      * Count controlled loops
  * Support for asynchronous evaluation and rendering
  * Typescript support

## Examples

Use the Switch and Case components to render a badge name from a number of known code. The Default component is used to render a result in the case of no value match:

```
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

Use the If and Else components to perform conditional rendering declaratively:

```
import { If, Else } from 'react-floco';

function RenderResponse (props) {

    return (<If condition={ props.response.ok }>
        Got successful response. Everything worked as expected.
        <Else>Something went wrong. Error code: {props.response.code}</Else>
    </If>);
}
```

Use the Repeat component to render a component multiple times:

```
import { Repeat, If, Else } from 'react-floco';

function ItemsOrPlaceholders (props) {

    return (<If condition={props.loading}>
        <Repeat times={5}>{ ({ key }) => <Placeholder key={key} /> }</Repeat>
        <Else>{ props.items.map(item => <Item item={item} />) }</Else>
    </If>);
}
```

## Usage

### Conditional rendering with Switch, Case and Default

The Switch component mimics the behavior of a regular [switch statement](https://en.wikipedia.org/wiki/Switch_statement) during rendering. The Switch will render any Case child that matches the current `value` prop of the Switch. If no match occurs and one or more Default component are present, then those will be rendered:

```
    <Switch value={age}>
        <Case for={1}>You're one</Case>
        <Case for={2}>You're two</Case>
        <Case for={3}>You're three</Case>
        <Default>You're old!</Default>
    </Switch>
```

Multiple Case matches are possible:

```
    <Switch value={role}>
        <Case for={'admin'}>As an administrator you have total control</Case>
        <Case for={'user'}>Contact your system administrator if you need help</Case>
        <Case for={'admin'}><a href="/admin/area">Admin area</button></Case>
        <Default>Please <a href="/login">login</a></Default>
    </Switch>
```

Matches across mixed types are possible:

```
    <Switch value={data}>
        <Case for={1}>Data is a number</Case>
        <Case for={true}>Data is a boolean</Case>
    </Switch>
```

The value prop can be an actual value or a function. Asynchronous functions are also supported and can be coupled with a Loading component:

```
    <Switch value={() => fetchUserRole()}>
        <Loading>Determining your privileges</Loading>
        <Case for={'admin'}>You have full privileges</Case>
        <Case for={'user'}>You have limited privileges</Case>
    </Switch>
```

### Conditional rendering with If and Else

The If component mimics the behavior of a [conditional statement](<https://en.wikipedia.org/wiki/Control_flow#If-then-(else)_statements>) to provide declarative conditional rendering. The If component will render when the `condition` prop evaluates to `true`. If the condition evaluates to `false` and an Else component is present, then that will be rendered instead:

```
    <If condition={isExpert}>
        <p>You are at the top of your game</p>
        <Else><a href="/up-skill">Click here to up skill</a></Else>
    </Switch>
```

Multiple Else components are possible:

```
    <If condition={didSucceed}>
        <Else>You failed</Else>
        <b>You passed</b>
        <Else><a href="/retry>Try again</a></Else>
    </If>
```

The `condition` prop can be a boolean value or a function that returns a boolean result. Asynchronous functions are supported and can be coupled with a Loading component:

```
    <If condition={() => fetchIsLoggedIn()}>
        You're logged in!
        <Loading>Please wait...</Loading>
        <Else>You are not logged in :(</Else>
    </If>
```

### Rendering multiple components with Repeat

The Repeat component mimics the behavior of a [count controlled loop](https://en.wikipedia.org/wiki/Control_flow#Count-controlled_loops), providing a declarative means of rendering a component multiple times. The Repeat component renders children via a callback function through which a `key` for the current iteration is provided:

```
    <Repeat times={5}>
        ({ key }) => <p key={key}>I render five times</p>
    </Repeat>
```

The Repeat component also allows transmission of additional props to the callback function:

```
    <Repeat times={10} greet={"Bob"} >
        ({ key, greet }) => <p key={key}>Hi { greet}! I render ten times</p>
    </Repeat>
```

## API

| Component | Prop      | Type           | Required | Description                                                                                                                                                                                                                                                                                                                                                                            |
| --------- | --------- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Switch    | value     | object         | yes      | The value that Case components of the Switch are matched against. If a function is provided, the function will be invoked and the result of that function will be used for Case matching. If the function is asynchronous, any Loading components will be rendered while the asynchronous function is running and, if a value is resolved, that will be used for Case matching.        |
| Case      | for       | object         | yes      | The value that represents this case.                                                                                                                                                                                                                                                                                                                                                   |
| If        | condition | bool, function | yes      | The condition that determines if the contents of the component is rendered. If a function is supplied, the contents of the If component will be rendered if that function returns true. If the function is asynchronous, any Loading components will be rendered while the asynchronous function is running and, if a true value is resolved, the contents of the If will be rendered. |
| Repeat    | times     | number         | yes      | The number of times that children components are rendered                                                                                                                                                                                                                                                                                                                              |

## Run tests

```
npm run test
```

## Run examples

```
docker-compose up
```

## License

Licensed under MIT
