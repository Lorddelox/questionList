
import QuestionList from "../questionList/questionList"
import "./questions.css"

const Questions = () => {

    return (
        <section className="questions">
            <h3 className="questions__title">
                Вопросы
            </h3>
            <QuestionList />
        </section>
    )
}

export default Questions