import React, { useEffect, useState } from 'react';
import NoteList from '../components/NoteListView';
import { useNavigate } from 'react-router-dom';

type notes = {

    id?: string,
    title?: string,
    content?: string,
    createdAt?: string,
    updatedAt?: string

}
export const Home: React.FC = () => {
  const [notes, setNotes] = useState<string[] | []>([]);
  const nav = useNavigate();

  useEffect(()=>{

    (async()=>{
      try {
        const req = await fetch("http://localhost:5000/api/topics/", {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });
        const res = await req.json();
        setNotes(res.topics);
      } catch (err) {
        setNotes([]);
      }
    })()
  }, []);

  let creating = false;
  const createNote = async (topic:string)=>{
    creating = true;
    const note:notes = {
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
            if(res?.success){
                alert("Success");
            }
            nav(`/note/${topic}/${res.note.id}`);
        } catch (err) {
            alert("fail: " + err);
        }
    

  }
  return (
    <div>
    <div className="flex justify-between">
      <div>
        <h2>Trang chủ (Dashboard / Public Notes)</h2>
        <p>Nơi hiển thị các ghi chú theo chủ đề (Học tập, Công việc...).</p>
      </div>
      <div>
        <button className='btn bg-blue-400 p-2 text-2xl'>New</button>
      </div>
    </div>
      {notes.length > 0 && notes.map(s=><NoteList onCreateNote={createNote} topic={s}></NoteList>) }
    </div>
    
  );
};

export default Home;