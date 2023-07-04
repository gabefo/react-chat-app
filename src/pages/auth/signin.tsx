import { FormEvent, MouseEvent, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
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
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth/next'
import { signIn } from 'next-auth/react'
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

const SignInPage: NextPage = () => {
  const { push } = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsValidating(true)

    const data = new FormData(event.currentTarget)
    const response = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/',
      username: data.get('username'),
      password: data.get('password'),
    })

    setIsValidating(false)

    if (!response || !response.ok) {
      setError(true)
      return
    }

    push(response.url as string)
  }

  return (
    <Root data-mui-color-scheme="light">
      <TitleAndMetaTags title="Sign in" />
      <Container maxWidth="xs" disableGutters>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3 }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Sign in
          </Typography>
          <Alert severity="info">
            Username: <strong>demo</strong> / Password: <strong>demo1234</strong>
          </Alert>
          <TextField
            margin="normal"
            fullWidth
            error={error}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={error}
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
          <Link component={NextLink} href="/auth/reset-password" variant="body2" underline="none">
            Forgot password?
          </Link>
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
            {"Don't have an account? "}
            <Link component={NextLink} href="/auth/signup" variant="body2" underline="none">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Root>
  )
}

export default SignInPage

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
