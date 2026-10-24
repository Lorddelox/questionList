import { useContext, useEffect, useState } from "react"
import AccordionItem from "../accordionItem/accordionItem"
import "./questionList.css";
import ICONS from "../../ui/icons";
import { AppContext } from "../../context/appContext";
import PaginationSection from "../paginationSection/paginationSection";
import createQueryParams from "../../helpers/createQueryParams";
const QuestionList = () => {
    const [questionList, setQuestionList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { searchTerm, selected, currentPage, setCurrentPage, totalPages, setTotalPages } = useContext(AppContext);
    const params = {
        title: searchTerm,
        page: currentPage,
    }

    const queryParams = createQueryParams(selected, params)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`https://api.yeatwork.ru/questions/public-questions?${queryParams}&limit=10&order=ASC`);
                const questions = await res.json();

                setQuestionList(questions.data);
                setTotalPages(Math.ceil(questions.total / 10))
            }
            catch (e) {
                setError(e.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [currentPage, searchTerm, selected]);


    const pages = [];

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i > 1 && i < totalPages) {
            pages.push(i);
        }
    }

    const handlePaginationClick = (page) => {
        setCurrentPage(page)
    }
    return (
        <div className="questions__list-wrapper">
            {loading ? (<>Загрузка...</>) : (
                <>
                    <ul className="questions__list">
                        {questionList.map((data) =>
                            <AccordionItem key={data.id} title={data.title}
                                answer={data.shortAnswer} rate={data.rate} complexity={data.complexity} />)}
                        {error ? <div>{error}</div> : <></>}
                    </ul>
                    <PaginationSection currentPage={currentPage}
                        totalPages={totalPages}
                        handlePaginationClick={handlePaginationClick} />
                </>)
            }
        </div>
    )
}

// ${index + 1 === currentPage ? "pagination__btn--active" : ""}
export default QuestionList