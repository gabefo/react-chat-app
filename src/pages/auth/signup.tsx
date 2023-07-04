import { FormEvent, MouseEvent, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { GetServerSidePropsContext, NextPage } from 'next'
import NextLink from 'next/link'
import { getServerSession } from 'next-auth/next'
import TitleAndMetaTags from '@/components/TitleAndMetaTags'
import { authOptions } from '../api/auth/[...nextauth]'

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  minHeight: '100%',
  backgroundColor: theme.vars.palette.common.white,
  color: theme.vars.palette.text.primary,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
}))

const SignUpPage: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Root data-mui-color-scheme="light">
      <TitleAndMetaTags title="Sign up" />
      <Container maxWidth="xs" disableGutters>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3 }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Sign up
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField margin="normal" fullWidth id="email" label="Email" name="email" />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirm-password"
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            id="confirm-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            type="submit"
            fullWidth
            loading={isValidating}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <span>Sign In</span>
          </LoadingButton>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {'Already have an account? '}
            <Link component={NextLink} href="/auth/signin" variant="body2" underline="none">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </Root>
  )
}

export default SignUpPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
