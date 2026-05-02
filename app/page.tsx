"use client";

import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";

export default function Home() {

    const [jobType, setJobType] = useState("carpentry")
    const [invoicedAmount, setInvoicedAmount] = useState("");
    const [dateCompleted, setDateCompleted] = useState("");
    const [customerNotes, setCustomerNotes] = useState("");
    const [recentJobs, setRecentJobs] = useState<Job[]>([]);

    type Job = {
        id: number;
        job_type: string;
        invoiced_amount: number;
        date_completed: string;
        customer_notes: string;
        created_at: string;
    }

    useEffect(() => {
        const fetchJobs = async () => {
            const {data, error} = await supabase
                .from("jobs")
                .select("*")
                .order("created_at", {ascending: false})
                .limit(10);

            if (error) {
                console.error("Error fetching jobs:", error);
            } else {
                setRecentJobs(data);
            }
        };

        fetchJobs();
    }, []);

    const refetchJobs = async () => {
        const {data, error} = await supabase
            .from("jobs")
            .select("*")
            .order("created_at", {ascending: false})
            .limit(10);

        if (error) {
            console.error("Error fetching jobs:", error);
        } else {
            setRecentJobs(data);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {error} = await supabase.from("jobs").insert({
            job_type: jobType,
            invoiced_amount: parseFloat(invoicedAmount),
            date_completed: dateCompleted,
            customer_notes: customerNotes,
        });

        if (error) {
            console.error("Error saving job", error);
            alert("Error saving job");
        } else {
            alert("Job saved!");
            setJobType("carpentry");
            setInvoicedAmount("");
            setDateCompleted("");
            setCustomerNotes("");
            refetchJobs();
        }
    }

    return (
        <main>
            <h1>Job Logger</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="jobType">Service Completed: </label>
                <select name="jobType"
                        id="jobType"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        required
                >
                    <option value="Carpentry">Carpentry</option>
                    <option value="HVAC Install">HVAC Install</option>
                    <option value="Plumbing Repair">Plumbing Repair</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Lawn Service">Lawn Service</option>
                </select>

                <label htmlFor="invoicedAmount">Invoiced Amount: </label>
                <input
                    type="text"
                    name="invoicedAmount"
                    id="invoicedAmount"
                    value={invoicedAmount}
                    required
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || /^\d*\.?\d*$/.test(val)) {
                            setInvoicedAmount(val);
                        }
                    }}
                />

                <label htmlFor="dateCompleted">Date Completed: </label>
                <input
                    type="date"
                    name="dateCompleted"
                    id="dateCompleted"
                    value={dateCompleted}
                    required
                    onChange={(e) => setDateCompleted(e.target.value)}
                />

                <label htmlFor="customerNotes">Customer Notes: </label>
                <input
                    type="text"
                    name="customerNotes"
                    id="customerNotes"
                    value={customerNotes}
                    required
                    autoComplete="off"
                    onChange={(e) => setCustomerNotes(e.target.value)}
                />

                <button type="submit">Save Job</button>

            </form>

            <h2>Recent Jobs</h2>
            <div className="job-feed">
                {recentJobs.map((job) => (
                    <div key={job.id} className="job-row">
                        <p>Service: {job.job_type}</p>
                        <p>Amount: ${job.invoiced_amount}</p>
                        <p>Date: {job.date_completed}</p>
                        <p>Notes: {job.customer_notes}</p>
                    </div>
                ))}
            </div>

        </main>
    );
}