import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Title  } from '../components/title/title';

export default function Home() {
    console.log(process.env)
    const [photo, setPhoto] = useState("")
    const [result, setResult] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const hasNextPage = page !== totalPages
    const resetState = () => {
        setResult([])
        setPage(0)
        setTotalPages(1)
        setIsLoading(false)
    }

    const loadItems = useCallback(() => {
        const nextPage = page + 1
        setIsLoading(true)
        axios.get(`https://api.unsplash.com/search/photos?per_page=10&page=2&query&page=${nextPage}&query=${photo}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
            .then((response) => {
                const loadedResults = response.data.results
                setResult([...result, ...loadedResults]);
                setPage(nextPage)
                setTotalPages(response.data.total_pages);
                setIsLoading(false)

            })
    }, [page, totalPages, hasNextPage, isLoading, photo, result])
    const isItemLoaded = index => !hasNextPage || index < result.length;
    const Item = ({ index,}) => {
        const value = result[index];
        if (!value) return null;
        return (
            <Link to={`/${value.id}`} className="img-box" >
                <img src={value.urls.thumb} alt='' />
                <div className='wrapper'>
                    <h1>{value.user.name}</h1>
                  <Title data={value}/>
                </div>
            </Link>

        )

    };
    return (
        <>
            <div className='container text-center my-5'>
                <input type="text" className='form-control' value={photo} onChange={(e) => {
                    setPhoto(e.target.value)
                }} />
                <button type='submit' onClick={() => {
                    resetState()
                    loadItems()

                }} class='btn btn-primary my-2'>Get Photo</button>
            </div>

            <div className="container">
                <div className="intro">
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={result.length + 1}
                        loadMoreItems={loadItems}

                    >
                        {({ onItemsRendered, ref }) => (

                            <FixedSizeList
                                height={50000}
                                width={600}
                                itemSize={300}
                                itemCount={result.length + 1}
                                onItemsRendered={onItemsRendered}
                                ref={ref}


                            >{Item}</FixedSizeList>
                        )}
                    </InfiniteLoader>
                </div>

            </div>

        </>
    )
}
