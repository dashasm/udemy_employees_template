import './search-panel.css';

const SearchPanel = ({term, onChange}) => {
    return (
        <input 
            type="text"
            value={term}
            onChange={onChange}
            className="form-control search-input"
            placeholder="Найти сотрудника"
        />
    )
}

export default SearchPanel;