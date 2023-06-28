import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import PlayerInfo from "./PlayerInfo"
import Loader from "../../../components/Loader"
import Error from "../../Error"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../../state/battle/battle.request"
import { AppDispatch, RootState } from "../../../state/store"
import { IBattleStore } from "../../../types/battle.types"



const Results: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>()
    const [searchParams, setSearchParams] = useSearchParams()

    const { loading, winner, loser, error }: Omit<IBattleStore, 'players'> = useSelector((state: RootState) => ({
        loading: state.battle.loading,
        winner: state.battle.winner,
        loser: state.battle.loser,
        error: state.battle.error,
    }))

    useEffect(() => {

        dispatch(getUsers([searchParams.get('playerOneName') ?? '', searchParams.get('playerTwoName') ?? '']))

    }, [])

    if (loading)
        return <Loader />

    if (error)
        return <Error />

    return (
        <div className="row" >
            <PlayerInfo
                label='Winner'
                profile={winner.profile}
                score={winner.score} />
            <PlayerInfo
                label='Loser'
                profile={loser.profile}
                score={loser.score} />
        </div>
    )
}

export default Results