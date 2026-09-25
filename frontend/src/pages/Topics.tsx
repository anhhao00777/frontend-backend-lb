import React, { useEffect, useState, type ChangeEvent } from 'react';
import NoteList from '../components/NoteListView';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

type notes = {

  id?: string,
  title?: string,
  content?: string,
  createdAt?: string,
  updatedAt?: string

}
export const Topics: React.FC = () => {
  const [notes, setNotes] = useState<string[] | []>([]);
  const nav = useNavigate();

  useEffect(() => {

    (async () => {
      try {
        const req = await fetch("http://localhost:5000/api/topics/", {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        });
        const res = await req.json();
        setNotes(res.topics);
      } catch (err) {
        setNotes([]);
      }
    })()
  }, []);

  let creating = false;
  const createNote = async (topic: string) => {
    if(creating) return;
    creating = true;
    const note: notes = {
      title: "",
      content: ""
    }
    try {
      const req = await fetch(`http://localhost:5000/api/notes/${topic}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
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
  function createName(text: string): string {
    return (text.split(" ").join("-").normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')).toLowerCase();
  }
  const createTopic = async () => {
    creating = true;
    const topic = window.prompt("Enter topic name");
    if (!topic) {
      return;
    }
    const fixedName = createName(topic);
    try {
      const req = await fetch(`http://localhost:5000/api/topics`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: fixedName })
      });
      const res = await req.json();
      if (res?.success) {
        alert("Success: " + res?.message);
        setNotes([...notes, fixedName]);
      }
    } catch (err) {
      alert("fail: " + err);
    }


  }
  const handleDelete = async (topic: string, id: string, title:string, callback:Function) => {
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
  const deleteTopic = async (topic:string)=>{
        if(!confirm("Are you sure to delete: " + topic)) return;

        try {
      const req = await fetch(`http://localhost:5000/api/topics/${topic}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
      });
      const res = await req.json();
      if (res?.success) {
        alert("Success: " + res?.message);
        setNotes(notes.filter(i=>i!==topic));
      }
    } catch (err) {
      alert("fail: " + err);
    }
    }

    const [search, setKeyword] = useState("");
    const onSearch = (ev: ChangeEvent<HTMLInputElement>)=>{
      setKeyword(ev.target.value || "");
    }
  return (
    <div>
        <SearchBar onSearch={onSearch}></SearchBar>
      <div className="flex justify-between">
        <div>
          <h2>Trang chủ (Dashboard / Public Notes)</h2>
          <p>Nơi hiển thị các ghi chú theo chủ đề (Học tập, Công việc...).</p>
        </div>
        <div>
          <button onClick={createTopic} className='btn bg-blue-400 p-2 text-2xl hover:bg-blue-600'>New Topic</button>
        </div>
      </div>
        {notes.length > 0 && notes.map(s => <NoteList search={search} onDeleteTopic={deleteTopic} onDelete={handleDelete} key={s} onCreateNote={createNote} topic={s}></NoteList>)}
    </div>

  );
};

export default Topics;