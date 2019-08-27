import * as React from "react";
import * as ReactDOM from "react-dom";

import { Default, Switch, Case, If, Else, Repeat } from "react-floco";
import Floco from "react-floco";

const Sample = () => (
  <>
    <h1>Floco Usage Examples</h1>
    <h4>If/Else</h4>
    {/* From default export */}
    <Floco.If condition={true}>
      <>Condition is true</>
    </Floco.If>
    <Floco.If condition={() => true}>
      <>Condition evaluates true</>
    </Floco.If>
    <Floco.If condition={false}>
      <>Condition is true</>
      <Floco.Else>Condition is false</Floco.Else>
    </Floco.If>
    <Floco.If condition={() => false}>
      <>Condition evaluates true</>
      <Floco.Else>Condition evaluates false</Floco.Else>
    </Floco.If>
    {/* From export */}
    <If condition={true}>
      <>Condition is true</>
    </If>
    <If condition={() => true}>
      <>Condition evaluates true</>
    </If>
    <If condition={false}>
      <>Condition is true</>
      <Else>Condition is false</Else>
    </If>
    <If condition={() => false}>
      <>Condition evaluates true</>
      <Else>Condition evaluates false</Else>
    </If>

    <h4>Switch/Case/Default</h4>
    {/* From default export */}
    <Floco.Switch value={1}>
      <Floco.Case for={1}>Case 1</Floco.Case>
      <Floco.Case for={2}>Case 2</Floco.Case>
      <Floco.Default>Case default</Floco.Default>
    </Floco.Switch>
    {/* From export */}
    <Switch value={1}>
      <Case for={1}>Case 1</Case>
      <Case for={2}>Case 2</Case>
      <Default>Case default</Default>
    </Switch>

    <h4>Repeat</h4>
    {/* From default export */}
    <Floco.Repeat times={10}>{({ key }) => <div key={key}>Repeat 10 times</div>}</Floco.Repeat>
    {/* From export */}
    <Repeat times={10}>{({ key }) => <div key={key}>Repeat 10 times</div>}</Repeat>
  </>
);

ReactDOM.render(<Sample />, document.getElementById("sample"));
