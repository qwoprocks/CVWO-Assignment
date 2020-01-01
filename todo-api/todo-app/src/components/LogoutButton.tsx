import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: '10px',
        top: '10px',
        background: '#DDDDDD',
        padding: '5px',
        margin: '0',
        borderRadius: '2px',
        '& span': {
            marginRight: '5px',
        },
        '&:hover': {
            cursor: 'pointer',
        },
    },
}));

const LogoutButton = (props : {onClick : () => void}) => {
    const classes = useStyles();

    return (
        <div className={classes.icon} onClick={props.onClick}>
            <span>Logout</span>
            <ExitToAppIcon />
        </div>
    );
}

export default LogoutButton;