import { useState } from "react"
import "./accordionItem.css"
import ICONS from "../../ui/icons";
const AccordionItem = ({ title = "title", answer = "description", rate = "0", complexity = "0" }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open)
    }
    return (
        <li className="questions__item">
            <div className="questions__item-header" onClick={handleToggle}>
                <h4 className="questions__item-title">{title}</h4>
                <button>{open ? ICONS.accordeonOpened : ICONS.accordeonClosed}</button>
            </div>
            <div className={`questions__item-enter ${open ? 'questions__item-enter--open' : ''}`}>
                <div className="questions__item-body">
                    <div className="questions__item-status">
                        <div className="questions__item-rate">
                            Рейтинг: <span>{rate}</span>
                        </div>
                        <div className="questions__item-complexity">
                            Сложность: <span>{complexity}</span>
                        </div>
                    </div>
                    <div className="questions__item-desc" dangerouslySetInnerHTML={{ __html: answer }} />
                </div>
            </div>
        </li>
    )
}

export default AccordionItem