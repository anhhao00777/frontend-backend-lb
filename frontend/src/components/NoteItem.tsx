import { NavLink } from "react-router-dom";

export default function NoteItem({ id, title, content, topic, updatedAt }: { id: string, title: string, content: string, topic: string, updatedAt: string }) {
    return <>
        <NavLink to={`/note/${topic}/${id}`}>
            <div className="p-2">
                <div className="flex justify-between">
                    <div>{title}</div>
                    <div className="text-gray-500">{updatedAt}</div>
                </div>
                <div>{content.length > 25 ? content.substring(0, 23) + "..." : content}</div>
            </div>
        </NavLink>

    </>
}