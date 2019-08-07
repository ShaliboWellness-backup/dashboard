import {createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#419ef9',
            contrastText: '#fff',
        },
        secondary: {
            main: '#e66ad2',
            contrastText: '#fff',
        },

        error: {
            main: '#BD0043',
            contrastText: '#fff',
        },
        divider: '#D7D6D5',
        background: {
            paper: '#fefefe',
            default: '#f5f6fa',
        },

        text: {
            primary: "#1d253b",
            secondary: '#6c757d',
            white: '#fff',

        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),

        body1: {
            fontSize: "0.875rem",
            fontWeight: 300
        },
        body2: {
            fontSize: "0.62475rem",
            fontWeight: 300
        },
        caption: {
            fontWeight: 300
        },
        h5: {
            fontWeight: 300
        }
    },
    switch: {
        colorPrimary: green[500],
        trackOnColor: green[100],
        thumbOffColor: red[700],
        trackOffColor: red[100],
    },
});

export default theme;
