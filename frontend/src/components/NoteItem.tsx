import { NavLink } from "react-router-dom";

export default function NoteItem({ id, title, content, topic, updatedAt, onDelete }: { id: string, title: string, content: string, topic: string, updatedAt: string, onDelete:Function }) {
    return <>
        <div className="p-2 flex justify-between hover:bg-blue-100">
            <NavLink to={`/note/${topic}/${id}`}>
                <div className="flex justify-between gap-5">
                    <div>{title}</div>
                    <div className="text-gray-500">{updatedAt}</div>
                </div>
                <div>{content.length > 25 ? content.substring(0, 23) + "..." : content}</div>
            </NavLink>
            <button className="btn bg-red-400 p-2 text-2xl hover:bg-red-600" onClick={()=>onDelete(topic, id, title)}>Delete</button>
        </div>

    </>
}