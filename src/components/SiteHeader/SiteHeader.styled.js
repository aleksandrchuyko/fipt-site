import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


export const HeaderLink = styled(NavLink)`
  display: inline-block;
  padding: 10px 20px;

  &.active {
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
  }
  :hover:not(.active) {
    color: ${p => p.theme.colors.primary};
  }
`;