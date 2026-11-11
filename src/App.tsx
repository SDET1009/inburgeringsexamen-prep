import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Knm from "./pages/Knm"
import KnsA1 from "./pages/KnsA1"
import OefenenA2 from "./pages/OefenenA2"
import Woorden from "./pages/Woorden"
import RoutePage from "./pages/RoutePage"
import Bronnen from "./pages/Bronnen"
import ExamenData from "./pages/ExamenData"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knm" element={<Knm />} />
        <Route path="/kns" element={<KnsA1 />} />
        <Route path="/oefenen-a2" element={<OefenenA2 />} />
        <Route path="/woorden" element={<Woorden />} />
        <Route path="/a1" element={<RoutePage route="a1" />} />
        <Route path="/a2" element={<RoutePage route="a2" />} />
        <Route path="/b1" element={<RoutePage route="b1" />} />
        <Route path="/bronnen" element={<Bronnen />} />
        <Route path="/examen-data" element={<ExamenData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
