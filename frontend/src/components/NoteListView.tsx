import { useEffect, useState } from "react"
import NoteItem from "./NoteItem"

type notes = {

    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string

}

export default function NoteList({ topic, onCreateNote, onDelete, onDeleteTopic, onEditTopic, search }: { topic: string, onCreateNote: Function, onDelete: Function, onDeleteTopic: Function, onEditTopic:Function, search: string }) {
    const [notes, setNote] = useState<notes[] | undefined>(undefined);
    const [noteView, setView] = useState<notes[] | undefined>(undefined);
    const [hidden, setHidden] = useState(true);
    const [topicName, setTopicName] = useState(topic);
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
    const onEdit = ()=>{
        onEditTopic(topicName, (name:string)=>{
            setTopicName(name);
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
    }, [notes, search]);

    const compare = (search:string, content:string)=>{
        return (content.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1);
    }

    return <>
    {noteView && noteView.length>0 &&
            <div className="p-2">
                <div className="flex justify-between p-2 light:hover:bg-blue-100 dark:hover:outline">
                    <div className="text-2xl select-none cursor-pointer" onClick={()=>setHidden(!hidden)}>{topicName}</div>
                    <div className="flex justify-between gap-4">

                        <button onClick={onEdit} className='btn bg-yellow-400 p-2 text-2xl hover:bg-yellow-600'>Edit</button>
                        <button onClick={() => onCreateNote(topicName)} className='btn bg-blue-400 p-2 text-2xl hover:bg-blue-600'>New Note</button>
                        <button onClick={() => onDeleteTopic(topicName)} className='btn bg-red-400 p-2 text-2xl hover:bg-red-600'>Delete</button>
                    </div>

                </div>
                <div className={hidden ? "hidden" : ""}>
                    {noteView && noteView.map(i => <NoteItem onDelete={onDel} key={i.id} id={i.id} title={i.title} content={i.content} updatedAt={i.updatedAt} topic={topicName}></NoteItem>)}
                </div>
            </div>
}
    </>
}