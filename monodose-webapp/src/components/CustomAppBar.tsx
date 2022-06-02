import React from "react"
import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { UserContext } from "../context/UserContext"

const CustomAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { loggedUser, setLoggedUser } = React.useContext(UserContext)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bee's Dream Monodose
        </Typography>
        {loggedUser?.user !== undefined && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <Avatar>{loggedUser.user.informations?.firstname?.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              
            >
              <MenuItem style={{ color: 'black', backgroundColor: 'unset' }}>{`${loggedUser?.user.informations?.firstname} ${loggedUser?.user.informations?.lastname}`}</MenuItem>
              <MenuItem style={{ color: 'black' }} onClick={() => {
                  setLoggedUser(undefined)
                  setAnchorEl(null)
                }}
              >Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar