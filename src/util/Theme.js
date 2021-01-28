import { defaultTheme } from "react-admin";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import merge from "lodash/merge";

export const theme = createMuiTheme(
  merge({}, defaultTheme, {
    palette: {
      primary: {
        light: '#69CDF2',
        main: '#C92403',
        dark: '#0F80A9'
      },
      secondary: {
        light: '#B3B3B6',
        main: '#050401',
        dark: '#131316'
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