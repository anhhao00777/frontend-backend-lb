import { type ChangeEventHandler } from "react"

export default function SearchBar({onSearch, value}:{onSearch:ChangeEventHandler, value?:string}){
    return <>
        <div className="serch-bar">
            <div className="flex gap-4 p-2">
                <label htmlFor="search" className="w-1/10 text-xl">Search</label>
                <input value={value} onChange={onSearch} className="w-9/10 p-2 outline-solid outline-2" type="text" id="search" placeholder="something..."/>
            </div>
        </div>
    </>
}