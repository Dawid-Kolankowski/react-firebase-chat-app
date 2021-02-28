import styled, { css } from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const StyledToastContainer = styled(ToastContainer)`
  > div {
    border-radius: 0.5rem;
  }
`

export const ScrollStyling = css`
  ::-webkit-scrollbar {
    width: 4px; /* width of the entire scrollbar */
    margin-left: -10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(
      128,
      128,
      128,
      0.171
    ); /* color of the scroll thumb */
    border-radius: 100px; /* roundness of the scroll thumb */
  }
`
