import React from 'react'
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core'
import useStyles from './styles'
import ml from '../../images/ml.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const classes = useStyles()
    const user = null
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
    <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/"  variant="h2" align='center'>ETA</Typography>
        <img  className={classes.image} src={ml}  height="60"/>
    </div>
    <div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.name.charAt(0)}></Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color="secondary">Logout</Button>
                </div>
            ): (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In </Button>
            )}
        </Toolbar>
    </div>
  </AppBar>
  )
}

export default Navbar
