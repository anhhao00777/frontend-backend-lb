import { useEffect, useState } from "react"
import NoteItem from "./NoteItem"

type notes = {

    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string

}

export default function NoteList({ topic, onCreateNote, onDelete, onDeleteTopic, search }: { topic: string, onCreateNote: Function, onDelete: Function, onDeleteTopic: Function, search: string }) {
    const [notes, setNote] = useState<notes[] | undefined>(undefined);
    const [noteView, setView] = useState<notes[] | undefined>(undefined);
    const [hidden, setHidden] = useState(true);
    useEffect(() => {

        (async () => {
            try {

                const r = await fetch("http://localhost:5000/api/notes/" + topic, {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' }
                });
                const res = await r.json();
                setNote(res);
            } catch (err) {

            }
        })();
    }, [topic]);
    const onDel = (topic: string, id: string, title: string) => {
        onDelete(topic, id, title, () => {
            setNote(notes?.filter(n => n.id !== id));
        });
    }
    useEffect(()=>{
        if(search.length > 0) {
            setView(notes?.filter(i=>(compare(search, i.title) || compare(search, i.content))));
            setHidden(false);
        }
        else{0
            setView(notes);
            setHidden(true);
        }
    }, [notes, search])

    const compare = (search:string, content:string)=>{
        return (content.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1);
    }

    return <>
    {noteView && noteView.length>0 &&
            <div className="p-2">
                <div className="flex justify-between">
                    <div className="text-2xl select-none cursor-pointer" onClick={()=>setHidden(!hidden)}>{topic}</div>
                    <div className="flex justify-between gap-4">

                        <button onClick={() => onCreateNote(topic)} className='btn bg-yellow-400 p-2 text-2xl hover:bg-yellow-600'>Edit</button>
                        <button onClick={() => onCreateNote(topic)} className='btn bg-blue-400 p-2 text-2xl hover:bg-blue-600'>New Note</button>
                        <button onClick={() => onDeleteTopic(topic)} className='btn bg-red-400 p-2 text-2xl hover:bg-red-600'>Delete</button>
                    </div>

                </div>
                <div className={hidden ? "hidden" : ""}>
                    {noteView && noteView.map(i => <NoteItem onDelete={onDel} key={i.id} id={i.id} title={i.title} content={i.content} updatedAt={i.updatedAt} topic={topic}></NoteItem>)}
                </div>
            </div>
}
    </>
}