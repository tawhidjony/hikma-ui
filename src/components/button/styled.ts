import styled from 'styled-components'
import { UiButtonProps } from './types';



export const ButtonStyle = styled.button<UiButtonProps>`
  background: ${(props) => (props.primary ? '#f5f5f5' : '#f5f5f5')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};
  font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '0.75em';
      case 'large':
        return '1.5em';
      default:
        return '1em';
    }
  }};
  margin: 1em;
  padding: ${(props) => {
    switch (props.size) {
      case 'small':
        return '0.25em 0.5em';
      case 'large':
        return '0.5em 2em';
      default:
        return '0.25em 1em';
    }
  }};
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? '#d45d79' : '#f7d6db')};
  }
`;