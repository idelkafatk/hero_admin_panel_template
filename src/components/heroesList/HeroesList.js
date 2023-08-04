import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {fetchHeroes, filteredHeroesSelector, heroesDeleting} from "./heroesSlice";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroes = useSelector(filteredHeroesSelector)

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    const onDeleteItem = useCallback((id) => {
        try {
            request(`http://localhost:3001/heroes/${id}`, 'DELETE')
                .then(() => console.log(`item ${id} deleted`))
                .then(() => dispatch(heroesDeleting(id)))
                .catch(e => console.log(e))
        } catch (e) {
            console.log(e)
        }
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}, i) => {
            return <HeroesListItem key={i} id={id} {...props} onDeleteItem={() => onDeleteItem(id)}/>
        })
    }

    // console.log(activeFilterHeroes)
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;