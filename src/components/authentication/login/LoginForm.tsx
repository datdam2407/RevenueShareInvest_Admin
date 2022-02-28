import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------
type InitialValues = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};
export default function LoginForm() {
  // const { loginWithGoogle } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email phải đúng định dạng').required('Yêu cầu nhập Email'),
    password: Yup.string().required('Yêu cầu nhập mật khẩu')
  });

  const { loginWithGoogle, loginWithFaceBook } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle?.();
      // const res = await auth.signInWithPopup(googleProvider);
      // console.log("data", res)
    } catch (error) {
      console.error(error);
    }
  };
  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook?.();
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    //   onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
    //     try {
    //       await login(values.email, values.password);
    //       enqueueSnackbar('Login success', {
    //         variant: 'success',
    //         action: (key) => (
    //           <MIconButton size="small" onClick={() => closeSnackbar(key)}>
    //             <Icon icon={closeFill} />
    //           </MIconButton>
    //         )
    //       });
    //       if (isMountedRef.current) {
    //         setSubmitting(false);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       resetForm();
    //       if (isMountedRef.current) {
    //         setSubmitting(false);
    //         setErrors({ afterSubmit: error.message });
    //       }
    //     }
    //   }
    // });
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await loginWithGoogle();
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      {/* <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Ghi nhớ"
          />

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Quên mật khẩu?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login with google
        </LoadingButton>
      </Form> */}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={handleLoginGoogle}
      >
        Login with google
      </LoadingButton>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={handleLoginFaceBook}
      >
        Login with facebook
      </LoadingButton>
    </FormikProvider>
  );
}
