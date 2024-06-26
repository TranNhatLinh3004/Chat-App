import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Login from "../login/Login";
import Register from "../register/Register";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./home.css";
function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats"); // Use navigate instead of history.push
  }, [navigate]);

  return (
    <div className="section__home" style={{}}>
      <Container centerContent mt="20px" borderRadius="10px">
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="parent"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            ChatLIN
          </Text>
        </Box>

        <Box borderRadius="lg" borderWidth="1px" w="100%" p="40px 20px">
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
