import { MouseEvent, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
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
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
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

const schema = yup
  .object({
    username: yup.string().trim().required('Enter a username'),
    password: yup.string().required('Enter a password'),
  })
  .required()

type FormData = yup.InferType<typeof schema>

const SignInPage: NextPage = () => {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/',
    })

    if (!response || !response.ok) {
      setError('root.serverError', { type: '401' })
      resetField('password')
      return
    }

    push(response.url as string)
  }

  return (
    <Root data-mui-color-scheme="light">
      <TitleAndMetaTags title="Sign in" />
      <Container maxWidth="xs" disableGutters>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Sign in
          </Typography>
          <Alert severity="info">
            Username: <strong>demo</strong> / Password: <strong>demo1234</strong>
          </Alert>
          {errors.root ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              Invalid username or password
            </Alert>
          ) : null}
          <TextField
            {...register('username')}
            margin="normal"
            fullWidth
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            label="Username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            {...register('password')}
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
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
            loading={isSubmitting}
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
