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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        let ignore = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${source}`, { signal: controller.signal })
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                if (!data.data || !Array.isArray(data.data)) {
                    throw new Error("API вернул не тот формат, который мы ждали");
                }
                if (!ignore) {
                    setData(data.data)
                }
            }
            catch (e) {
                if (e.name !== 'AbortError')
                    setError(e.message)
            }
            finally {
                setLoading(false);
            }
        }

        if (type === "url") {
            fetchData()
        }


        return () => {
            controller.abort();
            ignore = true
        };

    }, [source, type]);

    // TODO Добавить loading

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



    if (loading) {
        return (<>Загрузка...</>)
    }
    if (error) {
        return (<>Ошибка: {error}</>)
    }
    if (type === "data") {
        return (
            <>
                <div className="filter__block">
                    <h4 className={`filter__title`}>{title}</h4>
                    <div className={`filter__category`}>
                        {source.map(({ id, title }) => <CategoryBtn skillState={skillState} key={id} id={id} name={title} />)}
                    </div>
                </div>
            </>
        )
    }

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