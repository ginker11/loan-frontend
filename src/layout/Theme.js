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
    typography: {
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
    overrides: {
        MuiTableRow: {
        head: {
            "& > th ": {
            color: 'black',
            fontWeight: 'bold',
            }
        }
      },
      RaAutocompleteSuggestionList: {
        suggestionsContainer: {
          zIndex: '9999!important'
        }
      },
        RaMenuItemLink: {
          root: {
              borderLeft: '3px solid #fff',
              backgroundColor: 'rgba(167,173,186,0.4)',
              marginRight: '0.5rem',
              '& svg' : {color: '#050401'},
              fontSize: '1.1rem',
              borderBottom: '1px solid rgba(80,80,80,0.2)',
          },
          active: {
              '& svg' : {color: '#C92403'},
              backgroundColor: 'rgba(167,173,186,0.8)',
              fontWeight: 'Bold',
              color: 'rgba(20,20,30,0.9)'
          },
      },
    }  
  })
);