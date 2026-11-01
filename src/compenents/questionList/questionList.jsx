import { useContext, useEffect, useState } from "react"
import AccordionItem from "../accordionItem/accordionItem"
import "./questionList.css";
import { AppContext } from "../../context/appContext";
import PaginationSection from "../paginationSection/paginationSection";
import createQueryParams from "../../helpers/createQueryParams";
const QuestionList = () => {
    const [questionList, setQuestionList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { searchTerm, selected, currentPage, setCurrentPage, totalPages, setTotalPages } = useContext(AppContext);


    const queryParams = createQueryParams(selected, {
        title: searchTerm,
        page: currentPage,
    })


    useEffect(() => {
        const controller = new AbortController();
        let ignore = false;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://api.yeatwork.ru/questions/public-questions?${queryParams}&limit=10&order=ASC`, { signal: controller.signal });
                const questions = await res.json();

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                if (!questions.data || !Array.isArray(questions.data)) {
                    throw new Error("API вернул не тот формат, который мы ждали");
                }

                if (!ignore) {
                    setQuestionList(questions.data);
                    setTotalPages(Math.ceil(questions.total / 10))
                }
            }
            catch (e) {
                if (!ignore && e.name !== 'AbortError') {
                    setError(e.message)
                }
            }
            finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            controller.abort();
            ignore = true
        };
    }, [currentPage, searchTerm, selected]);


    const handlePaginationClick = (page) => {
        setCurrentPage(page)
    }

    if (loading) {
        return (<>Загрузка...</>)
    }
    if (error) {
        return (<>Ошибка: {error}</>)
    }

    if (questionList.length === 0 && !loading) {
        return (<>Данных нет</>)
    }

    return (
        <>
            <ul className="questions__list">
                {questionList.map((data) =>
                    <AccordionItem key={data.id} id={data.id} title={data.title}
                        answer={data.shortAnswer} rate={data.rate} complexity={data.complexity} />)}
                {error ? <div>{error}</div> : <></>}
            </ul>
            <PaginationSection currentPage={currentPage}
                totalPages={totalPages}
                handlePaginationClick={handlePaginationClick} />
        </>
    )
}


export default QuestionList