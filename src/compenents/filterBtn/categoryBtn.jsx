import "./categoryBtn.css"

const CategoryBtn = ({ name, id, skillState }) => {
    const { selected, setSelected, isMultiple } = skillState;

    const isSelected = selected.includes(id);

    const handleClick = () => {
        if (!isMultiple) {
            return isSelected ? setSelected([]) : setSelected([id])
        }
        return isSelected ?
            setSelected((prev) => prev.filter((item) => item !== id)) :
            setSelected((prev) => [...prev, id])
    }

    return (
        <button className={`category__btn ${isSelected
            ? "category__btn--active" : ""}`} onClick={handleClick} aria-pressed={isSelected}>
            {name}
        </button>
    )
}

export default CategoryBtn