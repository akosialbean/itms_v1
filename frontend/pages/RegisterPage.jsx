import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useRegisterMutation } from '../src/slices/usersApiSlice';
import { setCredentials } from '../src/slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../src/components/Loader';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/register');
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      showPassword: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required').email('Invalid email'),
      newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters long'), 
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await register({
          name: values.name,
          email: values.email,
          newPassword: values.newPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  const handleShowPassword = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ marginTop: 8 }}>
        <CardHeader title="Change Password" />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type={formik.values.showPassword ? 'text' : 'password'}
                  id="newPassword"
                  autoComplete="new-password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} 
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.touched.newPassword &&
                    formik.errors.newPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {formik.values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={formik.values.showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {formik.values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 4 }}
              >
                Change Password
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterPage;
