import "./categoryBtn.css"

const CategoryBtn = ({ name, id, skillState }) => {
    const { selected, setSelected, isMultiple } = skillState;

    const handleClick = () => {
        const isSelected = selected.includes(id)
        if (!isMultiple) {
            return isSelected ? setSelected([]) : setSelected([id])
        }
        return isSelected ?
            setSelected((prev) => prev.filter((item) => item !== id)) :
            setSelected((prev) => [...prev, id])
    }

    return (
        <button className={`category__btn ${selected.includes(id)
            ? "category__btn--active" : ""}`} onClick={handleClick}>
            {name}
        </button>
    )
}

export default CategoryBtn