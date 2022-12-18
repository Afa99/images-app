import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Title } from '../components/title/title'


export default function Image() {
    const [data, setData] = useState(null)
    let { id } = useParams()
    const loadItem = useCallback(() => {
        axios.get(`https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_CLIENT_ID}`)
            .then((response) => {
                setData(response.data)

            })
    }, [id])
    useEffect(loadItem, [id])
    if (!data) return null
    return (
        <>
            <div class="img-box" >
                <img class='photo' src={data.urls.full} alt='' />
                   <div className='style'>
                    <h1>{data.user.name}</h1>
                    <Title data={data}/>
                   </div>
                    
            </div>

        </>
    )
}
