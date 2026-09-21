import NoteItem from "./NoteItem"

type notes = {
    
        id: string,
        title: string,
        content: string,
        createdAt: string,
        updatedAt: string
    
}

export default function NoteList({topic, notes}: {topic:string, notes:notes[]}){
    return <>
        <div className="p-2">
            <div className="text-2xl">{topic}</div>
            <div>
                {notes.map(i=><NoteItem id={i.id} title={i.title} content={i.content} updatedAt={i.updatedAt} topic={topic}></NoteItem>)}
            </div>
        </div>
    </>
}