import { defaultTheme } from "react-admin";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import merge from "lodash/merge";

export const theme = createMuiTheme(
  merge({}, defaultTheme, {
    palette: {
      primary: {
        light: '#ff5722',
        main: '#f4511e',
        dark: '#d84315'
      },
      secondary: {
        main: '#FF6961'
      },
    },
    overrides: {
        MuiTableRow: {
        head: {
            backgroundColor: 'lightgray',
            "& > th ": {
            color: 'black',
            fontWeight: 'bold',
            }
        }
      }
    }  
  })
);