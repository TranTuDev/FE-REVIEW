"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/layout/container";
import SubmissionForm from "@/components/submission/submissionForm";
import { getSubmissions, deleteSubmission, createSubmisson } from "@/services/submissionService";

export default function Page() {
    const [submissions, setSubmissions] = useState<any[]>([]);


    const handleSubmit = async (file: File | null, note: string) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("note", note);

        try {

            const data = await createSubmisson(formData);

            alert(data.message);

            fetchSubmissions();
        } catch (err) {
            console.log(err);
        }
    };
    const fetchSubmissions = async () => {
        const data = await getSubmissions();
        setSubmissions(data);
    };
    useEffect(() => {
        fetchSubmissions();
    }, []);


    const handleDelete = async (id: string) => {
        await deleteSubmission(id);
        fetchSubmissions();
    }
    return (
        <Container>
            <h1 className="text-2xl font-bold mb-4">Submission</h1>
            <SubmissionForm onSubmit={handleSubmit} />

            <div className="mt-6 space-y-3"> {submissions.map((item: any) => (

                <div key={item.id} className="boder p-3 rounded">
                    <h2 className="mb-1.5 text-2xl text-amber-400">Xem file</h2>
                    <p>{item.note}</p>
                    <p>Status: {item.status}</p>
                    <a href={`http://localhost:5000${item.fileUrl}`} target="_blank" className="text-blue-500 underline">
                        Open file
                    </a>
                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">delete</button>
                </div>
            ))}</div>
        </Container>
    );
}
