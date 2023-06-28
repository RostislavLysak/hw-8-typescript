import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { getRepos } from "../../state/popular/popular.request"
import { AppDispatch, RootState } from "../../state/store"

const languages: string[] = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

const LanguagesNav: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>()
    const [searchParams, setSearchParams] = useSearchParams()
    const lang: string = useSelector((state: RootState): string => state.popular.selectedLanguage)
    const selectedLanguage = searchParams.get('lang') ?? lang

    useEffect((): void => {
        dispatch(getRepos(selectedLanguage))
    }, [])

    const handleClick = (value: string): void => {
        dispatch(getRepos(value))
        setSearchParams(`?lang=${value}`)
    }

    return (
        <ul className="languages">
            {languages.map((language: string, index: number): React.ReactElement => (
                <li key={index} className={language === selectedLanguage ? 'active' : undefined}
                    onClick={(): void => handleClick(language)}>{language}</li>
            ))}
        </ul>
    )
}

export default LanguagesNav