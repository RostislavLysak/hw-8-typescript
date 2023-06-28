import { memo } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../state/store"
import { IPlayers } from "../../types/battle.types"

const BattleButton: React.FC = (): React.ReactElement | null => {
    const players: IPlayers[] = useSelector((state: RootState): IPlayers[] => state.battle.players)

    if (players.every(player => player.image)) {
        return (
            <Link className="button" to={{
                pathname: 'results',
                search: `?playerOneName=${players[0].name}&playerTwoName=${players[1].name}`
            }}>
                Battle
            </Link>
        )
    }

    return null
}

export default memo(BattleButton)