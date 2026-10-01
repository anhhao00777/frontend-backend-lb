import React, { useEffect, useState, type ChangeEvent } from 'react';
import NoteItem from '../components/NoteItem';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

type note = {

  id: string,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string
  topic: string
}
export const Home: React.FC = () => {
  const [notes, setNotes] = useState<note[] | []>([]);
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [sort, setSort] = useState(searchParams.get("sort") || "date");
  const [search, setSearch] = useState(searchParams.get("s") || "");


  useEffect(() => {
    let loading = true;
    setSearchParams(search ? { page, sort, 's': search} : { page, sort});
    (async () => {
      try {
        const req = await fetch(`http://localhost:5000/api/notes?page=${page ?? 1}&sort=${sort ?? "date"}${search.length > 0 ? "&s=" + search : ""}`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        });
        if (!loading) return;
        const res = await req.json();
        setNotes(res);
      } catch (err) {
        setNotes([]);
      }
    })();
    return () => {
      loading = false;
    };
  }, [page, sort, search]);

  const handleSortChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSort(ev.target.value || "date");
  }
  const handlePageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setPage(ev.target.value || "1");
  }

  const onSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.target.value);
  }

  let creating = false;
  const createNote = async (topic: string) => {
    if (creating) return;
    creating = true;
    try {
      const req = await fetch(`http://localhost:5000/api/notes/${topic}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: ""
      });
      const res = await req.json();
      if (res?.success) {
        alert("Success");
      }
      nav(`/note/${topic}/${res.note.id}`);
    } catch (err) {
      alert("fail: " + err);
    }
    creating = false;


  }

  const deleteNote = async (topic: string, id: string, title:string, callback:Function) => {
    const conf = confirm("Are you sure to delete: " + title)
    if(!conf) return;
    try {
      const req = await fetch(`http://localhost:5000/api/notes/${topic}/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
      });
      const res = await req.json();
      if (res?.success) {
        alert("Success: " + res?.message);
        callback();
      }
    } catch (err) {
      alert("fail: " + err);
    }
  }
  return (
    <div>
      <SearchBar value={search} onSearch={(onSearch)}></SearchBar>
      <div className="flex justify-between">
        <div>
          <h2>Trang chủ (Dashboard / Public Notes)</h2>
          <p>Nơi hiển thị các ghi chú theo chủ đề (Học tập, Công việc...).</p>
        </div>
        <div>

          <select className='outline-solid outline-2 dark:bg-black' onChange={handleSortChange}value={sort}>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="date" selected>Date</option>
            <option value="dated">Date Rev</option>
          </select>

          <button onClick={()=>{ let pg = parseInt(page);setPage((pg-1)>0 ? pg-1 + "" : "1")}} className='btn bg-blue-400 p-2 text-2xl hover:bg-blue-600'>Prev</button>
          <input type="number" onChange={handlePageChange} value={page} className='w-15'/>
          <button onClick={()=>setPage((parseInt(page)+1)+"")} className='btn bg-blue-400 p-2 text-2xl hover:bg-blue-600'>Next</button>

          <button onClick={()=>createNote("no-topic")} className='btn bg-green-400 p-2 text-2xl hover:bg-green-600'>New</button>
        </div>
      </div>
      <div className=''>
        {notes?.map(i => <NoteItem key={i.topic + "." + i.id} id={i.id} topic={i.topic} title={i.title} content={i.content} updatedAt={i.updatedAt} onDelete={deleteNote}></NoteItem>)}

      </div>
    </div>

  );
};

export default Home;