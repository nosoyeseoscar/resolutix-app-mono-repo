import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../theme'

export const StyledLink = styled(Link)`
    color: ${colors.primary};
    text-decoration: none;

    &:hover{
        border-bottom: 2px solid ${colors.primary};
    }
`
