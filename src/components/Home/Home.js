/* eslint-disable no-unused-vars */
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import AccountsForm from "./AccountsForm";
import CustomerVisitForm from "./CustomerVisitForm";
import useHomePageStyles from "./HomePageStyles";
import NewICTickets from "./ServiceVisitAjax";
import Syllabus from "./Syllabus";
import UploadTADAForm from "./UploadTaDa";
import UploadTopicForm from "./UploadTopicForm";
import { isMobile } from "../../utils";
import Typography from "@material-ui/core/Typography";

import {
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AccountBalanceOutlined,
  CheckBoxOutlineBlankOutlined,
  CloudUploadOutlined,
  DraftsOutlined,
  HomeOutlined,
  InboxOutlined,
  MailOutline,
  ReceiptOutlined,
  SupervisedUserCircleOutlined,
  TimelapseOutlined,
  Settings,
  ExitToAppOutlined,
  ArrowDownwardOutlined,
  CardTravelOutlined,
} from "@material-ui/icons";
import { saveAs } from "file-saver";
import axios from "axios";
import { APIS } from "../../config";
// import {
//   syllabusMock,
//   classMock,
//   SubjMock,
//   TopicMock,
//   searchListMock,
// } from "../MockData";

export default function Home() {
  const classes = useHomePageStyles();

  const [loader, setLoader] = useState(true);
  const [erroMsg, setErrorMsg] = useState("");
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [pageHistory, setPageHistory] = useState(["home"]);
  const [searchTopicValue, setSearchTopicValue] = useState("");
  const [syllabus, setSyllabus] = useState([]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [topicList, setTopicList] = useState([]);

  const [uname, setUname] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [balance, setBalance] = useState(0.0);
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState(false);

  const [selectedData, setSelectedData] = useState({
    syllabus: { name: "", id: "" },
    class: { name: "", id: "" },
    subject: { name: "", id: "" },
  });

  useEffect(() => {
    console.log("Mobile: " + isMobile());
    if (isMobile()) {
      var UID = window.Android.getUniqueID();
      console.log("HOME: " + UID);
      setErrorMsg("");
      axios
        .post(APIS.getDetails, {
          UID: window.Android.getUniqueID(),
        })
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          if (
            response &&
            response &&
            (response.status === 200 || response.status === 201)
          ) {
            setUname(response.data["userDetails"]["UNAME"]);
            setRole(response.data["userDetails"]["ROLE"]);
            setBranch(response.data["userDetails"]["BR"]);
            setBalance(response.data["userDetails"]["BALANCE"].toFixed());
            setMobile(response.data["userDetails"]["PNUM"]);
            setStatus(response.data["userDetails"]["STATUS"]);
          }
        })
        .catch((error) => displayErrorMessage(error));
    } else {
      displayErrorMessage("Only Mobile Support");
    }
  }, []);

  const displayErrorMessage = (error) => {
    let msg =
      error?.response?.data?.detail || error.message || "some error occurred";

    setLoader(false);
    setErrorMsg(msg);
  };

  const currentPage = () => {
    return pageHistory[pageHistory.length - 1];
  };

  const navigateToPage = (pageName) => {
    let newHistory = [...pageHistory];

    if (newHistory[newHistory.length - 1] !== pageName) {
      newHistory.push(pageName);
      setPageHistory([...newHistory]);
    }
  };

  const navigateBack = (pageName) => {
    let newHistory = [...pageHistory];
    setErrorMsg("");

    if (pageName === "home") {
      setPageHistory([pageName]);
    } else {
      newHistory.pop();
      setPageHistory([...newHistory]);
    }
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const handleSylabusClick = (id, name) => {
    if (!id) {
      return;
    }
    setSelectedData({ syllabus: { id, name } });
    setLoader(true);
    setErrorMsg("");

    axios
      .get(`${APIS.classes}${id}/`)
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          // setClassList([...classMock]);
          setClassList([...response.data]);
          navigateToPage("selectClass");
        }
        setLoader(false);
      })
      .catch((error) => displayErrorMessage(error));
  };

  const handleClassClick = (id, name) => {
    if (!id) {
      return;
    }
    setSelectedData({
      syllabus: { ...selectedData.syllabus },
      class: { id, name },
    });
    setLoader(true);
    setErrorMsg("");

    axios
      .get(`${APIS.subjects}${id}/`)
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          // setSubjectList([...SubjMock]);
          setSubjectList([...response.data]);
          navigateToPage("selectSubj");
        }
        setLoader(false);
      })
      .catch((error) => displayErrorMessage(error));
  };

  const handleSubjectClick = (id, name) => {
    if (!id) {
      return;
    }
    setSelectedData({
      syllabus: { ...selectedData.syllabus },
      class: { ...selectedData.class },
      subject: { id, name },
    });
    setLoader(true);
    setErrorMsg("");

    axios
      .get(`${APIS.topics}${id}/`)
      .then((response) => {
        if (response && response.data && response.data.length >= 0) {
          // setTopicList([...TopicMock]);
          setTopicList([...response.data]);
          navigateToPage("selectTopic");
        }
        setLoader(false);
      })
      .catch((error) => displayErrorMessage(error));
  };

  const handleTopicClick = (id, name, url) => {
    window.open(url, "_blank");
  };

  const checkSearchValue = (tags) => {
    if (!searchTopicValue) {
      return true;
    }

    let flag = false;
    let searchVal = searchTopicValue.toString().toLowerCase();

    for (let i = 0; i < tags.length; i++) {
      let tagVal = tags[i]?.toString().toLowerCase() || "";

      if (tagVal.indexOf(searchVal) > -1) {
        flag = true;
        break;
      }
    }

    return flag;
  };

  const saveFile = (url, name) => {
    saveAs(url, name);
  };

  const requestSearch = (value) => {
    setSearchTopicValue(value);
    setLoader(true);
    setErrorMsg("");

    if (!value) {
      setLoader(false);
    }

    let arr = value.split(",").map((tag) => {
      return tag.trim();
    });

    if (arr.length > 0 && !arr[arr.length - 1]) {
      arr.pop();
    }

    const tagsList = [];
    arr.forEach(myFunction);
    function myFunction(value) {
      tagsList.push(value);
    }

    if (value) {
      console.log("inside");
      axios
        .post(APIS.search, {
          tags: tagsList,
        })
        .then(function (response) {
          console.log(response);
          if (response && response.data && response.data.length > 0) {
            // setTopicList([...searchListMock]);
            setTopicList([...response.data]);
            navigateToPage("selectTopic");
          }
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
          displayErrorMessage(error);
        });

      // axios
      //   .get(APIS.search, {
      //     params: {
      //       tags: ["test"],
      //     },
      //   })
      //   .then((response) => {
      //     if (response && response.data && response.data.length > 0) {
      //       // setTopicList([...searchListMock]);
      //       setTopicList([...response.data]);
      //       navigateToPage("selectTopic");
      //     }
      //     setLoader(false);
      //   })
      //   .catch((error) => displayErrorMessage(error));
    }
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  function checkTADA() {
    if (role === "test" || role === "test1") {
      return true;
    } else {
      return false;
    }
  }

  const shareData = async (url) => {
    // try {
    //   await Share.share({
    //     message:
    //       url,
    //   });
    // } catch (error) {
    //   alert(error.message);
    // }
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url: url,
          text: "add text",
          title: "Your Discovery",
        })
        .then(() => {
          console.log("Sharing successfully");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  const downloadFile = (fileName, file) => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = file;
    link.click();
  };

  const data = [
    {
      name: "Home",
      icon: <HomeOutlined />,
    },
    { name: "Inbox", icon: <InboxOutlined /> },
    { name: "Outbox", icon: <CheckBoxOutlineBlankOutlined /> },
    { name: "Sent mail", icon: <MailOutline /> },
    { name: "Draft", icon: <DraftsOutlined /> },
    { name: "Trash", icon: <ReceiptOutlined /> },
  ];
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );

  const test = () => {
    window.alert("yes");
    setOpen(false);
  };

  const checkSettings = () => {
    window.Android.permissionsSet();
  };

  const resetSharedPref = () => {
    window.Android.resetSharedPref();
  };

  const quitApp = () => {
    window.Android.quitApp();
  };

  const restartApp = () => {
    window.Android.restartApp();
  };

  const goBackToHome = () => {
    navigateBack("home");
    setOpen(false);
  };

  const goToAttendance = () => {
    navigateToPage("uploadTopic");
    setOpen(false);
  };

  const goToAccounts = () => {
    navigateToPage("AccountsTopic");
    setOpen(false);
  };

  const goToAjaxNewTickets = () => {
    navigateToPage("NewICTickets");
    setOpen(false);
  };

  const goToUploadTADA = () => {
    console.log(currentPage());
    navigateToPage("UploadTADA");
    console.log(currentPage());
    setOpen(false);
  };

  const goToCustomerVisit = () => {
    console.log(currentPage());
    navigateToPage("CustomerVisit");
    console.log(currentPage());
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar className={classes.topNav}>
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <SwipeableDrawer
              anchor="left"
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => {}}
            >
              <div className={classes.list}>
                <ListItem button onClick={() => goBackToHome()}>
                  <ListItemIcon>
                    <HomeOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
                <Divider variant="inset" />
                <Box hidden={false}>
                  <List>
                    <Box>
                      <ListItem button onClick={() => goToAttendance()}>
                        <ListItemIcon>
                          <TimelapseOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Attendance"} />
                      </ListItem>
                    </Box>
                    <Box>
                      <ListItem button onClick={() => goToCustomerVisit()}>
                        <ListItemIcon>
                          <SupervisedUserCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Customer Visit"} />
                      </ListItem>
                    </Box>

                    <Box>
                      <ListItem button onClick={() => goToAccounts()}>
                        <ListItemIcon>
                          <AccountBalanceOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Accounts"} />
                      </ListItem>
                    </Box>

                    <Box hidden={true}>
                      <ListItem button onClick={() => goToAjaxNewTickets()}>
                        <ListItemIcon>
                          <CardTravelOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"New IC Tickets"} />
                      </ListItem>
                    </Box>

                    <Box hidden={false}>
                      <ListItem button onClick={() => goToUploadTADA()}>
                        <ListItemIcon>
                          <CloudUploadOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Upload TA-DA"} />
                      </ListItem>
                    </Box>

                    {/* <Box hidden={!status}></Box> */}
                  </List>
                </Box>
                <Divider variant="inset" />
                <Box hidden={false}>
                  <ListItem button onClick={() => checkSettings()}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary={"Check Settings"} />
                  </ListItem>
                  <Divider variant="inset" />
                  <ListItem button onClick={() => restartApp()}>
                    <ListItemIcon>
                      <ArrowDownwardOutlined />
                    </ListItemIcon>
                    <ListItemText primary={"Restart"} />
                  </ListItem>
                  <ListItem button onClick={() => quitApp()}>
                    <ListItemIcon>
                      <ExitToAppOutlined />
                    </ListItemIcon>
                    <ListItemText primary={"Quit"} />
                  </ListItem>
                </Box>
                <Box hidden={true}>
                  <ListItem button onClick={() => resetSharedPref()}>
                    <ListItemIcon>
                      <CloudUploadOutlined />
                    </ListItemIcon>
                    <ListItemText primary={"Reset Memory - Developer"} />
                  </ListItem>
                </Box>
              </div>
            </SwipeableDrawer>
          </div>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        {currentPage() === "home" && (
          <Syllabus syllabus={syllabus} erroMsg={erroMsg} />
        )}
        {currentPage() === "uploadTopic" && (
          <UploadTopicForm erroMsg={erroMsg} />
        )}
        {currentPage() === "AccountsTopic" && (
          <AccountsForm erroMsg={erroMsg} />
        )}
        {currentPage() === "UploadTADA" && <UploadTADAForm erroMsg={erroMsg} />}
        {currentPage() === "CustomerVisit" && (
          <CustomerVisitForm erroMsg={erroMsg} />
        )}
        {currentPage() === "NewICTickets" && <NewICTickets erroMsg={erroMsg} />}
      </main>
    </React.Fragment>
  );
}
