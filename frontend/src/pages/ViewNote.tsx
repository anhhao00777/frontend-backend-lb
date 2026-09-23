import { useEffect, useState, type KeyboardEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"

type notes = {

    id?: string,
    title?: string,
    content?: string,
    createdAt?: string,
    updatedAt?: string

}

export default function ViewNote() {
    const { topic, id } = useParams();

    if (!topic || !id) {
        const nav = useNavigate();
        nav("/");
    }
    const [content, setData] = useState<notes | undefined>(undefined);
    useEffect(() => {

        (async () => {
            try {
                const req = await fetch(`http://localhost:5000/api/notes/${topic}`, {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' }
                });
                let res = await req.json() as notes[];
                res = res?.filter(item => item.id === id);
                if (res) setData(res[0]);
            } catch (err) {
                setData({ title: err as string, id: "" })
            }
        })();
    }, [topic, id]);

    const text = useRef<HTMLDivElement>(null);

    const [newContent, setNewContent] = useState(content);

    const handleChange = (event: KeyboardEvent<HTMLDivElement>, key: string) => {
        const e = event.nativeEvent.target as HTMLDivElement;
        setNewContent({ ...content, ...newContent, [key]: e.textContent });
    }
    const saveContent = async () => {
        try {
            const req = await fetch(`http://localhost:5000/api/notes/${topic}/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContent)
            });
            const res = await req.json();
            if(res?.success){
                alert("Success");
            }
        } catch (err) {
            alert("fail: " + err);
        }
    }

    return <>
        <div>
            <div ref={text} onKeyUp={(e) => handleChange(e, 'title')} contentEditable className="text-4xl p-2">{content?.title}</div>
        </div>
        <div>
            <div className="text-gray-500">{content?.updatedAt}</div>
            <div ref={text} onKeyUp={(e) => handleChange(e, 'content')} contentEditable className="text-2xl p-2">{content?.content}</div>
        </div>
        <div className="mt-10">
            <button onClick={saveContent} className="text-3xl p-3 bg-blue-400 hover:bg-blue-600">Save</button>
        </div>

    </>
}