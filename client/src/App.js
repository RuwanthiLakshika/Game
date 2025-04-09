import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import JoinGame from "./components/JoinGame";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { Chat } from "stream-chat-react";

function App() {
  const api_key = "pnb3nxxeurye";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState("welcome");

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
    {isAuth ? (
       <Chat client={client}>
       <JoinGame />
       <button onClick={logOut}> Log Out</button>
     </Chat>
    ) : (
      <>
        {currentPage === "welcome" && <WelcomePage onNavigate={setCurrentPage} />}
        {currentPage === "login" && <Login setIsAuth={setIsAuth} onNavigate={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setIsAuth={setIsAuth} onNavigate={setCurrentPage} />}
      </>
    )}
  </div>
  );
}

export default App;
