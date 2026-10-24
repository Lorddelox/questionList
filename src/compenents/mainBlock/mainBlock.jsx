
import QuestionList from "../questionList/questionList"
import "./mainBlock.css"

const MainBlock = () => {
    return (
        <main className="main block">
            <section className="questions">
                <h3 className="questions__title">
                    Вопросы
                </h3>
                <QuestionList />
            </section>
        </main>
    )
}

export default MainBlock