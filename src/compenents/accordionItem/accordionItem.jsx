import { useState } from "react"
import "./accordionItem.css"
import ICONS from "../../ui/icons";
const AccordionItem = ({ id, title = "title", answer = "description", rate = "0", complexity = "0" }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open)
    }
    return (
        <li className="questions__item">
            <h4 className="questions__item-title">
                <button
                    aria-expanded={open}
                    aria-controls={`accordionItem-${id}`}
                    className="questions__item-header"
                    onClick={handleToggle}
                >
                    <span>{title}</span>
                    <span aria-hidden="true">
                        {open ? ICONS.accordeonOpened : ICONS.accordeonClosed}
                    </span>
                </button>
            </h4>
            <div id={`accardionItem-${id}`} className={`questions__item-enter ${open ? 'questions__item-enter--open' : ''}`}>
                <div className="questions__item-body">
                    <div className="questions__item-status">
                        <div className="questions__item-rate">
                            Рейтинг: <span>{rate}</span>
                        </div>
                        <div className="questions__item-complexity">
                            Сложность: <span>{complexity}</span>
                        </div>
                    </div>
                    <div className="questions__item-desc">{answer}</div>
                </div>
            </div>
        </li>
    )
}

export default AccordionItem