import { FormEvent, MouseEvent, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
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
    username: yup
      .string()
      .required('Enter a username')
      .min(6, 'Sorry, your username must be between 6 and 30 characters long.')
      .max(30, 'Sorry, your username must be between 6 and 30 characters long.')
      .matches(
        /^[A-Za-z0-9.]{6,30}$/,
        'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.'
      ),
    email: yup.string().required('Enter an email').email('Invalid email'),
    password: yup
      .string()
      .required('Enter a password')
      .min(8, 'Use 8 characters or more for your password')
      .matches(
        /(?=.*[0-9])(?=.*[A-Za-z])(?=.*[~`!@#$%^&*()\-+={}\[\]|\\:;"'<>,.?/_₹])/,
        'Please choose a stronger password. Try a mix of letters, numbers, and symbols.'
      ),
  })
  .required()

type FormData = yup.InferType<typeof schema>

const SignUpPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {}

  return (
    <Root data-mui-color-scheme="light">
      <TitleAndMetaTags title="Sign up" />
      <Container maxWidth="xs" disableGutters>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Sign up
          </Typography>
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
            {...register('email')}
            margin="normal"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            label="Email"
            autoComplete="email"
          />
          <TextField
            {...register('password')}
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={Boolean(errors.password)}
            autoComplete="off"
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
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            autoComplete="off"
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
            loading={isSubmitting}
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
