export interface IRepos {
    [key: string]: any
}

export type ReposT = [] | IRepos[];

export interface IPopularList {
    loading: boolean;
    repos: ReposT;
    error: null | string;
}

export interface IPopularStore extends IPopularList {
    selectedLanguage: string;
}
