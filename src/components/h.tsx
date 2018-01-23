import * as React from "react";

export interface HelloProps {
    compiler,
    framework : string;
}

export const Hello = (props) => <h1>Hello from {props.compiler}
    and {props.framework}!</h1>;