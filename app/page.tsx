"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {

    const [jobType, setJobType] = useState("carpentry")
    const [invoicedAmount, setInvoicedAmount] = useState("");
    const [dateCompleted, setDateCompleted] = useState("");
    const [customerNotes, setCustomerNotes] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await supabase.from("jobs").insert({
            job_type: jobType,
            invoiced_amount: parseFloat(invoicedAmount),
            date_completed: dateCompleted,
            customer_notes: customerNotes,
        });

        if (error) {
            console.error("Error saving job", error);
            alert("Error saving job");
        }
        else {
            alert("Job saved!");
            setJobType("carpentry");
            setInvoicedAmount("");
            setDateCompleted("");
            setCustomerNotes("");
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
                <option value="carpentry">Carpentry</option>
                <option value="hvac">HVAC Install</option>
                <option value="plumbing">Plumbing Repair</option>
                <option value="electrical">Electrical</option>
                <option value="lawn">Lawn Cutting</option>
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

            <button type="submit" >Save Job</button>

        </form>
      </main>
  );
}