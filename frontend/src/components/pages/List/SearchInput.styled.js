import styled from "styled-components";
import styles from "./../../../config/styles";

function calcWidth(value, placeholder){
  const x = value.length 
  const y = placeholder.length 
  return x > y ? x * 0.54 : y * 0.56
}

export const StyledInput = styled.input`
  background: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid 2px transparent;
  font-size: 2.4rem;
  line-height: 1.2;
  max-width: 50vw;
  padding: 0 0 0.25em;
  width: ${props => calcWidth(props.value, props.placeholder)}ch;

  &:hover,
  &:focus{
    border-color: ${styles.base.accent};
    transition: border ease-in-out 0.2s;
  }

  @media screen and (max-width: ${styles.breakpoint.sm}px){
    max-width: calc(100vw - 4.7em);
    width: calc(100vw - 4.7em);
  }

  @media screen and (max-width: ${styles.breakpoint.xs}px){
    font-size: 1.4rem;
  }
`