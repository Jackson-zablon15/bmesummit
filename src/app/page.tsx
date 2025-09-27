
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Calendar from "../components/Calendar";
import Registration from "../components/Registration";
import Innovation from "../components/Innovation";
import Partners from "../components/Partners";
import Attendees from "../components/Attendees";
import Galleries from "../components/Galleries";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-blue-50 min-h-screen">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="calendar"><Calendar /></section>
      <section id="registration"><Registration /></section>
      <section id="innovation"><Innovation /></section>
  <section id="partners"><Partners /></section>
      <section id="attendees"><Attendees /></section>
      <section id="galleries"><Galleries /></section>
  <section id="footer"><Footer /></section>
    </main>
  );
}
