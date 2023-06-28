import axios from 'axios'
import { IRepos } from '../../types/popular.types'


interface GetUserDataResponse {
    profile: any
    score: number
}

const handleError = (error: string): never => {
    throw new Error(error)
}

const getCount = (arr: IRepos[], name: string) => {
    return arr.reduce((sum, next) => sum + next[name], 0)
}

const handleSort = (arr: any[] = [], name: string = '') => {
    return arr.sort((a, b) => b[name] - a[name])
}

const getGitUser = (username: string): Promise<any> => {
    return axios.get(`https://api.github.com/users/${username}`)
        .then(user => user.data)
        .catch(handleError)
}

const getGitRepos = (username: string): Promise<any> => {
    return axios.get(`https://api.github.com/users/${username}/repos`)
        .then(response => response.data)
        .catch(handleError)
}

const getUserData = (username: string): Promise<GetUserDataResponse> => {
    return Promise.all([
        getGitUser(username),
        getGitRepos(username)
    ])
        .then(([profile, repos]) => ({ profile, score: getCount(repos, 'stargazers_count') }))
        .catch(handleError)
}

export const makeBattle = (players: string[]): Promise<any[]> => {
    return Promise.all(players.map(getUserData))
        .then((data) => handleSort(data, 'score'))
        .catch(handleError)
}


export const fetchPopularRepos = (language: string): Promise<any[]> => {
    return axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=desc&type=Repositories`)
        .then(
            response => response.data.items
        )
        .catch(handleError)
}