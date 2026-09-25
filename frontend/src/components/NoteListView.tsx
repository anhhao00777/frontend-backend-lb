import { useEffect, useState } from "react"
import NoteItem from "./NoteItem"

type notes = {

    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string

}

export default function NoteList({ topic, onCreateNote }: { topic: string, onCreateNote:Function }) {
    const [notes, setNote] = useState<notes[] | undefined>(undefined);
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
    return <>
        <div className="p-2">
            <div className="flex justify-between">
                <div className="text-2xl">{topic}</div>
                <button onClick={()=>onCreateNote(topic)} className='btn bg-blue-400 p-2 text-2xl hover:bg-blue-600'>New Note</button>

            </div>
            <div>
                {notes && notes.map(i => <NoteItem key={i.id} id={i.id} title={i.title} content={i.content} updatedAt={i.updatedAt} topic={topic}></NoteItem>)}
            </div>
        </div>
    </>
}