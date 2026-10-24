import { useContext, useEffect, useState } from "react"
import CategoryBtn from "../filterBtn/categoryBtn"
import "./filterBlock.css"
import useDebaunce from "../../helpers/useDebaunce";
import { AppContext } from "../../context/appContext";

const FilterBlock = ({ source, title, filterKey, isMultiple = true, type = "url" }) => {

    // useEffect(() => { console.log(setStateName) }, [setStateName])

    const [data, setData] = useState([]);
    const [currentSelected, setCurrentSelected] = useState([]);
    const debauncedValue = useDebaunce(currentSelected, 600);
    const { changeSelected, setCurrentPage } = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${source}`)
            const data = await res.json();

            setData(data.data)
        }

        if (type === "url") {
            fetchData()
        }
        else {
            setData(source)
        }
    }, []);

    useEffect(() => {
        let result = debauncedValue;

        if (!isMultiple) {
            let totalValue = debauncedValue.length !== 0 ? [debauncedValue[debauncedValue.length - 1]] : [];
            result = totalValue.length !== 0 ? totalValue : []
        }
        changeSelected(filterKey, result);
        setCurrentPage(1);
    }, [debauncedValue]);

    // useEffect(() => {
    //     console.log(source)
    // }, [])

    const skillState = {
        selected: currentSelected,
        setSelected: setCurrentSelected,
        isMultiple: isMultiple
    };

    return (
        <>
            <div className="filter__block">
                <h4 className={`filter__title`}>{title}</h4>
                <div className={`filter__category`}>
                    {data?.map(({ id, title }) => <CategoryBtn skillState={skillState} key={id} id={id} name={title} />)}
                </div>
            </div>
        </>
    )
}

export default FilterBlock