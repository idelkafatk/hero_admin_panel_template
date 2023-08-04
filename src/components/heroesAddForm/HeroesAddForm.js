

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid'
import Spinner from "../spinner/Spinner";
import {heroesAdding} from "../heroesList/heroesSlice";
import {fetchFilters, selectAll} from "../heroesFilters/filtersSlice";
import store from "../../store";

const HeroesAddForm = () => {
    const defaultElem = 'Огонь'
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {filtersLoadingStatus} = useSelector(state => state.filters)
    const filters = selectAll(store.getState())

    const [name, setName] = useState('')
    const [descr, setDecr] = useState('')
    const [elem, setElem] = useState(defaultElem)

    useEffect(() => {
        dispatch(fetchFilters())
    }, []);

    const createElements = () => {
        return filters.filter(item => item.name !== 'Все').map((item, i) => {
            return <option key={i}>{item.name}</option>
        })
    }

    const onAddItem = async (e) => {
        e.preventDefault()

        const item = {
            id: uuidv4(),
            name: name,
            description: descr,
            element: elem
        }

        try {
            dispatch(heroesAdding(item, elem))
            await request('http://localhost:3001/heroes', 'POST', JSON.stringify(item))
        } catch (e) {
            console.log(e)
        }

        setName('')
        setDecr('')
        setElem(defaultElem)
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (

        <form onSubmit={(e) => onAddItem(e)} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    value={descr}
                    onChange={(e) => setDecr(e.target.value)}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    value={elem}
                    onChange={(e) => setElem(e.target.value)}
                    name="element">
                    {createElements()}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;