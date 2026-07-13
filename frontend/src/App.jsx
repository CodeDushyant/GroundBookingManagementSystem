import AdminDashboard from "./Component/Admin/AdminDashboard";
import LandingPage from "./Component/LandingPage";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import MyBookings from "./Component/User/MyBookings";
import Profile from "./Component/User/Profile";
import UserDashboard from "./Component/User/UserDashboard";
function App() {
  return (
    <>
      <LandingPage />
      <Signup />
      <Login />
      <Login />
      <UserDashboard />
      <MyBookings/>
      <Profile/>
      <AdminDashboard/>
    </>
  );
}
export default App;
