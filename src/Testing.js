import React from 'react'
import styled from 'styled-components'

export default function Testing() {
    return (
    <Wrapper>
        <h3>Hello World</h3>
        <p>Helloe People</p>
        <button>CLick me</button>
    </Wrapper>
    )
}

const Wrapper = styled.section`
    h3{
        color: red;
    }
`
