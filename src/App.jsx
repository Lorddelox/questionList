
import MainBlock from "./compenents/mainBlock/mainBlock"
import "./styles/global.css"
import "./styles/reset.css"
import "./App.css"
import { useEffect, useState } from "react"
import { AppContext } from "./context/appContext"
import FilterSection from "./compenents/filterSection/filterSection"

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selected, setSelected] = useState({ specializationId: [], skills: [], complexity: [], rate: [], status: [] });
  const changeSelected = (key, value) => {
    let preparedSelected = selected;
    if (key === "specializationId") {
      preparedSelected = Object.fromEntries(Object.entries(selected).map(([key,]) => [key, []]))
    }
    setSelected({ ...preparedSelected, [key]: value })
  }

  const value = {
    searchTerm, setSearchTerm,
    selected, changeSelected,
    currentPage, setCurrentPage,
    totalPages, setTotalPages
  }

  // useEffect(() => { console.log(selected) }, [selected])

  return (
    <AppContext.Provider value={value}>
      {/* <button onClick={() => toggleSelected("skills")}>test func</button> */}
      <div className="wrapper container">
        <MainBlock />
        <FilterSection />
      </div>
    </AppContext.Provider>
  )
}


export default App