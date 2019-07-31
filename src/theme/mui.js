import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette:{
      type: "light",
      primary: {
        main: "#5AB4A2",
        contrastText: "#fff",
      },
      secondary: {
        main: "#eeeeee",
        contrastText: "#212121",
      },

      error: {
        main: "#BD0043",
        contrastText: "#fff",
      },
      divider: "#D7D6D5",
      background: {
        paper: "#f6f6f6",
        default: "#f1f1f1",
      },

  text:{
    secondary: "rgba(0, 0, 0, 0.54)",
      white: "#fff"

  }
  },
  typography: {
    useNextVariants: true,
  },
  switch: {
    colorPrimary: green[500],
    trackOnColor: green[100],
    thumbOffColor: red[700],
    trackOffColor: red[100],
  },
});

export default theme;
