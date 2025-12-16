import FAQ from "../components/FAQ";
import FinanceServices from "../components/FinanceServices";
import Hero from "../components/Hero";
import Services from "../components/Services";

const Home = () =>{
   return (
      <>
      <main >
        
        <Hero />
        <Services/>
        <FAQ/>
        <FinanceServices/>
        </main>
      </>
    );
}
export default Home;