import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

type notes = {

    id: string,
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
                if(res) setData(res[0]);
            } catch (err) {
                setData({title: err as string, id: ""})
            }
        })();
    }, [topic, id]);

    return <>
        <h1 className="text-4xl p-2">{content?.title}</h1>
        <div className="text-gray-500">{content?.updatedAt}</div>
        <div>{content?.content}</div>
    </>
}