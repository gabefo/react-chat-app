import { FormEvent, MouseEvent, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import TitleAndMetaTags from '@/components/TitleAndMetaTags'

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
})

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
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
    <Root>
      <TitleAndMetaTags title="Sign in" />
      <Container maxWidth="xs">
        <StyledCard>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Sign in
          </Typography>
          <Alert severity="info">
            Username: <strong>demo</strong> / Password: <strong>demo1234</strong>
          </Alert>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              variant="standard"
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
              variant="standard"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </StyledCard>
      </Container>
    </Root>
  )
}

export default SignInPage
