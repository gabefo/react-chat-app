import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
}))

export default function Intro() {
  const theme = useTheme()

  return (
    <Root>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width={300} height={300}>
        <defs>
          <clipPath id="clip-path">
            <rect x="177.23" y="129.81" width="144.32" height="261.93" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="background-simple">
          <path
            d="M320.59,115.14c-5.36-2.3-10.8-4.46-16.27-6.59-23.29-9-47.24-16.9-72.09-20.22C184.43,82,136.37,94.81,108,136.22a116.17,116.17,0,0,0-17.52,88.87c12.09,56.34,64.79,87.24,115.59,104.13,31.9,10.6,64.51,20,98.15,11.76,39.39-9.66,72.94-40.22,88.32-77.56,14.54-35.31,12.37-77-12.16-107.23C366,138.51,341.33,124.05,320.59,115.14Z"
            fill={theme.vars.palette.action.disabledBackground}
          ></path>
        </g>
        <g id="character">
          <rect
            x="177.54"
            y="111.44"
            width="144.32"
            height="304.79"
            rx="14.62"
            fill={theme.vars.palette.primary.main}
          ></rect>
          <rect
            x="177.54"
            y="111.44"
            width="144.32"
            height="304.79"
            rx="14.62"
            fill="#fff"
            fillOpacity="0.7"
          ></rect>
          <rect
            x="181.4"
            y="110.92"
            width="144.32"
            height="304.79"
            rx="14.62"
            fill={theme.vars.palette.primary.main}
          ></rect>
          <rect
            x="181.4"
            y="110.92"
            width="144.32"
            height="304.79"
            rx="14.62"
            fillOpacity="0.2"
          ></rect>
          <path
            d="M259.19,402.28a6.51,6.51,0,1,1-6.5-6.5A6.5,6.5,0,0,1,259.19,402.28Z"
            fill={theme.vars.palette.primary.main}
          ></path>
          <path
            d="M259.19,402.28a6.51,6.51,0,1,1-6.5-6.5A6.5,6.5,0,0,1,259.19,402.28Z"
            fillOpacity="0.4"
          ></path>
          <polygon
            points="324.56 392.75 180.96 392.75 180.96 130.83 325.56 130.83 324.56 392.75"
            fill={theme.vars.palette.primary.main}
          ></polygon>
          <polygon
            points="325.83 392.61 180.88 392.78 180.88 130.85 325.7 130.7 325.83 392.61"
            fill="#fff"
            fillOpacity="0.8"
          ></polygon>
          <rect
            x="169.03"
            y="135.22"
            width="1"
            height="13.22"
            fill={theme.vars.palette.primary.main}
            fillOpacity="0.33"
          ></rect>
          <rect
            x="169.03"
            y="152.11"
            width="1"
            height="4.14"
            fill={theme.vars.palette.primary.main}
            fillOpacity="0.33"
          ></rect>
          <rect x="184.95" y="141.67" width="119.49" height="79.34" rx="9.94" fill="#fff"></rect>
          <circle
            cx="203.26"
            cy="159.99"
            r="13.23"
            transform="translate(-45.99 90.8) rotate(-22.69)"
            fill={theme.vars.palette.primary.main}
            fillOpacity="0.27"
          ></circle>
          <path
            d="M214.18,160a10.71,10.71,0,0,1-1.32,5.2,10.92,10.92,0,1,1,1.32-5.2Z"
            fill="#fff"
          ></path>
          <path
            d="M212.86,165.19a10.92,10.92,0,0,1-19.2,0,17.29,17.29,0,0,1,19.2,0Z"
            fill={theme.vars.palette.primary.main}
            fillOpacity="0.27"
          ></path>
          <circle
            cx="203.26"
            cy="156.25"
            r="4.86"
            fill={theme.vars.palette.primary.main}
            fillOpacity="0.27"
          ></circle>
          <rect x="184.95" y="228.34" width="119.49" height="27.77" rx="7.33" fill="#fff"></rect>
          <path
            d="M324.75,258.8l14.13,38.94a4.1,4.1,0,0,1-2.45,5.23L262.3,329.86a4.1,4.1,0,0,1-5.23-2.44l-14.13-38.95a4.08,4.08,0,0,1,2.45-5.22l74.13-26.9a4.1,4.1,0,0,1,5.23,2.45Z"
            fill={theme.vars.palette.primary.main}
            fillOpacity="0.6"
          ></path>
          <path
            d="M322.51,256.44l-21.19,34.87a16.59,16.59,0,0,1-19.55,7.09l-38.62-13.18a4.08,4.08,0,0,1,2.24-2l74.13-26.9A4.1,4.1,0,0,1,322.51,256.44Z"
            fill={theme.vars.palette.primary.main}
          ></path>
          <path
            d="M322.51,256.44l-21.19,34.87a16.59,16.59,0,0,1-19.55,7.09l-38.62-13.18a4.08,4.08,0,0,1,2.24-2l74.13-26.9A4.1,4.1,0,0,1,322.51,256.44Z"
            fill="#fff"
            fillOpacity="0.5"
          ></path>
          <path
            d="M301.5,325.73l-.68,35.08a3.47,3.47,0,0,1-3.52,3.39l-66.79-1.3a3.45,3.45,0,0,1-3.38-3.52l.67-35.08a3.51,3.51,0,0,1,1.15-2.51,3.46,3.46,0,0,1,2.37-.88l66.79,1.29a3.47,3.47,0,0,1,3.39,3.53Z"
            fill={theme.vars.palette.primary.main}
            fillOpacity="0.6"
          ></path>
          <path
            d="M300.45,323.18,273.09,344.3a14.08,14.08,0,0,1-17.62-.34L229,321.79a3.46,3.46,0,0,1,2.37-.88l66.79,1.29A3.46,3.46,0,0,1,300.45,323.18Z"
            fill={theme.vars.palette.primary.main}
          ></path>
          <path
            d="M300.45,323.18,273.09,344.3a14.08,14.08,0,0,1-17.62-.34L229,321.79a3.46,3.46,0,0,1,2.37-.88l66.79,1.29A3.46,3.46,0,0,1,300.45,323.18Z"
            fill="#fff"
            fillOpacity="0.5"
          ></path>
          <path
            d="M234.13,119.17a2.3,2.3,0,1,1,2.3,2.31A2.3,2.3,0,0,1,234.13,119.17Z"
            fill={theme.vars.palette.primary.main}
          ></path>
          <path
            d="M244.38,116.87h19.11a2.31,2.31,0,0,1,2.3,2.3h0a2.31,2.31,0,0,1-2.3,2.31H244.38a2.31,2.31,0,0,1-2.3-2.31h0A2.31,2.31,0,0,1,244.38,116.87Z"
            fill={theme.vars.palette.primary.main}
          ></path>
          <path
            d="M234.13,119.17a2.3,2.3,0,1,1,2.3,2.31A2.3,2.3,0,0,1,234.13,119.17Z"
            fillOpacity="0.4"
          ></path>
          <path
            d="M244.38,116.87h19.11a2.31,2.31,0,0,1,2.3,2.3h0a2.31,2.31,0,0,1-2.3,2.31H244.38a2.31,2.31,0,0,1-2.3-2.31h0A2.31,2.31,0,0,1,244.38,116.87Z"
            fillOpacity="0.4"
          ></path>
          <rect
            x="312.38"
            y="163.21"
            width="17.55"
            height="37.05"
            rx="4.01"
            fill={theme.vars.palette.primary.main}
          ></rect>
          <rect
            x="312.38"
            y="163.21"
            width="17.55"
            height="37.05"
            rx="4.01"
            fill="#fff"
            fillOpacity="0.8"
          ></rect>
          <rect
            x="312.38"
            y="210.95"
            width="17.55"
            height="20.9"
            rx="3.01"
            fill={theme.vars.palette.primary.main}
          ></rect>
          <rect
            x="312.38"
            y="210.95"
            width="17.55"
            height="20.9"
            rx="3.01"
            fill="#fff"
            fillOpacity="0.8"
          ></rect>
          <g clipPath="url(#clip-path)">
            <rect x="177.23" y="129.81" width="144.32" height="261.93" fill="none"></rect>
            <polygon
              points="198.98 385.43 206.33 386.14 213.98 368.65 206.63 367.93 198.98 385.43"
              fill="#e4897b"
            ></polygon>
            <polygon
              points="124.37 331.86 128.56 338.21 144.62 330.54 140.42 324.18 124.37 331.86"
              fill="#e4897b"
            ></polygon>
            <polygon
              points="213.98 368.65 210.04 377.67 202.37 377.67 206.62 367.93 213.98 368.65"
              fill="#ce6f64"
            ></polygon>
            <polygon
              points="140.42 324.19 144.61 330.54 136.34 334.49 132.14 328.14 140.42 324.19"
              fill="#ce6f64"
            ></polygon>
            <path
              d="M281.63,206.42l.24.54.31.63c.2.42.43.85.66,1.28.47.85,1,1.71,1.5,2.53a46.66,46.66,0,0,0,3.47,4.82,52.2,52.2,0,0,0,4.09,4.32c.75.66,1.48,1.34,2.26,2l1.17.92.27.22s0,0,0,0a2,2,0,0,0-.39-.08,1.71,1.71,0,0,0-.85.13.88.88,0,0,0-.42.27c-.07.1.11-.06.26-.32a11,11,0,0,0,.93-2.3,49.92,49.92,0,0,0,1.29-5.91c.34-2.06.62-4.17.84-6.28s.45-4.26.65-6.36l3.86-.06c.24,2.23.34,4.4.43,6.62s.05,4.42,0,6.67a45.64,45.64,0,0,1-.79,6.89,17.05,17.05,0,0,1-1.21,3.8,8,8,0,0,1-1.62,2.31,5.5,5.5,0,0,1-1.8,1.13,5.26,5.26,0,0,1-2.44.3,5.87,5.87,0,0,1-1.92-.6,7.59,7.59,0,0,1-.7-.4l-.38-.25-1.46-1c-1-.66-1.88-1.39-2.79-2.12a48.47,48.47,0,0,1-5.05-4.88,50.63,50.63,0,0,1-4.27-5.59c-.64-1-1.23-2-1.8-3-.28-.53-.55-1.05-.81-1.6l-.38-.85c-.13-.3-.23-.54-.39-.95Z"
              fill="#e4897b"
            ></path>
            <polygon
              points="285.01 211.59 278.29 220.86 281.07 223.59 288.22 214.99 285.01 211.59"
              fill="#f5f5f5"
            ></polygon>
            <path
              d="M274.47,199.36c7.57,2,12.79,12.62,12.79,12.62l-8.74,12.25S268,211,268.27,206.82C268.53,202.44,269.91,198.13,274.47,199.36Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M274.47,199.36c7.57,2,12.79,12.62,12.79,12.62l-8.74,12.25S268,211,268.27,206.82C268.53,202.44,269.91,198.13,274.47,199.36Z"
              fill="#fff"
              fillOpacity="0.7"
            ></path>
            <path
              d="M281,203.27s2.49,2.94-26.33,37.82L228,225.47c6.8-10.59,10.73-17.28,18.58-42.6A90.92,90.92,0,0,1,258.8,188a112.16,112.16,0,0,1,12.12,7.09C275.84,198.61,281,203.27,281,203.27Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M281,203.27s2.49,2.94-26.33,37.82L228,225.47c6.8-10.59,10.73-17.28,18.58-42.6A90.92,90.92,0,0,1,258.8,188a112.16,112.16,0,0,1,12.12,7.09C275.84,198.61,281,203.27,281,203.27Z"
              fill="#fff"
              fillOpacity="0.7"
            ></path>
            <path
              d="M277.54,200.26c-1.88-1.56-4.29-3.49-6.62-5.17A99,99,0,0,0,258.8,188c-2.36-1.23-4.78-2.31-6.84-3.13-.33.55-.06,2.23.95,4.69,3.84,4.95,12.76,12.24,20.2,13.69C276.57,202.75,277.65,201.65,277.54,200.26Z"
              fill="#f5f5f5"
            ></path>
            <path
              d="M252.91,189.56a54.24,54.24,0,0,0,8.85,13.72,57.13,57.13,0,0,0,11.35,0C265.67,201.8,256.75,194.51,252.91,189.56Z"
              fill="#f5f5f5"
            ></path>
            <path
              d="M254.7,241.09s.43,68.52-11.72,88.3c-12.64,20.57-29.12,45.66-29.12,45.66l-14.27-.69s16.64-37.12,22.92-54.35c8.65-23.75,12.65-90.36,12.65-90.36Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M254.7,241.09s.43,68.52-11.72,88.3c-12.64,20.57-29.12,45.66-29.12,45.66l-14.27-.69s16.64-37.12,22.92-54.35c8.65-23.75,12.65-90.36,12.65-90.36Z"
              fillOpacity="0.4"
            ></path>
            <path
              d="M239.52,243a28.87,28.87,0,0,0-5.89,6.85c-.45,5.1-1,10.83-1.63,16.83C236.35,260.77,239.79,250.4,239.52,243Z"
              fillOpacity="0.2"
            ></path>
            <path
              d="M247.65,237s-30.19,42.86-49,66c-15.2,18.65-59.2,32-59.2,32l-5.37-9s35-19.54,45.44-32.16c33.42-40.4,33-61.35,48.52-68.26Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M247.65,237s-30.19,42.86-49,66c-15.2,18.65-59.2,32-59.2,32l-5.37-9s35-19.54,45.44-32.16c33.42-40.4,33-61.35,48.52-68.26Z"
              fillOpacity="0.4"
            ></path>
            <path d="M298,203.77l-2-8,7.63,2.22s-.21,5.38-2.85,7.13Z" fill="#e4897b"></path>
            <polygon
              points="298.43 189.35 303.79 192.06 303.66 198.03 296.03 195.81 298.43 189.35"
              fill="#e4897b"
            ></polygon>
            <path d="M202.58,192.29l-7-4.3,7-3.74s3.59,4,2.93,7.1Z" fill="#e4897b"></path>
            <polygon
              points="192.81 181.68 198.54 179.88 202.62 184.25 195.59 187.99 192.81 181.68"
              fill="#e4897b"
            ></polygon>
            <path
              d="M130.32,337.54l-2.49-8.18a.61.61,0,0,0-.68-.42l-6.75,1a1.22,1.22,0,0,0-.94,1.56c.92,2.83,1.5,4.16,2.6,7.75.67,2.22,1.84,7.21,2.77,10.27s4,2.3,3.89.94c-.51-6.08.49-9.19,1.52-11.6A2,2,0,0,0,130.32,337.54Z"
              fill="#263238"
            ></path>
            <path
              d="M207.31,383.87h-9a.74.74,0,0,0-.71.55l-2,7.15a1.11,1.11,0,0,0,1.1,1.42c3.16-.05,4.7-.23,8.67-.23,2.44,0,8.76.25,12.13.25s4-3.34,2.63-3.64c-6.13-1.35-9.65-3.22-11.54-5A1.87,1.87,0,0,0,207.31,383.87Z"
              fill="#263238"
            ></path>
            <path
              d="M228.53,223.67l-2.6,1.69c-.2.13-.09.45.22.63l28,16.37c.24.14.51.14.61,0l1.64-2.25c.11-.16,0-.42-.28-.57l-27-15.81A.56.56,0,0,0,228.53,223.67Z"
              fill="#263238"
            ></path>
            <path
              d="M244.39,194.34c-1.89,1.51-3.69,2.73-5.6,4s-3.85,2.36-5.85,3.44a68,68,0,0,1-12.61,5.33c-.54.19-1.12.32-1.67.47s-1.08.3-1.74.44a12.9,12.9,0,0,1-4.37.22,10.72,10.72,0,0,1-4.36-1.52,12.06,12.06,0,0,1-3.19-2.94,19.37,19.37,0,0,1-3.12-6.87,24.59,24.59,0,0,1-.64-3.47,25.18,25.18,0,0,1-.23-3.52l3.84-.33a36,36,0,0,0,1.87,5.71,14.82,14.82,0,0,0,2.91,4.58,4.94,4.94,0,0,0,3.54,1.66,7.06,7.06,0,0,0,2.08-.33c.87-.28,1.89-.6,2.82-.94A74.64,74.64,0,0,0,229.2,195c1.82-1,3.56-2.15,5.32-3.26s3.49-2.36,5-3.5Z"
              fill="#e4897b"
            ></path>
            <polygon
              points="232.02 191.72 235.48 202.18 238.73 200.23 235.69 189.86 232.02 191.72"
              fill="#f5f5f5"
            ></polygon>
            <path
              d="M131.09,341.83a1,1,0,0,1-.48-.13c-.83-.5-1.06-2.27-1.13-3.28a.19.19,0,0,1,.1-.17.21.21,0,0,1,.2,0c.24.2,2.34,2,2.21,2.94a.61.61,0,0,1-.38.49A1.14,1.14,0,0,1,131.09,341.83Zm-1.21-3c.13,1.35.46,2.29.91,2.56a.72.72,0,0,0,.67,0c.14-.07.17-.15.17-.22C131.7,340.66,130.7,339.57,129.88,338.83Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M132.35,339.66a5.22,5.22,0,0,1-2.81-1.12.16.16,0,0,1,0-.17.18.18,0,0,1,.12-.13c.09,0,2.19-.66,3.13-.08a.94.94,0,0,1,.45.66.63.63,0,0,1-.3.73A1.24,1.24,0,0,1,132.35,339.66Zm-2.3-1.17c.77.53,2.2,1,2.67.74.07,0,.16-.12.12-.35a.58.58,0,0,0-.29-.41A4.11,4.11,0,0,0,130.05,338.49Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M211.31,385.36a11.8,11.8,0,0,1-2.47-.31.19.19,0,0,1-.14-.16.2.2,0,0,1,.11-.18c.6-.29,3.68-1.68,4.5-1.13a.53.53,0,0,1,.22.5,1.1,1.1,0,0,1-.45.86A3,3,0,0,1,211.31,385.36Zm-1.84-.55c1,.18,2.68.38,3.39-.16a.73.73,0,0,0,.31-.6.18.18,0,0,0-.06-.17C212.66,383.58,210.81,384.22,209.47,384.81Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M208.88,385.05a.15.15,0,0,1-.11,0,.16.16,0,0,1-.06-.18c0-.14.78-3.41,2.58-3.18.47.05.59.29.62.47.12.86-1.94,2.5-3,2.92Zm2.25-3.05c-1.08,0-1.73,1.75-2,2.54,1-.57,2.46-1.87,2.39-2.37,0-.08-.11-.14-.3-.16Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M230.39,228.82l-.72-.42c-.14-.09-.21-.23-.15-.31l2.16-2.91c.06-.08.23-.08.37,0l.73.43c.14.08.21.22.15.3l-2.16,2.91C230.71,228.9,230.54,228.9,230.39,228.82Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M251.94,241.43l-.72-.43c-.14-.08-.21-.22-.15-.3l2.16-2.91c.06-.08.23-.08.37,0l.73.42c.14.09.21.23.14.31l-2.15,2.91C252.26,241.51,252.09,241.51,251.94,241.43Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M241.17,235.12l-.73-.42c-.14-.08-.21-.22-.14-.31l2.15-2.9c.07-.09.23-.09.38,0l.72.42c.15.08.21.22.15.31l-2.16,2.9C241.48,235.21,241.31,235.21,241.17,235.12Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M230.39,228.82l-.72-.42c-.14-.09-.21-.23-.15-.31l2.16-2.91c.06-.08.23-.08.37,0l.73.43c.14.08.21.22.15.3l-2.16,2.91C230.71,228.9,230.54,228.9,230.39,228.82Z"
              fillOpacity="0.4"
            ></path>
            <path
              d="M251.94,241.43l-.72-.43c-.14-.08-.21-.22-.15-.3l2.16-2.91c.06-.08.23-.08.37,0l.73.42c.14.09.21.23.14.31l-2.15,2.91C252.26,241.51,252.09,241.51,251.94,241.43Z"
              fillOpacity="0.4"
            ></path>
            <path
              d="M241.17,235.12l-.73-.42c-.14-.08-.21-.22-.14-.31l2.15-2.9c.07-.09.23-.09.38,0l.72.42c.15.08.21.22.15.31l-2.16,2.9C241.48,235.21,241.31,235.21,241.17,235.12Z"
              fillOpacity="0.4"
            ></path>
            <path
              d="M261.18,190c0-6-2-29.61,7.84-31.61,3.11-3.28,18.52-3.62,20.88,4.72,3.12,10.95-1.5,37.67-1.5,37.67L261.18,190"
              fill="#263238"
            ></path>
            <path
              d="M290.45,200.84h0a.25.25,0,0,1-.22-.28c0-.27,3.25-27-.34-37.58-1-2.9-3.78-4.93-7.9-5.73-5.36-1.05-11.16.26-12.77,2.12a.25.25,0,0,1-.35,0,.26.26,0,0,1,0-.36c1.88-2.18,8.19-3.27,13.25-2.28,4.3.83,7.24,3,8.28,6.06,3.62,10.71.39,37.53.36,37.8A.26.26,0,0,1,290.45,200.84Z"
              fill="#263238"
            ></path>
            <path
              d="M268,175.07c-1.51,4.34-4.93,11.93-9.18,12.93,0,0-1.25,4.58,6,8.82,8,4.66,6.12-1.73,6.12-1.73-3.74-3.58-1.75-6.74.78-9.32Z"
              fill="#e4897b"
            ></path>
            <path
              d="M269.5,179.43l2.2,6.33a15.44,15.44,0,0,0-1.63,1.93c-1.52-1.21-3.15-4.16-2.31-6A8,8,0,0,1,269.5,179.43Z"
              fill="#ce6f64"
            ></path>
            <path
              d="M268.06,166.42c-2.07,7.27-3.1,10.3-.79,15.21,3.47,7.4,12.84,8.35,17,1.85,3.78-5.85,6.52-16.75.56-22A10.3,10.3,0,0,0,268.06,166.42Z"
              fill="#e4897b"
            ></path>
            <path
              d="M265.93,171c5.17,1.93,17.32-4.48,20.63-8.41.44-6.06-13.77-3.67-13.77-3.67S265.21,156.59,265.93,171Z"
              fill="#263238"
            ></path>
            <path
              d="M264.7,172.45a5.51,5.51,0,0,0,.67,4.16c1,1.64,2.84,1,3.64-.62.72-1.48,1.05-4.13-.5-5.2A2.48,2.48,0,0,0,264.7,172.45Z"
              fill="#e4897b"
            ></path>
            <path
              d="M278.15,172.21c-.21.58-.07,1.16.31,1.29s.85-.23,1.06-.81.06-1.15-.32-1.29S278.35,171.63,278.15,172.21Z"
              fill="#263238"
            ></path>
            <path
              d="M284.69,174.52c-.2.58-.06,1.15.32,1.29s.85-.23,1.05-.81.06-1.16-.31-1.29S284.9,173.94,284.69,174.52Z"
              fill="#263238"
            ></path>
            <path d="M285.57,173.68l1.53.09S286,174.61,285.57,173.68Z" fill="#263238"></path>
            <path
              d="M282.61,174.9a16.67,16.67,0,0,0,.76,4.42,2.62,2.62,0,0,1-2.2-.34Z"
              fill="#de5753"
            ></path>
            <path
              d="M278.39,180.56h-.06a5.18,5.18,0,0,1-3.34-3.37.19.19,0,0,1,.14-.22.17.17,0,0,1,.21.14,4.93,4.93,0,0,0,3.11,3.11.18.18,0,0,1-.06.35Z"
              fill="#263238"
            ></path>
            <path
              d="M277.86,169.92a.36.36,0,0,1-.17-.68,3.59,3.59,0,0,1,3.28-.13.36.36,0,1,1-.34.63,2.87,2.87,0,0,0-2.6.14A.35.35,0,0,1,277.86,169.92Z"
              fill="#263238"
            ></path>
            <path
              d="M288.84,172.57a.35.35,0,0,1-.34-.27,2.88,2.88,0,0,0-1.66-2,.37.37,0,0,1-.23-.46.35.35,0,0,1,.46-.22,3.56,3.56,0,0,1,2.12,2.51.36.36,0,0,1-.26.44Z"
              fill="#263238"
            ></path>
            <path d="M279,171.38l1.53.09S279.46,172.3,279,171.38Z" fill="#263238"></path>
            <path
              d="M246.6,182.87c-3.15-.75-12.84,6.63-12.84,6.63l4.11,13.11S248,197,248.94,192.87C249.87,188.59,250.19,183.73,246.6,182.87Z"
              fill={theme.vars.palette.primary.main}
            ></path>
            <path
              d="M246.6,182.87c-3.15-.75-12.84,6.63-12.84,6.63l4.11,13.11S248,197,248.94,192.87C249.87,188.59,250.19,183.73,246.6,182.87Z"
              fill="#fff"
              fillOpacity="0.7"
            ></path>
          </g>
        </g>
        <g id="bubble-speech">
          <path
            d="M362,99.44h-74.2a12,12,0,0,0-12,12v23a12,12,0,0,0,12,12H294v11.8l11.8-11.8H362a12,12,0,0,0,12-12v-23A12,12,0,0,0,362,99.44Z"
            fill={theme.vars.palette.primary.main}
          ></path>
          <path
            d="M362,99.44h-74.2a12,12,0,0,0-12,12v23a12,12,0,0,0,12,12H294v11.8l11.8-11.8H362a12,12,0,0,0,12-12v-23A12,12,0,0,0,362,99.44Z"
            fillOpacity="0.3"
          ></path>
          <g fillOpacity="0.54">
            <rect x="286.77" y="109" width="76.24" height="5.5" rx="2.75" fill="#f5f5f5"></rect>
          </g>
          <g fillOpacity="0.54">
            <path
              d="M360.25,125.43H314.91a2.77,2.77,0,0,1-2.76-2.76h0a2.76,2.76,0,0,1,2.76-2.75h45.34a2.75,2.75,0,0,1,2.75,2.75h0A2.76,2.76,0,0,1,360.25,125.43Z"
              fill="#f5f5f5"
            ></path>
          </g>
          <g fillOpacity="0.54">
            <path
              d="M301.45,125.43H289.52a2.76,2.76,0,0,1-2.75-2.76h0a2.75,2.75,0,0,1,2.75-2.75h11.93a2.75,2.75,0,0,1,2.75,2.75h0A2.76,2.76,0,0,1,301.45,125.43Z"
              fill="#f5f5f5"
            ></path>
          </g>
          <g fillOpacity="0.54">
            <path
              d="M342.59,136.35H289.52a2.75,2.75,0,0,1-2.75-2.75h0a2.76,2.76,0,0,1,2.75-2.76h53.07a2.76,2.76,0,0,1,2.75,2.76h0A2.75,2.75,0,0,1,342.59,136.35Z"
              fill="#f5f5f5"
            ></path>
          </g>
        </g>
      </svg>
      <Typography variant="h5" sx={{ width: '80%', maxWidth: 460, textAlign: 'center' }}>
        Start a new conversation
      </Typography>
    </Root>
  )
}
