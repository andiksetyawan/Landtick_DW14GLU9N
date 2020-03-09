import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5063f0',
    },
    secondary: {
      main: '#FDDD01',
    },
    white: {
      main:'#fff'
    },
    // error: {
    //   main: red.A400,
    // },
    // background: {
    //   default: '#fff',
    // },
   type:'light'
    // type:'dark'
  },
});

export default theme;