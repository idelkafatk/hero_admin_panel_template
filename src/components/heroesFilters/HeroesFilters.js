
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import {filteredHeroes, selectAll} from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import store from "../../store";

const HeroesFilters = () => {
    const {filtersLoadingStatus} = useSelector(state => state.filters)
    const filters = selectAll(store.getState())
    const dispatch = useDispatch()
    const itemRefs = useRef([])

    const onFilter = (e, index) => {
        itemRefs.current.forEach(item => item.classList.remove('active'))
        itemRefs.current[index].classList.add('active')

        dispatch(filteredHeroes(itemRefs.current[index].innerText))
    }

    const renderFilters = () => {
        const filterBtns = filters.map((filter, i) => {
            return (
                <button key={i}
                        ref={el => itemRefs.current[i] = el}
                        className={`btn ${filter.class}${filter.name === 'Все' ? ' active' : ''}`}
                        onClick={(e) => onFilter(e, i)}>
                    {filter.name}
                </button>
            )
        })

        return (
            <div className="card shadow-lg mt-4">
                <div className="card-body">
                    <p className="card-text">Отфильтруйте героев по элементам</p>
                    <div className="btn-group">
                        {filterBtns}
                    </div>
                </div>
            </div>
        )
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return renderFilters()
}

export default HeroesFilters;