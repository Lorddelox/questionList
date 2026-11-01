import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/appContext"
import useDebaunce from "../../helpers/useDebaunce"
import "./filterSection.css"
import FilterBlock from "../filterBlock/filterBlock"
import { staticData } from "../../helpers/staticData"

const FilterSection = () => {
    const { searchTerm, setSearchTerm, setCurrentPage } = useContext(AppContext);
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebaunce(inputValue, 500);
    const { selected } = useContext(AppContext);
    const { specializationId } = selected


    useEffect(() => {
        setSearchTerm(debouncedValue);
        setCurrentPage(1);
    }, [debouncedValue]);



    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    }


    return (
        <aside className="aside block">
            <label htmlFor="search">Поиск</label>
            <input type="text" value={inputValue} onChange={handleSearchChange} id="search" />
            <FilterBlock title={"Специализация"}
                source={`https://api.yeatwork.ru/specializations`} filterKey={"specializationId"} isMultiple={false} />
            {specializationId.length !== 0 ?
                <>
                    <FilterBlock key={"skills"} title={"Навыки"}
                        source={`https://api.yeatwork.ru/skills?page=1&limit=12&specializations=${specializationId[0]}`}
                        filterKey={"skills"} />
                    {staticData.map(({ title, source, filterKey, isMultiple, type }) =>
                        <FilterBlock key={filterKey} title={title} source={source}
                            filterKey={filterKey} isMultiple={isMultiple} type={type} />)}
                </>
                :
                (<></>)
            }

        </aside>
    )
}
// DONE TODO Сменить url на data
// Было решено оставить url тк это удобно лучше добавить пропс data и от условия делать
export default FilterSection


