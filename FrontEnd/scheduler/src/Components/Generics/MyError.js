import React from "react";

export default function myError(props)
{
    const thisError = props.error;
    return (<h1> {thisError} </h1>);
}