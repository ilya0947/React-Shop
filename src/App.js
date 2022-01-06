import Footer from "./components/footer";
import Header from "./components/header";
import Shop from "./components/shop";
import { ContextProvider } from "./context";


export default function App() {
	return (
		<>
			<Header/>
			<ContextProvider>
				<Shop/>
			</ContextProvider>
			<Footer/>
		</>
		
	);
}
