import React, { useEffect, useState } from 'react';
import NoteList from '../components/NoteListView';

type notes = {
    
        id: string,
        title: string,
        content: string,
        createdAt: string,
        updatedAt: string
    
}
export const Home: React.FC = () => {
  const [notes, setNotes] = useState<notes[] | []>([]);
  useEffect(()=>{

    (async()=>{
      try {
        const req = await fetch("http://localhost:5000/api/notes/cong-viec", {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });
        const res = await req.json();
        setNotes(res);
      } catch (err) {
        setNotes([]);
      }
    })()
  }, []);
  return (
    <div>
    <div className="flex justify-between">
      <div>
        <h2>Trang chủ (Dashboard / Public Notes)</h2>
        <p>Nơi hiển thị các ghi chú theo chủ đề (Học tập, Công việc...).</p>
      </div>
      <div>
        <button className='btn bg-blue-400'>New</button>
      </div>
    </div>
      {notes.length > 0 && <NoteList topic='cong-viec' notes={notes}></NoteList>}
    </div>
    
  );
};

export default Home;