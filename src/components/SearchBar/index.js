import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const SearchBar = ({ }) => {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');
    
    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/keyword=${keyword}`)
        } else {
            history.push('/search')
        }
    }

    return (
        <form onSubmit={searchHandler} >
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar