// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import { AuthProvider } from "./Context/authContext";
import { AdminProvider } from "./Context/adminContext";
import { UserProvider } from "./Context/userContent";
import { SearchProvider } from "./Context/searchContext";
import { DataProvider } from "./Context/data";

export default function App() {
  return (
    <ThemeConfig>
      <AuthProvider>
        <AdminProvider>
          <UserProvider>
            <SearchProvider>
              <DataProvider>
                <ScrollToTop />
                <GlobalStyles />
                <BaseOptionChartStyle />
                <Router />
              </DataProvider>
            </SearchProvider>
          </UserProvider>
        </AdminProvider>
      </AuthProvider>
    </ThemeConfig>
  );
}
