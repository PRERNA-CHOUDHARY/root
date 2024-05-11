/**
 * @file Layout.jsx. The Layout component contains the Header, Footer, and Routers components.
 */

// Import the components.
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

// Import the Routers component from the routes folder.
import { Routers } from "../routes/Routers";

// Define the Layout component.
export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};
