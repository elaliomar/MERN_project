import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import { GoogleLogin ,GoogleOAuthProvider} from '@react-oauth/google';
import useStyles from './styles'
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input'
import {signin, signup } from '../../actions/auth'
import { useDispatch } from 'react-redux';
import Icon from './icon'
import { useNavigate } from 'react-router-dom';

const initialState = { firsName:'', lastName:'', email:'', password:'', comfirmPassword:''}
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup,setIsSignup] = useState(false);
  const [formData, setFromData] = useState(initialState)

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmbit =(e)=>{
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData,navigate))
    } else{
      dispatch(signin(formData,navigate))
    }
  }

  const handleChange = (e) =>{
    setFromData({...formData,[e.target.name]: e.target.value})
  }

  const switchMode = () =>{
    setIsSignup(!isSignup)
    handleShowPassword(false)

  }

  const googleSuccess = (res) =>{
    console.log(res)
  }
  const googleFailure = () =>{
      console.log('Unsuccess')
  }

  return (
   <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmbit}>
            <Grid container spacing={2}>
                {
                  isSignup && (
                    <>
                      <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                      <Input name="lastName" label="Last Name" handleChange={handleChange}  half/>
                    </>
                  )}
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                  {isSignup && <Input name="comfirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            
            <Button type='sumbit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignup  ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleOAuthProvider clientId="20700243366-au1uuth7p8jrpd5nrufe9naafnf493q8.apps.googleusercontent.com">
            <GoogleLogin
                render={(renderProps) =>{
                  return (
                  <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
                    Google Sign In
                  </Button>
  )}}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />
            </GoogleOAuthProvider>
            <Grid container justify='flex-end'>
              <Grid item>
                    <Button onClick={switchMode}>
                      {isSignup ? 'Already have an account? Sign In' : `Don't have and account? Sign Up`}
                    </Button>
              </Grid>

            </Grid>
        </form>
      </Paper>
   </Container>
  )
}

export default Auth