// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
const queryMain = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $season: MediaSeason, $seasonYear: Int, $format: MediaFormat, $format_not: MediaFormat, $format_in: [MediaFormat], $isAdult: Boolean, $status_in: [MediaStatus], $startDate_lesser: FuzzyDateInt, $popularity_greater: Int, $sort: [MediaSort], $endDate_greater: FuzzyDateInt, $id_in: [Int] ) { # Define which variables will be used in the query (id)
    Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      media (id: $id, type: ANIME, search: $search, season: $season, seasonYear: $seasonYear, format: $format, format_not: $format_not, format_in: $format_in, isAdult: $isAdult, status_in: $status_in, startDate_lesser: $startDate_lesser, popularity_greater: $popularity_greater, sort: $sort, endDate_greater: $endDate_greater, id_in: $id_in) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
            id
            idMal
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
                medium
            }
            genres
            type
            status
            description(asHtml: false)
            episodes
            duration
            averageScore
            meanScore
            popularity
            isAdult
            siteUrl
            format
            synonyms
            source
            season
            studios {
                nodes {
                    id
                    name
                    isAnimationStudio
                    siteUrl
                } 
            }
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month 
                day
            }
            nextAiringEpisode {
                id
                airingAt
                timeUntilAiring
                episode
                media {
                    title{
                        romaji
                        english
                        native
                    }
                    startDate {
                        year
                        month
                        day
                    }
                }
            }
        }
    }
}
`;

const queryDetails = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $season: MediaSeason, $seasonYear: Int, $format: MediaFormat, $format_not: MediaFormat, $format_in: [MediaFormat], $isAdult: Boolean, $status_in: [MediaStatus], $startDate_lesser: FuzzyDateInt, $popularity_greater: Int, $sort: [MediaSort], $endDate_greater: FuzzyDateInt, $id_in: [Int] ) { # Define which variables will be used in the query (id)
    Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      media (id: $id, type: ANIME, search: $search, season: $season, seasonYear: $seasonYear, format: $format, format_not: $format_not, format_in: $format_in, isAdult: $isAdult, status_in: $status_in, startDate_lesser: $startDate_lesser, popularity_greater: $popularity_greater, sort: $sort, endDate_greater: $endDate_greater, id_in: $id_in) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
            id
            idMal
            title {
                romaji
                english
                native
            }
            bannerImage
            coverImage {
                extraLarge
                large
                medium
            }
            airingSchedule {
                nodes {
                    id
                    airingAt
                    timeUntilAiring
                    episode
                    mediaId
                }
            }
            relations {
                nodes {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    type
                    status
                    description(asHtml: false)
                    episodes
                    season
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year 
                        month 
                        day
                    }
                    coverImage{
                        large
                    }
                }
                edges {
                    id
                    relationType
                    node {
                        id
                        title {
                            english
                            romaji
                            native
                        }
                        type
                        description
                        season
                        startDate {
                            year
                            month
                            day
                        }
                        endDate {
                            year
                            month
                            day
                        }
                    }
                }
            }
            genres
            type
            status
            description(asHtml: false)
            episodes
            duration
            averageScore
            meanScore
            popularity
            isAdult
            siteUrl
            format
            hashtag
            synonyms
            source
            season
            studios {
                nodes {
                    id
                    name
                    isAnimationStudio
                    siteUrl
                } 
            }
            externalLinks {
                id
                url
                site
            }
            streamingEpisodes {
                title
                thumbnail
                url
                site
            }
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month 
                day
            }
            tags {
                id
                name
                description
                category
                rank
                isGeneralSpoiler
                isMediaSpoiler
                isAdult
            }
            nextAiringEpisode {
                id
                airingAt
                timeUntilAiring
                episode
                media {
                    title{
                        romaji
                        english
                        native
                    }
                    startDate {
                        year
                        month
                        day
                    }
                }
            }
            trailer {
                id
                site
                thumbnail
            }
            characters {
                pageInfo {
                    perPage
                    total
                }
                edges {
                    node {
                        name {
                            first
                            last
                            full
                            native 
                            alternative
                        }
                        image {
                            large
                            medium
                        }
                        description
                        favourites
                    }
                    id
                    role 
                    voiceActors {
                        id
                        name {
                            first
                            last
                            full
                            native 
                            alternative
                        } 
                        language
                        image {
                            large
                            medium
                        }
                        description
                    }
                }
            }
        }

    }
}
`;

const queryEpisodes = `
query ($id_in: [Int], $page: Int, $perPage: Int,) { # Define which variables will be used in the query (id) {
    Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media ( id_in: $id_in) {
            id
            title {
                romaji
                english
            }
            status
            episodes
            nextAiringEpisode {
                id
                airingAt
                timeUntilAiring
                episode
            }
        }
    }
}`;

export { queryMain, queryEpisodes, queryDetails };
