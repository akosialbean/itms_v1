import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useUpdateUserMutation } from '../src/slices/usersApiSlice';
import { setCredentials } from '../src/slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../src/components/Loader';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const [oldPassword, setOldPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      name: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old Password is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required').email('Invalid email'),
      newPassword: Yup.string().required('New Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          oldPassword: values.oldPassword,
          name: values.name,
          email: values.email,
          newPassword: values.newPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated!');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ marginTop: 8 }}>
        <CardHeader title="Update Profile" />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
           
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
             <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="oldPassword"
              label="Old Password"
              name="oldPassword"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
              helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
                Update Profile
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
