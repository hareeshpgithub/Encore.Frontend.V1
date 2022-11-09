import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useHomePageStyles = makeStyles((theme) => {
  return {
    main: {
      width: "100%",
    },
    mainLoader: {
      width: "50%",
      margin: "40px auto",
      textAlign: "center",
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    topNav: {
      flexWrap: "nowrap",
    },
    topNavTitle: {
      flexGrow: 1,
    },
    topNavSearchBar: {
      height: "30px",
      width: "200px",
      [theme.breakpoints.up("sm")]: {
        height: "40px",
      },
    },
    settingsBar: {
      marginRight: theme.spacing(2),
    },
    errorMessage: {
      width: "100%",
      margin: "30px auto 0",
      textAlign: "center",
      color: "red",
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    secondarySideMenu: {
      background: "white",
      [theme.breakpoints.up("md")]: {
        minHeight: "100vh",
      },
    },
    sideMenuItem: {
      width: "fit-content",
      padding: "10px 20px",
      margin: "10px",
      display: "inline-block",
      [theme.breakpoints.up("md")]: {
        width: "100%",
        margin: "0",
        padding: "10px 20px",
      },
    },
    secondaryRightSide: {
      display: "flex",
      flexFlow: "row wrap",
      padding: "20px",
    },
    cardItem: {
      margin: "10px",
      padding: "0 20px",
      minWidth: "100px",
      maxWidth: "300px",
      cursor: "pointer",
      "&.active": {
        border: "1px solid grey",
      },
    },
    actionBar: {
      width: "100%",
      marginLeft: "10px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",

      "& .icon-back": {
        flexGrow: 1,
      },
      "& .MuiSvgIcon-root": {
        cursor: "pointer",
      },
      "& .search-topic": {
        marginLeft: "30px",
      },
      "& .upload-topic": {
        marginLeft: "30px",
        padding: "11px",
      },
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    menuIcon: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    closeIcon: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",

      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    listItemName: {
      wordBreak: "break-all",
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up("md")]: {
        minHeight: `calc(100vh - ${theme.spacing(6) * 4 + 64}px)`,
      },
    },
  };
});

export default useHomePageStyles;
